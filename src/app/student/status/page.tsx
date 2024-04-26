import { applicationInfoEndpoint, getHeaders } from "../../../constants/endpoints";
import { cookies } from "next/headers";
import { Student } from "../../../constants/types/courseApplicationTypes";
import { Typography } from '@mui/material';

export default async function Page() {
  const applicationDataRequest = await fetch(applicationInfoEndpoint, {
    method: 'GET',
    headers: getHeaders(cookies())
  })

  const applicationData = await applicationDataRequest.json() as Student

  let applicationState = undefined
  if (applicationData.aus_id === null) applicationState = "Not Started"
  else if (applicationData.ixo_details === null) applicationState = "Waiting for initial approval from exchange office"
  else applicationState = "Adding Courses"

  return (
    <Typography variant="h5">
      {`Current Status: ${applicationState}`}
    </Typography>
  );
}