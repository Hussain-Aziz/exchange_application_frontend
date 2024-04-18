import SyllabusRequestsContent from './content';
import { availableSyllabusEndpoint, UploadSyllabus, getHeaders } from '../../../../constants/endpoints';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PaginatedRequest } from '@/constants/types/paginatedRequest';
import { CourseApplication } from '@/constants/types/courseApplicationTypes';

export default async function Page({params}: {params: {course_id: string}}) {

  const submitToBackend = async (data: any) => {
    "use server"

    data.id = params.course_id

    const response = await fetch(UploadSyllabus, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
    revalidatePath('/teaching_faculty/syllabus_requests')
    redirect('/teaching_faculty/syllabus_requests')
  }

  const search_params = new URLSearchParams({
    id: params.course_id
  });

  const response = await fetch(`${availableSyllabusEndpoint}?${search_params.toString()}`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  
  const course_data = await response.json() as PaginatedRequest<CourseApplication>

  console.log(course_data.models.length)
  if (course_data.models.length === 0) {
    return redirect('/teaching_faculty/syllabus_requests')
  }

  return (
    <SyllabusRequestsContent sendToBackend={submitToBackend} syllabus={course_data.models[0].syllabus}/>
  );
}