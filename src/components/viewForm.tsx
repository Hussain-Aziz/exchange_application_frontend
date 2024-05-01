import {
  Grid,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CourseApplication, Student } from "../constants/types/courseApplicationTypes";
import ViewPdf from './ViewPdf';

export default function ViewForm({ student, courses }: { student: Student, courses: CourseApplication[] }) {
  const approved_courses = courses.filter(course => course.approved_status)
  return (
    <Paper sx={{ padding: '10px', marginBottom: '20px' }}>
      <Typography sx={{ textAlign: 'center', marginBottom: '10px' }} variant="h4">Student Information</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body1">AUS ID: {student.aus_id}</Typography>
          <Typography variant="body1">Name: {student.name}</Typography>
          <Typography variant="body1">Phone Number: {student.phone_num}</Typography>
          <Typography variant="body1">Present Major: {student.present_major}</Typography>
          <Typography variant="body1">Current Standing: {student.current_standing}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">University: {student.university.university_name}</Typography>
          <Typography variant="body1">Expected Graduation: {student.expected_graduation}</Typography>
          <Typography variant="body1">Present College: {student.present_college}</Typography>
          <Typography variant="body1">Host Contact Name: {student.host_contact_name}</Typography>
          <Typography variant="body1">Host Contact Email: {student.host_contact_email}</Typography>
        </Grid>
      </Grid>

      <Typography sx={{ textAlign: 'center', marginTop: '40px', marginBottom: '10px' }} variant="h4">Approvals</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body1">Advisor Approval: {student.ixo_details.advisor_approval ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Associate Dean Approval: {student.ixo_details.associate_dean_approval ? 'Yes' : 'No'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Scholarship Approval: {student.ixo_details.scholarship_approval ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Sponsorship Approval: {student.ixo_details.sponsorship_approval ? 'Yes' : 'No'}</Typography>
        </Grid>
      </Grid>


      <Typography sx={{ textAlign: 'center', marginTop: '40px', marginBottom: '10px' }} variant="h4">Courses</Typography>
      {approved_courses.map((course, index) => {
        return (
          <>
            <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
              <Grid item xs={6}>
                <Typography variant="body1">AUS Course {course.aus_course}</Typography>
                <Typography variant="body1">Credits: {course.course_credits}</Typography>
                <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>Program Area: {course.program_area?.split('.')[1]}</Typography>
                <Typography variant="body1">Approved by: {course.approved_by}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Course Code: {course.course_code}</Typography>
                <Typography variant="body1">Course Title: {course.course_title}</Typography>
                <Typography variant="body1">Grade Required: {course.grade_required}</Typography>
                <Typography variant="body1">Prerequisites Met: {course.pre_requisites_met ? 'Yes' : 'No'}</Typography>
              </Grid>
              {course.ignore_aus_syllabus ?
                <Grid item xs={12}>
                  <Accordion style={{ border: '1px solid #000' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>View Host Syllabus</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ViewPdf link={course.syllabus} />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                :
                <>
                  <Grid item xs={6}>
                  <Accordion style={{ border: '1px solid #000' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>View AUS Syllabus</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ViewPdf link={course.aus_syllabus} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item xs={6}>
                    <Accordion style={{ border: '1px solid #000' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>View Host Syllabus</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ViewPdf link={course.syllabus} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </>
              }
            </Grid>
          </>
        )

      })}

    </Paper>
  )
}