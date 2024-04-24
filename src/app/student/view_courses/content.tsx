'use client';
import React from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link } from '@mui/material'
import { CourseApplication } from '@/constants/types/courseApplicationTypes';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function CoursesContent({ courses, cancelApplication }: { courses: CourseApplication[], cancelApplication: (id: number) => void }) {
  return (
    <TableContainer component={Paper} style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>AUS Course</TableCell>
            <TableCell>Syllabi</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course: CourseApplication) => <CourseRow key={course.course_application_id} course={course} cancelApplication={cancelApplication} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function CourseRow({ course, cancelApplication }: { course: CourseApplication, cancelApplication: (id: number) => void }) {
  let status = "Pending"
  if (course.approved_status === true) {
    status = "Approved"
  } else if (course.approved_status === false) {
    status = "Rejected"
  }
  return (
    <TableRow key={course.course_application_id}>
      <TableCell>{course.course_code}</TableCell>
      <TableCell>{course.course_title}</TableCell>
      <TableCell>{course.aus_course}</TableCell>
      <TableCell>
        <Link href={course.syllabus} target="_blank" rel="noopener noreferrer">Host Syllabus</Link>
        {", "}
        <Link href={course.syllabus} target="_blank" rel="noopener noreferrer">AUS Syllabus</Link>
      </TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        {course.approved_status === null &&
          <IconButton onClick={() => {
            cancelApplication(course.course_application_id)
            location.reload()
          }}>
            <DeleteIcon />
          </IconButton>
        }
      </TableCell>
    </TableRow>
  )
}