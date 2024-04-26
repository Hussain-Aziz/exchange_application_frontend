'use client'
import React from 'react'
import HomePageButton from '../../../components/HomePageButton'
import ConfirmDialog from '../../../components/ConfirmDialog';
import { ApplicationState } from './page';
import { useRouter } from 'next/navigation';

export default function StudentHomeContent({ applicationState, logout, withdrawApplication, submitApplication }: { applicationState: ApplicationState, logout: () => void, withdrawApplication: () => void, submitApplication: () => void}) {
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);
  const [submitCoursesDialogOpen, setSubmitCoursesDialogOpen] = React.useState(false);
  const router = useRouter()

  const submitCourses = () => {
    submitApplication()
    location.reload()
  }

  const withdraw = () => {
    withdrawApplication()
    router.push('/login')
  }

  const fullLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <>
      {applicationState === undefined || applicationState === "NOT_STARTED" && 
      <HomePageButton onClick={'/student/start_application'} label='Start Application' />
      }

      {(applicationState === "ADDING_COURSES" || applicationState === "APPROVED") && 
      <>
      <HomePageButton onClick={'/student/add_courses'} label='Add Courses' />
      <HomePageButton onClick={'/student/view_courses'} label='View Submitted Courses' />
      <HomePageButton onClick={() => setSubmitCoursesDialogOpen(true)} label='Submit Form' />
      </>
      }

      {(applicationState === "WAITING_INITIAL_APPROVAL" || applicationState === "WAITING_SIGNATURES") &&
      <HomePageButton onClick={'/student/status'} label='Check Application Status'/>
      }

      {applicationState !== "NOT_STARTED" &&
        <HomePageButton onClick={() => setCancelDialogOpen(true)} label='Withdraw Application'/>
      }
      <HomePageButton onClick={fullLogout} label='Logout'/>
      <div>
        <ConfirmDialog action='submit courses' open={submitCoursesDialogOpen} setOpen={setSubmitCoursesDialogOpen} onConfirm={submitCourses} />
        <ConfirmDialog action='cancel' open={cancelDialogOpen} setOpen={setCancelDialogOpen} onConfirm={withdraw} />
      </div>
    </>
  )
}