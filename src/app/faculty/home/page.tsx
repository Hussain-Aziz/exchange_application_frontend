import React from 'react'
import FacultyHomeContent from './content'
import { cookies } from 'next/headers'

export default function Page() {
  const logout = async () => {
    "use server"
    cookies().delete('token')
    cookies().delete('user')
  }

  const faculty_type = JSON.parse(cookies().get('user')?.value!).faculty_type

  return <FacultyHomeContent logout={logout} faculty_type={faculty_type}/>
}