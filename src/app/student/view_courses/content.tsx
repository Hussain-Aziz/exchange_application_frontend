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
  Link,
  Tooltip
 } from '@mui/material'
import { CourseApplication } from '@/constants/types/courseApplicationTypes';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import { styled } from '@mui/system';
import { createStyledTableCell, createStyledTableRow } from '../../../components/StyledTableComponents'


export default function CoursesContent({ courses, cancelApplication }: { courses: CourseApplication[], cancelApplication: (id: number) => void }) {
  const columns = ["Course", "Title", "AUS Course", "Syllabi", "Status", ""]
  const StyledTableCell = useMemo(() => styled(TableCell)(createStyledTableCell()), []);

  return (
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
        {courses.map((course: CourseApplication) => <CourseRow key={course.course_application_id} course={course} cancelApplication={cancelApplication} />)}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
  )
}

function CourseRow({ course, cancelApplication }: { course: CourseApplication, cancelApplication: (id: number) => void }) {
  let status = "Pending"
  if (course.approved_status === true) {
    status = "Approved"
  } else if (course.approved_status === false) {
    status = "Rejected"
  }

  
  const StyledTableRow = styled(TableRow)(createStyledTableRow())
  const StyledTableCell = styled(TableCell)(createStyledTableCell())

  return (
    <StyledTableRow key={course.course_application_id}>
      <StyledTableCell>{course.course_code} </StyledTableCell>
      <StyledTableCell>{course.course_title}</StyledTableCell>
      <StyledTableCell>{course.aus_course}</StyledTableCell>
      <StyledTableCell>
        <Link href={course.syllabus} target="_blank" rel="noopener noreferrer">Host Syllabus</Link>
        {course.aus_syllabus && ", "}
        {course.aus_syllabus && <Link href={course.aus_syllabus} target="_blank" rel="noopener noreferrer">AUS Syllabus</Link>}
      </StyledTableCell>
      <StyledTableCell>{status}</StyledTableCell>
      <StyledTableCell>
        <>
        {course.approved_status === null &&
          <IconButton onClick={() => {
            cancelApplication(course.course_application_id)
            location.reload()
          }}>
            <DeleteIcon />
          </IconButton>
        }
        {course.comments &&
        <Tooltip title={course.comments}>
          <IconButton>
            <CommentIcon />
          </IconButton>
        </Tooltip>
        }
        </>
      </StyledTableCell>
    </StyledTableRow>
  )
}