'use client';
import React from "react";
import { Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { CourseApplication, Student } from "@/constants/types/courseApplicationTypes";
import ViewForm from "../../../../components/viewForm";

export default function ApproveFormContent({ student, courses, submitToBackend }: { student: Student, submitToBackend: (data: any) => Promise<void>, courses: CourseApplication[]}) {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    approved: Yup.boolean().required(),
    comments: Yup.string().when('approved', {
      is: false,
      then: schema => schema.required('Comment is required'),
      otherwise: schema => schema,
    })
  });

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={11}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Form Approval</Typography>
        <Formik
          initialValues={{
            approved: undefined,
            comments: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await submitToBackend(values)
            router.push('/faculty/home/')
          }}
        >
          {({ errors, touched, values }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', marginRight: '20px', marginBottom: '20px', paddingBottom: '20px' }}>

              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Form Approved</InputLabel>
                <Field as={Select} name="approved" label="Form Approved" error={touched.approved && !!errors.approved} helperText={touched.approved && errors.approved}>
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Field>
              </FormControl>
              {values.approved === 'false' &&
              <Field variant="filled" size="small" as={TextField} name="comments" label="Comments" error={touched.comments && !!errors.comments} helperText={touched.comments && errors.comments} style={{ marginBottom: '20px' }} />
              }
              <Button sx={{ alignSelf: 'end', position: 'sticky', bottom: 25 }} variant="contained" type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
        <ViewForm student={student} courses={courses} />
      </Grid>
    </Grid>
  );
}