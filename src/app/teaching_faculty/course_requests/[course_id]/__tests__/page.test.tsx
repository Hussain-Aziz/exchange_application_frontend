import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import CourseRequestContent from '../content';

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
    const { container } = render(<CourseRequestContent course_data={{}} submitToBackend={async(data) => {{}}} />);
    expect(container).toBeTruthy();
  });
});