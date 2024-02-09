import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import RootLayout, { metadata, viewport } from '../layout';

vi.mock('next/font/google', () => ({
  Inter: () => ({}),
}));

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
    const m = metadata;
    const v = viewport;
    const { container } = render(<RootLayout><></></RootLayout>);
    expect(container).toBeTruthy();
  });
});