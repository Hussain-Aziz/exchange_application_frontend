import React from "react"
import RegisterContent from "./content"
import { cookies } from "next/headers"
import { getHeaders, registerEndpoint } from "@/constants/endpoints"

export default function Page(): React.ReactNode {
  const register = async (data: any) => {
    "use server"
    const response = await fetch(registerEndpoint, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
  }
  return (
    <RegisterContent register={register}/>
  )
}