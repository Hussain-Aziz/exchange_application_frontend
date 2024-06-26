'use client';
import React, { useMemo } from 'react'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Box,
  Grid,
  Typography,
  Divider,
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import { CourseApplication, Faculty, Student } from '../../../../constants/types/courseApplicationTypes';
import { createStyledTableCell, createStyledTableRow } from '../../../../components/StyledTableComponents'
import ViewForm from '@/components/viewForm';

export default function ViewStudentContent({ student, courses, facultyList, modifyApplication }: { student: Student, courses: CourseApplication[], facultyList: Faculty[], modifyApplication: (course: any) => void }) {
  const columns = ["Course", "AUS Course", "Assigned to", "Status", ""]
  const StyledTableCell:any = useMemo(() => styled(TableCell)(createStyledTableCell()), []);

  if (student.submitted_form && student.ixo_details.ixo_approval) {
    return (
    <Box style={{ overflow: 'auto', marginBottom: '20px', marginRight: '20px' }}>
    <ViewForm courses={courses} student={student}  />
    </Box>
    )
  }

  return (
    <Box style={{ overflow: 'auto', maxHeight: '500px', marginBottom: '20px', marginRight: '20px' }}>

      <Typography variant="h6">Student Information</Typography>
      <Grid container spacing={3}>
      <Grid item xs={6}>
          <Typography variant="body1">AUS ID: {student.aus_id}</Typography>
          <Typography variant="body1">Name: {student.name}</Typography>
          <Typography variant="body1">Phone Number: {student.phone_num}</Typography>
          <Typography variant="body1">Present Major: {student.present_major}</Typography>
          <Typography variant="body1">Current Standing: {student.current_standing}</Typography>
          <Typography variant="body1">Advisor Approval: {student.ixo_details.advisor_approval ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Associate Dean Approval: {student.ixo_details.associate_dean_approval ? 'Yes' : 'No'}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">University: {student.university.university_name}</Typography>
          <Typography variant="body1">Expected Graduation: {student.expected_graduation}</Typography>
          <Typography variant="body1">Present College: {student.present_college}</Typography>
          <Typography variant="body1">Host Contact Name: {student.host_contact_name}</Typography>
          <Typography variant="body1">Host Contact Email: {student.host_contact_email}</Typography>
          <Typography variant="body1">Scholarship Approval: {student.ixo_details.scholarship_approval ? 'Yes' : 'No'}</Typography>
          <Typography variant="body1">Sponsorship Approval: {student.ixo_details.sponsorship_approval ? 'Yes' : 'No'}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="h6">Course Applications</Typography>
      <Paper>
        <TableContainer style={{ overflowX: undefined }}>
          <Table>
            <TableHead>
              <TableRow style={{ padding: '10px' }}>
                {columns.map((col) => {
                  return (<StyledTableCell style={{ padding: '10px', backgroundColor: '#efefef' }} key={col}>{col}</StyledTableCell>)
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course: CourseApplication) => <CourseRow key={course.course_application_id} course={course} modifyApplication={modifyApplication} facultyList={facultyList} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

function CourseRow({ course, facultyList, modifyApplication }: { course: CourseApplication, facultyList: Faculty[], modifyApplication: (course: any) => void }) {
  let status = "Pending"
  if (course.approved_status === true) {
    status = "Approved"
  } else if (course.approved_status === false) {
    status = "Rejected"
  }

  const dbAssignedToValue = course.force_approval_to || facultyList.find(faculty => faculty.faculty_type == 2 && faculty.department == course.department)?.user.username

  const iref = React.useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = React.useState(false)

  const onSaveClick = () => {
    setIsEditing(false)
    if (iref.current?.value !== dbAssignedToValue) {
      modifyApplication({
        id: course.course_application_id,
        assignedTo: iref.current?.value,
      })
    }
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }


  const StyledTableRow = styled(TableRow)(createStyledTableRow())
  const StyledTableCell = styled(TableCell)(createStyledTableCell())

  return (
    <StyledTableRow key={course.course_application_id}>
      <StyledTableCell>{course.course_code} </StyledTableCell>
      <StyledTableCell>{course.aus_course}</StyledTableCell>
      <StyledTableCell>
        {isEditing && course.approved_status === null
          ? <TextField inputRef={iref} defaultValue={dbAssignedToValue}/>
          : dbAssignedToValue
        }
      </StyledTableCell>
      <StyledTableCell>{status}</StyledTableCell>
      <StyledTableCell>
        {isEditing
          ? <IconButton onClick={onSaveClick}><SaveIcon /></IconButton>
          : <IconButton onClick={() => setIsEditing(!isEditing)}><EditIcon /></IconButton>
        }
      </StyledTableCell>
    </StyledTableRow>
  )
}