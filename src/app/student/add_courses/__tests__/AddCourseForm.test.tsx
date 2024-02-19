import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import Page from '../page';
import AddCourseForm from '../AddCourseForm';

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
    const { container } = render(<AddCourseForm AusCourses={[{name: '', code: ''}]} AusSubjects={['']}  />);
    expect(container).toBeTruthy();
  });
});