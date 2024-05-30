import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '@/app/register/page'; // Adjust the path as necessary
import { useRouter } from 'next/router';
import fetchMock from 'jest-fetch-mock';


// Mock the global fetch function
fetchMock.enableMocks(); // Enable fetch mock

// Mock the global fetch function
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Register component', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset mock between tests
  });

  // Test that the form renders with correct labels and inputs
  it('should render the form with correct labels and inputs', () => {
    render(<Register />);
    // Check that the form contains the correct labels and inputs
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument(); 
  });

  // Test that the form updates the formData state on user input changes
  it('should update formData state on user input changes', () => {
    render(<Register />);
    // Change the value of the email input and check that it has been updated
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
    // Change the value of the username input and check that it has been updated
    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: 'test_user' } });
    expect(usernameInput).toHaveValue('test_user');
  });

  // Test that the form handles successful registration
  it('should handle successful registration', async () => {
    // Mock successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'User created successfully!' }),
    });
    // Mock useRouter
    const push = jest.fn();
    useRouter.mockReturnValue({ push });
    render(<Register />);
    // Fill in the form and submit
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test_user' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secure_password' } });
    fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    // Check that push is called with '/'
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  // Test that the form handles validation errors from API
  it('should handle validation errors from API', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Email already exists' }),
    });
    render(<Register />);
    // Change the values of the email, username, password, and zip code inputs
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'test_user' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secure_password' } });
    fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: '12345' } });
    // Click the register button and check that the validation error message is displayed
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    expect(await screen.findByText(/Email already exists/i)).toBeInTheDocument();
  });

  // Test that the form handles unexpected errors
  it('should handle unexpected errors', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    render(<Register />);
    // Change the values of the email, username, password, and zip code inputs
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'test_user' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'secure_password' } });
    fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    expect(await screen.findByText(/An unexpected error occurred/i)).toBeInTheDocument();
  });
});
