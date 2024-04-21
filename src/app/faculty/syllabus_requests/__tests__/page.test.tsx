import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import SyllabusRequestSelectionContent from '../content';

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
    const { container } = render(<SyllabusRequestSelectionContent fetchData={async(pageNum, searchText) => {}} />);
    expect(container).toBeTruthy();
  });
});