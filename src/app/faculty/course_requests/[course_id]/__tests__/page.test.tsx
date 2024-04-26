import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import CourseRequestContent from '../content';
import ComparisonResult from '../ComparisonResult';

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

window.IntersectionObserver = vi.fn().mockImplementation(() => ({ observe: () => null }));
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
  university: 1,
  comments: "This is a test comment",
}

const comparison_result ={
  "CLO 1": "The student will be able to understand the basic concepts of computer architecture and organization.",
  "match percentage": "100%",
}
describe('Page', () => {
  it('renders with hod', () => {
    const { container } = render(<CourseRequestContent
      course_data={course_data}
      submitToBackend={async (data) => { { } }}
      get_comparison_result={async (data) => { { } }}
      faculty_type={0} />);
    expect(container).toBeTruthy();
  });
  it('renders with teaching faculty', () => {
    const { container } = render(<CourseRequestContent
      course_data={course_data}
      submitToBackend={async (data) => { { } }}
      get_comparison_result={async (data) => { { } }}
      faculty_type={1} />);
    expect(container).toBeTruthy();
  });

  it('renders with comparison', () => {
    const { container } = render(<ComparisonResult 
    comparison_result={comparison_result}
    get_comparison_result={async () => comparison_result}
    id={0}
    />);
    expect(container).toBeTruthy();
  });
  it('renders with no comparison', () => {
    const { container } = render(<ComparisonResult 
    comparison_result={null}
    get_comparison_result={async () => null}
    id={0}
    />);
    expect(container).toBeTruthy();
  });
});