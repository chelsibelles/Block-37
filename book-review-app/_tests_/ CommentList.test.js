import { render, screen, waitFor } from '@testing-library/react';
import CommentList from '../../src/CommentList';

test('renders list of comments', async () => {
  // Mock fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, comment: 'Interesting read!', createdAt: '2024-08-01' }]),
    })
  );

  render(<CommentList reviewId="1" />);

  await waitFor(() => screen.getByText(/Interesting read!/i));

  expect(screen.getByText(/Interesting read!/i)).toBeInTheDocument();
});
