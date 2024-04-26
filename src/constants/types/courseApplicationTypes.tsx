export interface CourseApplication {
  course_application_id: number
  student: Student
  course_code: string
  course_title: string
  course_credits: number
  aus_course: string
  department: number
  syllabus: string
  aus_syllabus: string
  program_area: string | null
  grade_required: string | null
  pre_requisites_met: boolean | null
  approved_status: boolean | null
  comparison_result: any
  running_comparison: boolean
  university: number
  delegated_to : string | null
  delegated_approval: boolean
  comments: string
  force_approval_to: string | null
  approved_by: string | null
}

export interface Student {
  id: number
  aus_id: string
  name: string
  phone_num: string
  expected_graduation: string
  present_college: string
  present_major: string
  current_standing: string
  host_contact_name: string
  host_contact_email: string
  user: UserType
  university: University
  ixo_details: IXODetails
}
export interface University {
  university_name: string
  university_id: number
}

export interface Faculty {
  id: number
  user: UserType
  department: number
  faculty_type: number
}

export interface UserType {
  username: string
  first_name: string
  last_name: string
}

export interface IXODetails {
  initial_approval_id: number
  moe_approval: boolean
  usdoe_approval: boolean
  acreditted: boolean
  acreditted_comments: string
  agreement: boolean
  initial_approval_date: string
  student_type: string
  final_approval: boolean
}