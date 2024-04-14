'use client';
import React, { useRef } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, Field, Form,} from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import CourseInput from './CourseInput';
import FileInput from './FileInput';

export default function AddCourseForm({ AusCourses, AusSubjects }: { AusCourses: { code: string, name: string }[], AusSubjects: string[] }) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    hostCourseCode: Yup.string()
      .required('Course Code at Host University is required'),
    hostCouseTitle: Yup.string()
      .required('Course Title at Host University is required'),
    courseCredits: Yup.string()
      .matches(/^[0-9]{1,2}$/, 'Course Credits must be a number')
      .required('Course Credits is required'),
    ausCourse: Yup.string()
      .matches(
        /^[A-Z]{3,4} \d{3,5}$/,
        'Course must be in the format DEPT XXX'
      )
      .test('is-valid-course', 'Course must be a valid course offered at AUS', (value: string | undefined) => {
        if (!value) return true;
        return AusCourses.some((course) => course.code === value);
      })
      .required('Equivalent Course at AUS is required'),
    hostUniversitySyllabus: Yup.string()
      .required("A host university syllabus is required")
      .matches(/^(http|https):\/\/[^ "]+$/,"Must be a valid URL")
  });

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={10}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Add Course</Typography>
        <Formik
          initialValues={{
            hostCourseCode: '',
            hostCouseTitle: '',
            courseCredits: 0,
            ausCourse: '',
            hostUniversitySyllabus: null,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
            // TODO: Send the form data to the server
            router.push('/student/home/');
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', marginRight: '20px', marginBottom: '20px', paddingBottom: '20px' }}>
              <Field variant="filled" size="small" as={TextField} name="hostCourseCode" label="Course Code at Host University" error={touched.hostCourseCode && !!errors.hostCourseCode} helperText={touched.hostCourseCode && errors.hostCourseCode} style={{ marginBottom: '20px' }} />
              <Field variant="filled" size="small" as={TextField} name="hostCouseTitle" label="Course Title at Host University" error={touched.hostCouseTitle && !!errors.hostCouseTitle} helperText={touched.hostCouseTitle && errors.hostCouseTitle} style={{ marginBottom: '20px' }} />
              <Field variant="filled" size="small" as={TextField} name="courseCredits" label="Course Credits" error={touched.courseCredits && !!errors.courseCredits} helperText={touched.courseCredits && errors.courseCredits} style={{ marginBottom: '20px' }} />
              <CourseInput AusCourses={AusCourses} AusSubjects={AusSubjects} errors={errors} touched={touched} />
              <FileInput name="hostUniversitySyllabus" errors={errors} touched={touched} />
              <Button sx={{ alignSelf: 'end', position: 'sticky', bottom: 25 }} variant="contained" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}