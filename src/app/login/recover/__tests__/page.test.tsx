import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest'
import Page from '../page';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: vi.fn(),
    }),
    useSearchParams: () => ({
      get: vi.fn(),
    }),
  }));

describe('Recover Component', () => {
  test('renders without crashing', () => {
    render(<Page/>);
  });

  test('shows error when email field is empty and recover button is clicked', async () => {
    const { getByText } = render(<Page/>);
    const button = screen.getAllByRole('button')[0]

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText('Please fill in all fields')).toBeTruthy();
    });
  });

  test('shows error when invalid email is entered and recover button is clicked', async () => {
    render(<Page/>);
    const button = screen.getAllByRole('button')[0]
    const input = screen.getAllByLabelText('Email')[0]

    fireEvent.change(input, { target: { value: 'invalid email' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeTruthy();
    });
  });
});