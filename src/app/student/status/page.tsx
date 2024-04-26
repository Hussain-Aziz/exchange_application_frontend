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
  let extraInfo = ""
  if (applicationData.aus_id === null) applicationState = "Not Started"
  else if (applicationData.ixo_details === null) applicationState = "Waiting for initial approval from exchange office"
  else if (!applicationData.submitted_form) applicationState = "Adding Courses"
  else if (!applicationData.ixo_details.advisor_approval || !applicationData.ixo_details.associate_dean_approval || !applicationData.ixo_details.ixo_approval) {
    applicationState = "Waiting for form approvals: "
    extraInfo += "Advisor " + (!applicationData.ixo_details.advisor_approval ? "(Not Approved), " : "(Approved), ")
    extraInfo += "Associate Dean " + (!applicationData.ixo_details.associate_dean_approval ? "(Not Approved), " : "(Approved), ")
    extraInfo += "IXO " + (!applicationData.ixo_details.ixo_approval ? "(Not Approved)" : "(Approved)")
  }
  else {
    applicationState = "Form Approved."
    extraInfo = "Enjoy your exchange at " + applicationData.university.university_name + "!"
  }

  return (<>
    <Typography variant="h5">
      {`Current Status: ${applicationState}`}
    </Typography>
    <Typography variant="h6">
      {extraInfo}
    </Typography>
    </>
  );
}