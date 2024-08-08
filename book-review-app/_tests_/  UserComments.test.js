import { render, screen, waitFor } from '@testing-library/react';
import UserComments from '../../src/UserComments';

test('renders user comments', async () => {
  // Mock fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, comment: 'Great insight!', createdAt: '2024-08-01' }]),
    })
  );

  render(<UserComments />);

  await waitFor(() => screen.getByText(/Great insight!/i));

  expect(screen.getByText(/Great insight!/i)).toBeInTheDocument();
});
