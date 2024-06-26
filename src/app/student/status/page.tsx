import { applicationInfoEndpoint, getHeaders, submitApplicationEndpoint, listCoursesEndpoint } from "../../../constants/endpoints";
import { cookies } from "next/headers";
import { CourseApplication, Student } from "../../../constants/types/courseApplicationTypes";
import { Button, Grid, Typography } from '@mui/material';
import StatusContent from "./content";
import ViewForm from "@/components/viewForm";

export default async function Page() {
  const applicationDataRequest = await fetch(applicationInfoEndpoint, {
    method: 'GET',
    headers: getHeaders(cookies())
  })

  const student = await applicationDataRequest.json() as Student

  let applicationState = undefined
  let extraInfo = ""
  if (student.aus_id === null) applicationState = "Not Started"
  else if (student.ixo_details === null) applicationState = "Waiting for initial approval from exchange office"
  else if (!student.submitted_form) applicationState = "Adding Courses"
  else if (!student.ixo_details.advisor_approval || !student.ixo_details.associate_dean_approval || !student.ixo_details.ixo_approval) {
    applicationState = "Waiting for form approvals: "
    extraInfo += "Academic Advisor " + (!student.ixo_details.advisor_approval ? "(Not Approved), " : "(Approved), ")
    extraInfo += "Associate Dean " + (!student.ixo_details.associate_dean_approval ? "(Not Approved), " : "(Approved), ")
    extraInfo += "IXO " + (!student.ixo_details.ixo_approval ? "(Not Approved)" : "(Approved)")
  }
  else {
    applicationState = "Form Approved."
    extraInfo = "Enjoy your exchange at " + student.university.university_name + "!"
  }

  const makeRequest = async (data: any) => {
    "use server"
    const response = await fetch(submitApplicationEndpoint, {
      method: 'POST',
      headers: getHeaders(cookies()),
      body: JSON.stringify(data)
    })
  }

  let courses: any = []

  if (applicationState === "Form Approved.") {
    const course_request = await fetch(`${listCoursesEndpoint}`, {
      method: 'GET',
      headers: getHeaders(cookies())
    })
    courses = await course_request.json() as CourseApplication[]
  }

  return (<>
    <Typography variant="h5">
      {`Current Status: ${applicationState}`}
    </Typography>
    <Typography variant="h6">
      {extraInfo}
    </Typography>
    {applicationState === "Waiting for form approvals: " &&
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <StatusContent makeRequest={makeRequest} student={student} />
      </div>
    }
    {applicationState === "Form Approved." &&
      <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
        <Grid item xs={11}>
          <ViewForm student={student} courses={courses} />
        </Grid>
      </Grid>
    }
  </>
  );
}