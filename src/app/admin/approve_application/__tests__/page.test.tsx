import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest'
import SyllabusRequestSelectionContent, {CustomTableRow} from '../content';

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
const student = {
  id: 1,
  aus_id: "88793",
  name: "Hussain Aziz Saif",
  phone_num: "+971501670243",
  expected_graduation: "Fall 2024",
  present_college: "CEN",
  present_major: "Computer Engineering",
  current_standing: "Sophomore",
  host_contact_name: "Jamie",
  host_contact_email: "",
  user: {
    username: "hussain",
    first_name: "Hussain",
    last_name: "Saif",
  },
  university: {
    university_name: "Purdue University",
    university_id: 1,
  },
  ixo_details: {
    initial_approval_id: 1,
    advisor_approval: true,
    associate_dean_approval: true,
    ixo_approval: true,
  },
}

describe('Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<SyllabusRequestSelectionContent fetchData={async(pageNum, searchText) => {}} />);
    expect(container).toBeTruthy();
  });
  it('renders the table row', () => {
    const { container } = render (<CustomTableRow data={student}/>);
    expect(container).toBeTruthy();
  });
});