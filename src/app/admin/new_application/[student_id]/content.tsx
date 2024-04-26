'use client';
import React from "react";
import { Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { Student } from "@/constants/types/courseApplicationTypes";

/*
  moe_approval: boolean
  usdoe_approval: boolean
  acreditted: boolean
  acreditted_comments: string
  agreement: boolean
*/

export default function NewApplicationContent({ student, submitToBackend }: { student: Student, submitToBackend: (data: any) => Promise<void> }) {
  const router = useRouter();

  console.log(JSON.stringify(student))

  const validationSchema = Yup.object().shape({
    moeApproval: Yup.boolean()
      .required('Ministry of education approval is required'),
    usdoeApproval: Yup.boolean()
      .required('US Department of Education accredited is required'),
    acreditted: Yup.boolean()
      .required('Accreditation is required'),
    acredittedComments: Yup.string(),
    agreement: Yup.boolean()
      .required('Institution has study abroad agreement is required')
  });

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={10}>
      <Typography variant="h6">Student Information</Typography>
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
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Initial Approval</Typography>
        <Formik
          initialValues={{
            moeApproval: false,
            usdoeApproval: false,
            acreditted: false,
            acredittedComments: '',
            agreement: false
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await submitToBackend(values)
            router.push('/admin/home/')
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', marginRight: '20px', marginBottom: '20px', paddingBottom: '20px' }}>

              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Is approved by the UAE Ministry of Education</InputLabel>
                <Field as={Select} name="moeApproval" label="Is approved by the UAE Ministry of Education" error={touched.moeApproval && !!errors.moeApproval} helperText={touched.moeApproval && errors.moeApproval}>
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Field>
              </FormControl>
              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Is accredited by the U.S. Department of Education</InputLabel>
                <Field as={Select} name="usdoeApproval" label="Is accredited by the U.S. Department of Education" error={touched.usdoeApproval && !!errors.usdoeApproval} helperText={touched.usdoeApproval && errors.usdoeApproval}>
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Field>
              </FormControl>
              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Has the appropriate accreditation for the student major</InputLabel>
                <Field as={Select} name="acreditted" label="Has the appropriate accreditation for the student's major" error={touched.acreditted && !!errors.acreditted} helperText={touched.acreditted && errors.acreditted}>
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Field>
              </FormControl>
              <Field variant="filled" size="small" as={TextField} name="acredittedComments" label="Comments/Special Requirements" error={touched.acredittedComments && !!errors.acredittedComments} helperText={touched.acredittedComments && errors.acredittedComments} style={{ marginBottom: '20px' }} />
              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Has a study abroad agreement with the institution</InputLabel>
                <Field as={Select} name="agreement" label="Has a study abroad agreement with the institution" error={touched.agreement && !!errors.agreement} helperText={touched.agreement && errors.agreement}>
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Field>
              </FormControl>
              <Button sx={{ alignSelf: 'end', position: 'sticky', bottom: 25 }} variant="contained" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}