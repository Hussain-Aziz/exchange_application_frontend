import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { UserProvider, UserContext } from '../UserContext';
import { vitest, describe, expect, it, afterEach, vi } from 'vitest'
import { useSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: vi.fn(),
  }),
}));

describe('UserProvider', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    render(
      <UserProvider>
        <div>Test</div>
      </UserProvider>
    );
  });

  it('provides user context', () => {
    const TestComponent = () => {
      const context = React.useContext(UserContext);
      return <div>{context.isUserAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>;
    };

    const { getByText } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(getByText('Not Authenticated')).toBeTruthy();
  });

  
  it('clears timeout when user is reauthenticated', async () => {
    const TestComponent = () => {
      const context = React.useContext(UserContext);
      return (
        <>
          <div>{context.isUserAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
          <button onClick={() => context.setIsUserAuthenticated(c => !c)}>Login</button>
        </>
      );
    };
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    vitest.useFakeTimers();
    vitest.spyOn(global, 'setTimeout');
    vitest.spyOn(global, 'clearTimeout');

    fireEvent.click(screen.getByText('Login')); // authenticate first time

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(clearTimeout).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText('Login')); // unauthenticate
    fireEvent.click(screen.getByText('Login')); // reauthenticate

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(2);

    vitest.runOnlyPendingTimers();
  });
});