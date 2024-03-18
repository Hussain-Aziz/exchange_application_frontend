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

window.IntersectionObserver = vi.fn().mockImplementation(() => ({observe: () => null}));

describe('Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page params={{course_id: '0'}} />);
    expect(container).toBeTruthy();
  });
});