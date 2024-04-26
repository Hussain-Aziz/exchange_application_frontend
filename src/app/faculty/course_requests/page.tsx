import CourseRequestSelectionContent from './content';
import { availableApprovalsEnpoint, getHeaders } from '../../../constants/endpoints';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export default async function Page({params}: {params: {course_id: string}}) {

  const fetchData = async (pageNum: number, searchText: string) => {
    "use server"

    const searchParams = new URLSearchParams()
    if (searchText !== '' && searchText !== undefined) searchParams.append('search', searchText)
    searchParams.append('page', pageNum.toString())
    
    const response = await fetch(`${availableApprovalsEnpoint}?${searchParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json()
    return body
    
  }

  return (
    <CourseRequestSelectionContent fetchData={fetchData}/>
  );
}