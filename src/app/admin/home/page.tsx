import React from 'react'
import AdminHomeContent from './content'
import { studentListEnpoint, getHeaders } from '../../../constants/endpoints';
import { cookies } from 'next/headers';
import { PaginatedRequest } from '@/constants/types/paginatedRequest';
import { Student } from '@/constants/types/courseApplicationTypes';

export default function Page() {

  const approveApplication = async () => {
    "use server"
    const searchParams = new URLSearchParams()
    searchParams.append('only_final_approval', 'true')
    
    const response = await fetch(`${studentListEnpoint}?${searchParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json() as PaginatedRequest<Student>
    return body.pagination.total_entries
  }

  const newApplication = async () => {
    "use server"
    const searchParams = new URLSearchParams()
    searchParams.append('only_new_students', 'true')
    
    const response = await fetch(`${studentListEnpoint}?${searchParams.toString()}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json() as PaginatedRequest<Student>
    return body.pagination.total_entries
  }


  return <AdminHomeContent approveApplication={approveApplication} newApplication={newApplication}/>
}