/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Register from '@/app/register/page';
 
it("Should have login text", () => {
    render(<Register />);

    const myElems = screen.getAllByText('Register')

    myElems.forEach((elem) => {
      expect(elem).toBeInTheDocument();
  });
});
