'use client'
import React, { useEffect, useState } from 'react'
import HomePageButton from '../../../components/HomePageButton'

export default function Page() {

  const [applicationState, setApplicationState] = useState<ApplicationState>(undefined)

  useEffect(() => {
    setApplicationState(JSON.parse(localStorage.getItem("applicationState") || JSON.stringify('NOT_STARTED')))
  }, [])

  console.log(applicationState)

  return (
    <>
      {applicationState === undefined || applicationState === "NOT_STARTED" && 
      <HomePageButton onClick={'/student/start_application'} label='Start Application' />
      }

      {(applicationState === "ADDING_COURSES" || applicationState === "APPROVED") && 
      <HomePageButton onClick={'/student/add_courses'} label='Add Courses' />
      }

      {(applicationState === "WAITING_INITIAL_APPROVAL" || applicationState === "WAITING_SIGNATURES") &&
      <HomePageButton onClick={'/student/status'} label='Check Application Status'/>
      }

      {applicationState !== "NOT_STARTED" &&
      <HomePageButton onClick={'/student/cancel'} label='Withdraw Application'/>
      }

      <HomePageButton logout label='Logout'/>
    </>
  )
}

export type ApplicationState = "NOT_STARTED" | "WAITING_INITIAL_APPROVAL" | "ADDING_COURSES" | "WAITING_SIGNATURES" | "APPROVED" | undefined
