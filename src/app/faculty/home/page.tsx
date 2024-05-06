import React from 'react'
import FacultyHomeContent from './content'
import { cookies } from 'next/headers'
import { availableApprovalsEnpoint, getHeaders, availableSyllabusEndpoint, facultyListStudent } from '../../../constants/endpoints'

export default function Page() {

  const faculty_type = JSON.parse(cookies().get('user')?.value!).faculty_type

  const courseRequests = async () => {
    "use server"

    const response = await fetch(`${availableApprovalsEnpoint}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json()
    return body.pagination.total_entries

  }
  const syllabusRequests = async () => {
    "use server"

    const response = await fetch(`${availableSyllabusEndpoint}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json()
    return body.pagination.total_entries

  }
  const approveApplication = async () => {
    "use server"

    const response = await fetch(`${facultyListStudent}`, {
      method: 'GET',
      headers: getHeaders(cookies()),
    })

    const body = await response.json()
    return body.pagination.total_entries

  }


  return <FacultyHomeContent faculty_type={faculty_type} courseRequests={courseRequests} syllabusRequests={syllabusRequests} approveApplication={approveApplication}/>
}