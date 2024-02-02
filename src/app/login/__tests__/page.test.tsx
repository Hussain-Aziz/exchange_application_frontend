import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { UserContext } from '../../../contexts/UserContext';
import { describe, expect, beforeEach, vitest, test, vi } from 'vitest'
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

describe('Login', () => {
  const setIsUserAuthenticated = vitest.fn();
  const userContextValue = {
    isUserAuthenticated: false,
    setIsUserAuthenticated: setIsUserAuthenticated,
  };

  beforeEach(() => {
    render(
      <UserContext.Provider value={userContextValue}>
        <Page />
      </UserContext.Provider>
    );
  });

  test('renders without crashing', () => {
    expect(screen.getAllByText('Login')[0]).toBeTruthy();
  });

  test('shows an error when fields are empty', async () => {
    fireEvent.click(screen.getAllByText('Login')[0]);

    await waitFor(() => {
      expect(screen.getAllByText('Please fill in all fields')[0]).toBeTruthy();
    });
  });

  test('shows an error when email is invalid', async () => {
    fireEvent.change(screen.getAllByLabelText('Email')[0], {
      target: { value: 'invalid email' },
    });
    fireEvent.change(screen.getAllByLabelText('Password')[0], {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getAllByText('Login')[0]);

    await waitFor(() => {
      expect(screen.getAllByText('Invalid email address')[0]).toBeTruthy();
    });
  });

  test('calls setIsUserAuthenticated when fields are valid', async () => {
    fireEvent.change(screen.getAllByLabelText('Email')[0], {
      target: { value: 'test@aus.edu' },
    });
    fireEvent.change(screen.getAllByLabelText('Password')[0], {
      target: { value: 'Password@123' },
    });
    fireEvent.click(screen.getAllByText('Login')[0]);

    await waitFor(() => {
      expect(setIsUserAuthenticated).toHaveBeenCalledWith(true);
    });
  });
});