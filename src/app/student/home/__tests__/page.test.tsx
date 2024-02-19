import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
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

describe('Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });
  it('renders without crashing with mockApplicationState', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });
});