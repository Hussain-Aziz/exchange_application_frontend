import {newApplicationEndpoint, studentListEnpoint, getHeaders} from '../../../../constants/endpoints';
import {cookies} from 'next/headers';
import NewApplicationContent from './content';
import { Student } from '@/constants/types/courseApplicationTypes';
import { PaginatedRequest } from '@/constants/types/paginatedRequest';
import { redirect } from 'next/navigation';

export default async function Page({params}: {params: {student_id: string}}) {

  const submitToBackend = async (data: any) => {
    "use server"
    data.id = params.student_id
    await fetch(newApplicationEndpoint, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
  }

  console.log(`${studentListEnpoint}?id=${params.student_id}&only_new_students=true`)

  const response = await fetch(`${studentListEnpoint}?id=${params.student_id}&only_new_students=true`, {
    method: 'GET',
    headers: getHeaders(cookies())
  })
  
  const student_data = await response.json() as PaginatedRequest<Student>
  
  if (student_data.models.length === 0) {
    return redirect('/admin/new_application')
  }

  const student = student_data.models[0]


  return <NewApplicationContent student={student} submitToBackend={submitToBackend}/>
}