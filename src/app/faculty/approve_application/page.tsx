import ViewStudentContent from './content';
import { facultyListStudent, getHeaders } from '../../../constants/endpoints';
import { cookies } from 'next/headers';
import { PaginatedRequest } from '../../../constants/types/paginatedRequest';
import { Student } from '../../../constants/types/courseApplicationTypes';

export default async function Page({params}: {params: {course_id: string}}) {

  const fetchData = async (pageNum: number, searchText: string) => {
    "use server"

    const searchParams = new URLSearchParams()
    if (searchText !== '' && searchText !== undefined) searchParams.append('search', searchText)
    searchParams.append('page', pageNum.toString())
    
    const response = await fetch(`${facultyListStudent}?${searchParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json() as PaginatedRequest<Student>
    return body 
  }

  return (
    <ViewStudentContent fetchData={fetchData}/>
  );
}