import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Page from '../content';
import { describe, expect, test, vi } from 'vitest'

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

describe('Register', () => {
  test('renders Register component', () => {
    render(<Page />);
  });

  test('shows error when fields are empty', async () => {
    render(<Page />);

    fireEvent.click(screen.getAllByText('Register')[0]);

    await waitFor(() => {
      expect(screen.getAllByText('Please fill in all fields')).toBeTruthy();
    });
  });

  test('shows error when passwords do not match', async () => {
    render(<Page />);

      fireEvent.change(screen.getAllByLabelText('Email')[0], {
        target: { value: 'test@aus.edu' },
      });
      fireEvent.change(screen.getAllByLabelText('Password')[0], {
        target: { value: 'Password@123' },
      });
      fireEvent.change(screen.getAllByLabelText('Confirm Password')[0], {
        target: { value: 'Password@1234' },
      });
      fireEvent.click(screen.getAllByText('Register')[0]);

    await waitFor(() => {
      expect(screen.getAllByText('Passwords do not match')).toBeTruthy();
    });
  });

  test('shows error when email is invalid', async () => {
    render(<Page />);

      fireEvent.change(screen.getAllByLabelText('Email')[0], {
        target: { value: 'invalid email' },
      });
      fireEvent.change(screen.getAllByLabelText('Password')[0], {
        target: { value: 'Password@123' },
      });
      fireEvent.change(screen.getAllByLabelText('Confirm Password')[0], {
        target: { value: 'Password@123' },
      });
      fireEvent.click(screen.getAllByText('Register')[0]);

      await waitFor(() => {
        expect(screen.getAllByText('Invalid email address')).toBeTruthy();
      });
    });
});