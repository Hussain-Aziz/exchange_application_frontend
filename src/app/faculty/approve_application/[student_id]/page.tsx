import {facultyApproveForm, facultyListStudent, getHeaders, studentCourseListEnpoint} from '../../../../constants/endpoints';
import {cookies} from 'next/headers';
import ApproveFormContent from './content';
import { CourseApplication, Student } from '@/constants/types/courseApplicationTypes';
import { PaginatedRequest } from '@/constants/types/paginatedRequest';
import { redirect } from 'next/navigation';

export default async function Page({params}: {params: {student_id: string}}) {

  const submitToBackend = async (data: any) => {
    "use server"
    data.id = params.student_id
    await fetch(facultyApproveForm, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
  }

  const response = await fetch(`${facultyListStudent}?id=${params.student_id}&only_final_approval=true`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  
  const student_data = await response.json() as PaginatedRequest<Student>
  
  if (student_data.models.length === 0) {
    return redirect('/faculty/approve_application')
  }

  const student = student_data.models[0]

  const course_request = await fetch(`${studentCourseListEnpoint}?id=${student.id}`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  const courses = await course_request.json() as CourseApplication[]


  return <ApproveFormContent student={student} submitToBackend={submitToBackend} courses={courses}/>;
}