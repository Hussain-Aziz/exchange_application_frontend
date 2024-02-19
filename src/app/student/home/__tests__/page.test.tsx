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
    const { container } = render(<Page mockApplicationState="NOT_STARTED" />);
    expect(container).toBeTruthy();
  });
  it('renders without crashing with mockApplicationState', () => {
    const { container } = render(<Page mockApplicationState="WAITING_INITIAL_APPROVAL" />);
    expect(container).toBeTruthy();
  });
  it('renders without crashing with mockApplicationState', () => {
    const { container } = render(<Page mockApplicationState="ADDING_COURSES" />);
    expect(container).toBeTruthy();
  });
  it('renders without crashing with mockApplicationState', () => {
    const { container } = render(<Page mockApplicationState="WAITING_SIGNATURES" />);
    expect(container).toBeTruthy();
  });
  it('renders without crashing with mockApplicationState', () => {
    const { container } = render(<Page mockApplicationState="APPROVED" />);
    expect(container).toBeTruthy();
  });
  it('renders without crashing with mockApplicationState', () => {
    const { container } = render(<Page mockApplicationState={undefined} />);
    expect(container).toBeTruthy();
  });
});