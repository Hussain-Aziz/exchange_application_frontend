import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import SyllabusRequestsContent from '../content';

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
    const { container } = render(<SyllabusRequestsContent sendToBackend={async (data) => {}} syllabus='' />);
    expect(container).toBeTruthy();
  });
});