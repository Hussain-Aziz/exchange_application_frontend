import ViewStudentContent from './content';
import { studentListEnpoint, studentCourseListEnpoint, getHeaders, facultListEndpoint } from '../../../../constants/endpoints';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PaginatedRequest } from '../../../../constants/types/paginatedRequest';
import { CourseApplication, Faculty, Student } from '../../../../constants/types/courseApplicationTypes';

export default async function Page({params}: {params: {student_id: string}}) {

  const search_params = new URLSearchParams({
    id: params.student_id
  });

  const response = await fetch(`${studentListEnpoint}?${search_params.toString()}`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  
  const course_data = await response.json() as PaginatedRequest<Student>

  console.log(course_data.models.length)
  if (course_data.models.length === 0) {
    return redirect('/admin/view_student')
  }

  const student = course_data.models[0]

  const request2 = await fetch(`${studentCourseListEnpoint}?id=${student.aus_id}`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  const courses = await request2.json() as CourseApplication[]

  const request3 = await fetch(`${facultListEndpoint}`, {
    headers: getHeaders(cookies())
  })
  const facultyList = await request3.json() as Faculty[]

  const modifyApplication = async (data: any) => {
    "use server"

    const response = await fetch(`${studentCourseListEnpoint}`, {
      method: 'PATCH',
      headers: getHeaders(cookies()),
      body: JSON.stringify({ data })
    })
  }

  return (
    <ViewStudentContent 
      student={student} 
      courses={courses} 
      modifyApplication={modifyApplication}
      facultyList={facultyList}
      />
  );
}