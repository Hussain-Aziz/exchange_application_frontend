import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import CourseRequestSelectionContent, {CustomTableRow} from '../content';

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
    const { container } = render(<CourseRequestSelectionContent fetchData={async (pageNumber, searchText) => {}} />);
    expect(container).toBeTruthy();
  });

  it('renders the table row', () => {
    const { container } = render (<CustomTableRow data={{
      course_application_id: 6,
      course_code: "Cs 27100",
      course_title: "Architecture",
      student: {
        aus_id: "88793",
        name: "Hussain Aziz Saif"
      }
    }} />);
    expect(container).toBeTruthy();
  });
});