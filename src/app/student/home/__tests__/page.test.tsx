import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import StudentHomeContent from '../content';

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
    const { container } = render(<StudentHomeContent applicationState='ADDING_COURSES' logout={() => {}}/>);
    expect(container).toBeTruthy();
  });
});