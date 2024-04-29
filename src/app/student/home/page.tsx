import { cookies } from 'next/headers'
import StudentHomeContent from './content';
import { applicationInfoEndpoint, submitApplicationEndpoint, getHeaders, startApplicationEndpoint } from '../../../constants/endpoints';
import { Student } from '@/constants/types/courseApplicationTypes';
import { a } from 'vitest/dist/suite-ghspeorC.js';

export default async function Page() {

  const logout = async () => {
    "use server"
    cookies().delete('token')
    cookies().delete('user')
  }

  const withdrawApplication = async () => {
    "use server"
    const withdrawRequest = await fetch(startApplicationEndpoint, {
      method: 'DELETE',
      headers: getHeaders(cookies())
    })
  }

  const submitApplication = async () => {
    "use server"
    const submitRequest = await fetch(submitApplicationEndpoint, {
      method: 'POST',
      headers: getHeaders(cookies())
    })
  }

  const applicationDataRequest = await fetch(applicationInfoEndpoint, {
    method: 'GET',
    headers: getHeaders(cookies())
  })

  const applicationData = await applicationDataRequest.json() as Student

  let applicationState: ApplicationState = undefined
  if (applicationData.aus_id === null) applicationState = "NOT_STARTED"
  else if (applicationData.ixo_details === null) applicationState = "WAITING_INITIAL_APPROVAL"
  else if (!applicationData.submitted_form) applicationState = "ADDING_COURSES"
  else applicationState = "WAITING_SIGNATURES"

  return <StudentHomeContent applicationState={applicationState} logout={logout} withdrawApplication={withdrawApplication} submitApplication={submitApplication}/>


}

export type ApplicationState = "NOT_STARTED" | "WAITING_INITIAL_APPROVAL" | "ADDING_COURSES" | "WAITING_SIGNATURES" | "APPROVED" | undefined
