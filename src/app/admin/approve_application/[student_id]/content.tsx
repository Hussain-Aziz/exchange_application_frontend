'use client';
import React from "react";
import { Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { CourseApplication, Student } from "@/constants/types/courseApplicationTypes";
import ViewForm from "@/components/viewForm";

export default function NewApplicationContent({ student, courses, submitToBackend }: { student: Student, submitToBackend: (data: any) => Promise<void>, courses: CourseApplication[]}) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    studentType: Yup.string()
      .required('Student Type is required'),
    finalApproval: Yup.boolean()
      .required('Approval is required'),
  });

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={11}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>IXO Approval</Typography>
        <Formik
          initialValues={{
            studentType: '',
            finalApproval: false,
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
                <InputLabel>Form Approved</InputLabel>
                <Field as={Select} name="finalApproval" label="Form Approved" error={touched.finalApproval && !!errors.finalApproval} helperText={touched.finalApproval && errors.finalApproval}>
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Field>
              </FormControl>

              <Field variant="filled" size="small" as={TextField} name="studentType" label="Student Type" error={touched.studentType && !!errors.studentType} helperText={touched.studentType && errors.studentType} style={{ marginBottom: '20px' }} />

              <Button sx={{ alignSelf: 'end', position: 'sticky', bottom: 25 }} variant="contained" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
        <ViewForm student={student} courses={courses} />
      </Grid>
    </Grid>
  );
}