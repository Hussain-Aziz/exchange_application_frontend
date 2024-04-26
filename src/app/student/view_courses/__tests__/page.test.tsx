import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import CoursesContent from '../content';

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
    const course_data = {
      course_application_id: 6,
      student: {
        id: 1,
        aus_id: "88793",
        name: "Hussain Aziz Saif",
        phone_num: "+971501670243",
        expected_graduation: "Fall 2024",
        present_college: "CEN",
        present_major: "Computer Engineering",
        current_standing: "Sophomore",
        host_contact_name: "Jamie",
        host_contact_email: "jamie@pfw.edu",
        user: 4,
        university: 1
      },
      delegated_to: null,
      course_code: "Cs 27100",
      course_title: "Architecture",
      course_credits: 3,
      aus_course: "COE 341",
      department: 13,
      syllabus: "https://utfs.io/f/5437cba8-fb26-4c5e-b74d-1c821c2c6d1d-mrpsz7.pdf",
      aus_syllabus: "https://utfs.io/f/1e5be888-3ed0-46bf-bd2c-c7b5499d0e1a-rg3q21.pdf",
      program_area: null,
      grade_required: null,
      pre_requisites_met: null,
      approved_status: null,
      comparison_result: null,
      running_comparison: false,
      delegated_approval: false,
      university: 1
    }
    const { container } = render(<CoursesContent courses={[course_data]} cancelApplication={() => { }}/>);
    expect(container).toBeTruthy();
  });
});