// Import necessary modules
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '@/app/register/page'; // Adjust the path as necessary

// Mock the global fetch function
global.fetch = jest.fn();

describe('Register component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    (fetch as jest.Mock).mockClear();
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
  
    // Render the component
    render(<Register />);
  
    // Fill in the form and submit
    
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const usernameInput = screen.getByLabelText('Username');
    fireEvent.change(usernameInput, { target: { value: 'test_user' } });
    
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'secure_password' } });
    
    const zipCodeInput = screen.getByLabelText('Zip Code');
    fireEvent.change(zipCodeInput, { target: { value: '1234' } });

    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);
  
    // Expect success message
    expect(await screen.findByText(/User created successfully!/i)).toBeInTheDocument();
  });

  // Test that the form handles validation errors from API
  it('should handle validation errors from API', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Email already exists' }),
    });

    render(<Register />);

    // Change the values of the email, username, password, and zip code inputs
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: 'test_user' } });

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'secure_password' } });

    const zipCodeInput = screen.getByLabelText(/Zip Code/i);
    fireEvent.change(zipCodeInput, { target: { value: '12345' } });

    // Click the register button and check that the validation error message is displayed
    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Email already exists/i)).toBeInTheDocument();
  });

  // Test that the form handles unexpected errors
  it('should handle unexpected errors', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<Register />);

    // Change the values of the email, username, password, and zip code inputs
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: 'test_user' } });

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'secure_password' } });

    const zipCodeInput = screen.getByLabelText(/Zip Code/i);
    fireEvent.change(zipCodeInput, { target: { value: '12345' } });

    const submitButton = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/An unexpected error occurred/i)).toBeInTheDocument();
  });
});