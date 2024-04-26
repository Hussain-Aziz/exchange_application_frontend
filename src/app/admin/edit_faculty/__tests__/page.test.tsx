import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import EditFacultyContent from '../content'

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
    const facultyList = [
      {
        id: 1,
        user: {
          username: 'username',
          first_name: 'first_name',
          last_name: 'last_name'
        },
        department: 1,
        faculty_type: 1
      }
    ]
    const { container } = render(<EditFacultyContent facultyList={facultyList} editFacultyInfo={null} />);
    expect(container).toBeTruthy();
  });
});