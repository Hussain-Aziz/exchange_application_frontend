'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export default function ActivateContent() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push('/login')
    }
    , 2000)
  }
  , [])
  return (
    <>
    </>
  )
}