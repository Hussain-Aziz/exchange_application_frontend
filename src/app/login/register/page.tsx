import React from "react"
import RegisterContent from "./content"
import { cookies } from "next/headers"
import { getHeaders, registerEndpoint } from "@/constants/endpoints"

export default function Page(): React.ReactNode {
  const register = async (data: any) => {
    "use server"
    console.log(JSON.stringify(data))
    const response = await fetch(registerEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(response)
  }
  return (
    <RegisterContent register={register}/>
  )
}