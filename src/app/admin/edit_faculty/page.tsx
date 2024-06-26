import React from 'react'
import EditFacultyContent from './content'
import { cookies } from 'next/headers'
import { getHeaders, facultListEndpoint } from '@/constants/endpoints'
import { Faculty } from '@/constants/types/courseApplicationTypes'
import { PaginatedRequest } from '@/constants/types/paginatedRequest'

export default async function Page() {

  //accept faculty.id, name, email, getDepartments().indexOf(department), getFacultyTypes().indexOf(facultyType)
  const editFacultyInfo = async (id: number, department: number, facultyType: number) => {
    "use server"
    const data = {
      id: id,
      department: department,
      faculty_type: facultyType
    }
    console.log(JSON.stringify(data))
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