import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import Layout from '../layout';

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


describe('Layout', () => {
  it('renders without crashing', () => {
    const { container } = render(<Layout><></></Layout>);
    expect(container).toBeTruthy();
  });
});