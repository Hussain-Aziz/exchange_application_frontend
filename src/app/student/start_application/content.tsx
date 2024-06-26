'use client';
import React from "react";
import { Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

export default function StartApplicationContent({submitToBackend} : {submitToBackend: (data: any) => Promise<void>}) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    id: Yup.string()
    .matches(/^(b|g)?\d{5}$|^(b|g)\d{8}$/, 'ID must be in the format b000xxxxx or g000xxxxx')
      .required('ID is required'),
    presentCollege: Yup.string()
      .matches(/^(CEN|CAAD|SBA|CAS)$/, 'Must be one of CEN, CAAD, SBA, or CAS')
      .required('Present College is required'),
    presentMajor: Yup.string()
      .required('Present Major is required'),
    currentStanding: Yup.string()
      .matches(/^(Freshman|Sophomore|Junior|Senior)$/, 'Must be one of Freshman, Sophomore, Junior, or Senior')
      .required('Current Standing is required'),
    mobileNumber: Yup.string()
      .required('Mobile Number is required')
      .matches(/^\+9715\d{8}$/, 'Must be in the format +9715xxxxxxxx'),
    expectedGraduation: Yup.string()
      .matches(
        /^(Fall|fall|Spring|spring|Summer|summer) (20[2-9][0-9]|2100)$/,
        'Expected Graduation must be in the format "Semester Year" (e.g., "Fall 2023")'
      )
      .test('is-future', 'Year must be in the future', (value: string | undefined) => {
        if (!value) return true;
        const year = parseInt(value.split(' ')[1]);
        return year >= new Date().getFullYear();
      })
      .required('Expected Graduation is required'),
    university: Yup.string()
    .required('University is required'),
    hostContactName: Yup.string()
    .required('Contact name at host university is required'),
    hostContactEmail: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Must be a valid email address')
    .required('Contact email at host university is required'),
    department: Yup.string()
    .required('Current department is required'),
  });

  return (
    <Grid container className="full-screen" sx={{overflowY: 'auto'}}>
        <Grid item xs={10}>
          <Typography variant="h5" sx={{marginBottom: '20px'}}>General Information</Typography>
          <Formik
            initialValues={{
              name: '',
              id: '',
              presentCollege: '',
              presentMajor: '',
              currentStanding: '',
              mobileNumber: '',
              expectedGraduation: '',
              university: '',
              hostContactName: '',
              hostContactEmail: '',
              department: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await submitToBackend(values)
              router.push('/student/home/')
            }}
          >
            {({ errors, touched }) => (
              <Form style={{ display: 'flex', flexDirection: 'column', marginRight: '20px', marginBottom: '20px', paddingBottom:'20px' }}>
                <Field variant="filled" size="small" as={TextField} name="name" label="Name" error={touched.name && !!errors.name} helperText={touched.name && errors.name} style={{ marginBottom: '20px' }} />
                <Field variant="filled" size="small" as={TextField} name="id" label="ID" error={touched.id && !!errors.id} helperText={touched.id && errors.id} style={{ marginBottom: '20px' }} />
                <FormControl  variant="filled" size="small" style={{ marginBottom: '20px' }}>
                  <InputLabel>Present College</InputLabel>
                  <Field as={Select} name="presentCollege" label="Present College" error={touched.presentCollege && !!errors.presentCollege} helperText={touched.presentCollege && errors.presentCollege}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="CEN">CEN</MenuItem>
                    <MenuItem value="CAAD">CAAD</MenuItem>
                    <MenuItem value="SBA">SBA</MenuItem>
                    <MenuItem value="CAS">CAS</MenuItem>
                  </Field>
                </FormControl>
                <Field variant="filled" size="small" as={TextField} name="presentMajor" label="Present Major" error={touched.presentMajor && !!errors.presentMajor} helperText={touched.presentMajor && errors.presentMajor} style={{ marginBottom: '20px' }} />
                <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                  <InputLabel>Department</InputLabel>
                  <Field as={Select} name="department" label="Department" error={touched.department && !!errors.department} helperText={touched.department && errors.department}>
                    <MenuItem value="">None</MenuItem>
                    {getDepartments().map((department, index) => (
                      <MenuItem key={department} value={index}>{department}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                  <InputLabel>Current Standing</InputLabel>
                  <Field as={Select} name="currentStanding" label="Current Standing" error={touched.currentStanding && !!errors.currentStanding} helperText={touched.currentStanding && errors.currentStanding}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Freshman">Freshman</MenuItem>
                    <MenuItem value="Sophomore">Sophomore</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                  </Field>
                </FormControl>
                <Field variant="filled" size="small" as={TextField} name="mobileNumber" label="Mobile Number" error={touched.mobileNumber && !!errors.mobileNumber} helperText={touched.mobileNumber && errors.mobileNumber} style={{ marginBottom: '20px' }} />
                <Field variant="filled" size="small"as={TextField} name="expectedGraduation" label="Expected Graduation" error={touched.expectedGraduation && !!errors.expectedGraduation} helperText={touched.expectedGraduation && errors.expectedGraduation} style={{ marginBottom: '20px' }} />
                <Field variant="filled" size="small" as={TextField} name="university" label="Host University" error={touched.university && !!errors.university} helperText={touched.university && errors.university} style={{ marginBottom: '20px' }} />
                <Field variant="filled" size="small" as={TextField} name="hostContactName" label="Contact Name at Host University" error={touched.hostContactName && !!errors.hostContactName} helperText={touched.hostContactName && errors.hostContactName} style={{ marginBottom: '20px' }} />
                <Field variant="filled" size="small" as={TextField} name="hostContactEmail" label="Contact Email at Host University" error={touched.hostContactEmail && !!errors.hostContactEmail} helperText={touched.hostContactEmail && errors.hostContactEmail} style={{ marginBottom: '20px' }} />
                <Button sx={{alignSelf: 'end', position: 'sticky', bottom: 25}} variant="contained" type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
  );
}
function getDepartments(): string[] {
  return [
    "Unknown",
    "Architecture",
    "Art and Design",
    "Arabic and Translation Studies",
    "Biology, Chemistry and Environmental Sciences",
    "English",
    "International Studies",
    "Media Communication",
    "Mathematics and Statistics",
    "Physics",
    "Psychology",
    "Chemical and Biological Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical Engineering",
    "Industrial Engineering",
    "Mechanical Engineering",
    "Accounting",
    "Economics",
    "Finance",
    "Management, Strategy and Entrepreneurship",
    "Marketing and Information Systems",
  ];
}