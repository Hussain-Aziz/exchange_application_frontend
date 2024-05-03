import React from 'react'
import FacultyHomeContent from './content'
import { cookies } from 'next/headers'

export default function Page() {

  const faculty_type = JSON.parse(cookies().get('user')?.value!).faculty_type

  return <FacultyHomeContent faculty_type={faculty_type}/>
}