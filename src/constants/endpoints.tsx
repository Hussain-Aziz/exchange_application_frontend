import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

const baseEndpoint = "http://127.0.0.1:8000/"
export const loginEndpoint = baseEndpoint + 'login/'
export const applicationInfoEndpoint = baseEndpoint + 'student/application_info/'
export const startApplicationEndpoint = baseEndpoint + 'student/start_application/'
export const listCoursesEndpoint = baseEndpoint + 'student/courses/'
export const submitApplicationEndpoint = baseEndpoint + 'student/submit_application/'

export const availableApprovalsEnpoint = baseEndpoint + 'faculty/available_approvals/'
export const availableSyllabusEndpoint = baseEndpoint + 'faculty/available_syllabus/'
export const UploadSyllabus = baseEndpoint + 'faculty/upload_syllabus/'
export const ApproveCourse = baseEndpoint + 'faculty/approve_course/'

export const comparisonEndpoint = baseEndpoint + 'users/compare_application/'

export const facultListEndpoint = baseEndpoint + 'ixo/faculty/'
export const studentListEnpoint = baseEndpoint + 'ixo/student/'
export const studentCourseListEnpoint = baseEndpoint + 'ixo/courses/'
export const newApplicationEndpoint = baseEndpoint + 'ixo/new_application/'
export const finalApprovalEndpoint = baseEndpoint + 'ixo/final_approval/'

export function getHeaders(cookies: ReadonlyRequestCookies) {
  const token_cookie = cookies.get('token')
  const token = token_cookie === undefined ? undefined : token_cookie.value

  if (token === undefined) {
    window.location.replace('/login')
    return {
      "Authorization": "TOKEN ",
      "Content-Type": "application/json"
    } as const
  }
  else {
    return {
      "Authorization": "TOKEN " + token,
      "Content-Type": "application/json"
    } as const
  }
}