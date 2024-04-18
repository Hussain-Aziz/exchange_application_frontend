import SyllabusRequestSelectionContent from './content';
import { availableSyllabusEndpoint, getHeaders } from '../../../constants/endpoints';
import { cookies } from 'next/headers';

export default async function Page({params}: {params: {course_id: string}}) {

  const fetchData = async (pageNum: number, searchText: string) => {
    "use server"

    const searchParams = new URLSearchParams()
    if (searchText !== '' && searchText !== undefined) searchParams.append('search', searchText)
    searchParams.append('page', pageNum.toString())
    
    const response = await fetch(`${availableSyllabusEndpoint}?${searchParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json()
    return body
    
  }

  return (
    <SyllabusRequestSelectionContent fetchData={fetchData}/>
  );
}