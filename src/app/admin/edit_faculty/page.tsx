import React from 'react'
import EditFacultyContent from './content'
import { cookies } from 'next/headers'
import { getHeaders, facultListEndpoint } from '@/constants/endpoints'
import { Faculty } from '@/constants/types/courseApplicationTypes'
import { PaginatedRequest } from '@/constants/types/paginatedRequest'

export default async function Page() {

  const editFacultyInfo = async (faculty:Faculty, data: any) => {
    "use server"
    const response = await fetch(facultListEndpoint, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
  }

  const response = await fetch(`${facultListEndpoint}`, {
    headers: getHeaders(cookies())
  })
  const facultyList = await response.json() as Faculty[]

  return <EditFacultyContent facultyList={facultyList} editFacultyInfo={editFacultyInfo}/>
}