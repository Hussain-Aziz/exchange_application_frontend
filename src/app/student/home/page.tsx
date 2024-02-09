'use client'
import React, { useContext } from 'react'
import HomePageButton from '../../../components/HomePageButton'
import { UserContext } from '../../../contexts/UserContext';
import { useRouter } from 'next/navigation';

type ApplicationState = "NOT_STARTED" | "WAITING_INITIAL_APPROVAL" | "ADDING_COURSES" | "WAITING_SIGNATURES" | "APPROVED"

function getApplicationState(): ApplicationState {
  return "NOT_STARTED"
}

export default function Page() {
  const userContext = useContext(UserContext)
  const router = useRouter()

  let applicationState: ApplicationState = getApplicationState()

  const handleLogout = () => { userContext.setIsUserAuthenticated(false); router.push('/login') }
  return (
    <>
      {applicationState === "NOT_STARTED" && 
      <HomePageButton onClick={'/student/start_application'} label='Start Application' />
      }

      {(applicationState === "ADDING_COURSES" || applicationState === "APPROVED") && 
      <HomePageButton onClick={'/student/courses'} label='Add Courses' />
      }

      {(applicationState === "WAITING_INITIAL_APPROVAL" || applicationState === "WAITING_SIGNATURES") &&
      <HomePageButton onClick={'/student/status'} label='Check Application Status'/>
      }

      {applicationState !== "NOT_STARTED" &&
      <HomePageButton onClick={'/student/cancel'} label='Withdraw Application'/>
      }

      <HomePageButton onClick={handleLogout} label='Logout'/>
    </>
  )
}