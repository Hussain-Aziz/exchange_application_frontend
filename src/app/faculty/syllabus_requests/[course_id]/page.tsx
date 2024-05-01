import SyllabusRequestsContent from './content';
import { availableSyllabusEndpoint, UploadSyllabus, getHeaders, comparisonEndpoint } from '../../../../constants/endpoints';
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
    }).then(response => response.json())

    setTimeout(() => 
    {
      fetch(`${comparisonEndpoint}?id=${response.id}`, {
        method: 'GET',
        headers: getHeaders(cookies())
    }).then(response => response.json())}, 1000);
    
    revalidatePath('/faculty/syllabus_requests')
    redirect('/faculty/syllabus_requests')
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
    return redirect('/faculty/syllabus_requests')
  }

  return (
    <SyllabusRequestsContent sendToBackend={submitToBackend} syllabus={course_data.models[0].syllabus}/>
  );
}