import { cookies } from 'next/headers'
import StudentHomeContent from './content';
import { applicationInfoEndpoint, getHeaders } from '../../../constants/endpoints';

export default async function Page() {

  const logout = async () => {
    "use server"
    cookies().delete('token')
    cookies().delete('user')
  }

  const withdrawApplication = async () => {
    "use server"
    const withdrawRequest = await fetch(applicationInfoEndpoint, {
      method: 'DELETE',
      headers: getHeaders(cookies())
    })

    if (withdrawRequest.status === 200) {
      logout()
    }
  }

  const applicationDataRequest = await fetch(applicationInfoEndpoint, {
    method: 'GET',
    headers: getHeaders(cookies())
  })

  const applicationData = await applicationDataRequest.json()

  let applicationState: ApplicationState = undefined
  if (applicationData.aus_id === null) applicationState = "NOT_STARTED"
  else applicationState = "ADDING_COURSES"

  return <StudentHomeContent applicationState={applicationState} logout={logout} withdrawApplication={withdrawApplication} />


}

export type ApplicationState = "NOT_STARTED" | "WAITING_INITIAL_APPROVAL" | "ADDING_COURSES" | "WAITING_SIGNATURES" | "APPROVED" | undefined
