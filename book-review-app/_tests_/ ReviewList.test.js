import { render, screen, waitFor } from '@testing-library/react';
import ReviewList from '../../src/ReviewList';

test('renders list of reviews', async () => {
  // Mock fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, review: 'Great book!', rating: 5 }]),
    })
  );

  render(<ReviewList />);

  await waitFor(() => screen.getByText(/Great book!/i));

  expect(screen.getByText(/Great book!/i)).toBeInTheDocument();
  expect(screen.getByText(/Rating: 5/i)).toBeInTheDocument();
});
