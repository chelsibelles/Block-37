import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/SearchBar';

test('renders search input and button', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/search for items.../i);
  const buttonElement = screen.getByText(/search/i);
  
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('handles input change', () => {
  render(<SearchBar />);
  const inputElement = screen.getByPlaceholderText(/search for items.../i);
  fireEvent.change(inputElement, { target: { value: 'test' } });
  
  expect(inputElement.value).toBe('test');
});
