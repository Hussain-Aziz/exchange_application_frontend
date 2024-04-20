import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export const baseEndpoint = "http://ec2-16-171-225-90.eu-north-1.compute.amazonaws.com:8000/"
export const loginEndpoint = baseEndpoint + 'login/'
export const applicationInfoEndpoint = baseEndpoint + 'student/application_info/'
export const startApplicationEndpoint = baseEndpoint + 'student/start_application/'
export const listCoursesEndpoint = baseEndpoint + 'student/courses/'
export const availableApprovalsEnpoint = baseEndpoint + 'faculty/available_approvals/'
export const availableSyllabusEndpoint = baseEndpoint + 'faculty/available_syllabus/'
export const UploadSyllabus = baseEndpoint + 'faculty/upload_syllabus/'
export const ApproveCourse = baseEndpoint + 'faculty/approve_course/'
export const comparisonEndpoint = baseEndpoint + 'users/compare_application/'

export function getHeaders(cookies: ReadonlyRequestCookies) {
  const token_cookie = cookies.get('token')
  const token = token_cookie === undefined ? undefined : token_cookie.value

  if (token === undefined) {
    window.location.replace('/login')
  } 
  return {
    "Authorization": "TOKEN " + token,
    "Content-Type": "application/json"
  } as const
}