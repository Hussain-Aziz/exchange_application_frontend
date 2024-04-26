import React from 'react'
import AdminHomeContent from './content'
import { cookies } from 'next/headers'

export default function Page() {
  const logout = async () => {
    "use server"
    cookies().delete('token')
    cookies().delete('user')
  }

  return <AdminHomeContent logout={logout}/>
}