import { getHeaders, listCoursesEndpoint, ApproveCourse } from "../../../constants/endpoints";
import { cookies } from 'next/headers';
import CoursesContent from './content';
import { revalidatePath } from 'next/cache';

export default async function Page() {

  const coursesResponse = await fetch(listCoursesEndpoint, {
    method: 'GET',
    headers: getHeaders(cookies())
  })

  const courses = await coursesResponse.json()

  const cancelApplication = async (id: number) => {
    "use server"
    const response = await fetch(ApproveCourse, {
      method: 'DELETE',
      headers: getHeaders(cookies()),
      body: JSON.stringify({ 'id': id })
    })
    revalidatePath('/student/view_courses')
  }

  return (
    <CoursesContent courses={courses} cancelApplication={cancelApplication} />
  )
}