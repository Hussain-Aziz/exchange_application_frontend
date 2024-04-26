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

  const student_data_request = await fetch(`${studentListEnpoint}?${search_params.toString()}`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  
  const student_data = await student_data_request.json() as PaginatedRequest<Student>

  console.log(student_data.models.length)
  if (student_data.models.length === 0) {
    return redirect('/admin/view_student')
  }

  const student = student_data.models[0]

  const course_request = await fetch(`${studentCourseListEnpoint}?id=${student.id}`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  const courses = await course_request.json() as CourseApplication[]

  const faculty_request = await fetch(`${facultListEndpoint}`, {
    headers: getHeaders(cookies())
  })
  const facultyList = await faculty_request.json() as Faculty[]

  const modifyApplication = async (data: any) => {
    "use server"

    const response = await fetch(`${studentCourseListEnpoint}`, {
      method: 'PATCH',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
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