import { render, screen, waitFor } from '@testing-library/react';
import UserReviews from '../../src/UserReviews';

test('renders user reviews', async () => {
  // Mock fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, bookTitle: 'Book Title', review: 'Amazing!', rating: 4, createdAt: '2024-08-01' }]),
    })
  );

  render(<UserReviews />);

  await waitFor(() => screen.getByText(/Book Title/i));

  expect(screen.getByText(/Book Title/i)).toBeInTheDocument();
  expect(screen.getByText(/Amazing!/i)).toBeInTheDocument();
});
