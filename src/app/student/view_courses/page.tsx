import React from "react";
import { Grid, Typography, Link } from '@mui/material';
import { listCoursesEndpoint } from "../../../constants/endpoints";
import { cookies } from 'next/headers';

export default async function Page() {

  const coursesResponse = await fetch(listCoursesEndpoint, {
    method: 'GET',
    headers: {
      "Authorization": "TOKEN " + cookies().get('token').value
    }
  })

  const courses = await coursesResponse.json()

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={10}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Submitted Courses</Typography>
        <Grid container spacing={2}>
          {courses.map((course: any) => (
            <Grid container key={course.course_application_id} item direction="row" spacing={2}>
              <Grid item>
                <Typography variant="body1">{course.code}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{course.course_title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{course.course_credits}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{course.aus_course}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">{course.aus_course}</Typography>
              </Grid>
              <Grid item>
                <Link href={course.syllabus} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body1">Syllabus</Typography>
                </Link>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}