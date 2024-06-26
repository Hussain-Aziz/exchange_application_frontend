import CourseRequestContent from './content';
import { availableApprovalsEnpoint, ApproveCourse, comparisonEndpoint, getHeaders } from '../../../../constants/endpoints';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import { CourseApplication } from '@/constants/types/courseApplicationTypes';
import { PaginatedRequest } from '@/constants/types/paginatedRequest';

export default async function Page({params}: {params: {course_id: string}}) {

  const submitToBackend = async (data: any) => {
    "use server"
    data.id = params.course_id
    const response = await fetch(ApproveCourse, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
    revalidatePath('/faculty/course_requests')
    redirect('/faculty/course_requests')
  }

  const search_params = new URLSearchParams({
    id: params.course_id
  });

  const get_comparison_result = async (id: number) => {
    "use server"
    let r = await fetch(`${comparisonEndpoint}?id=${id}`, {headers: getHeaders(cookies())})
    if (r.status === 500 || r.status === 404 || r.status === 400) {
      r = await fetch(`${comparisonEndpoint}?id=${id}`, {headers: getHeaders(cookies())})
      if (r.status === 500 || r.status === 404 || r.status === 400) {
        r = await fetch(`${comparisonEndpoint}?id=${id}`, {headers: getHeaders(cookies())})
        if (r.status === 500 || r.status === 404 || r.status === 400) {
          console.log('Error getting comparison result');
          return;
        }
      }
    }
    let res = await r.json();
    return res
  }

  const response = await fetch(`${availableApprovalsEnpoint}?${search_params.toString()}`, {
    headers: getHeaders(cookies())
  })
  const course_data = await response.json() as PaginatedRequest<CourseApplication>

  if (course_data.models.length === 0) {
    return redirect('/faculty/course_requests')
  }

  const faculty_type = JSON.parse(cookies().get('user')?.value!).faculty_type

  return (
    <CourseRequestContent 
      submitToBackend={submitToBackend} 
      course_data={course_data.models[0]} 
      get_comparison_result={get_comparison_result}
      faculty_type={faculty_type}
    />
  );
}