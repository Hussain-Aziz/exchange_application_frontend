'use client';
import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import RawPdf from './RawPdf';
import ComparisonResult from './ComparisonResult';


export default function Page({ params }: { params: { course_id: string } }) {
  const router = useRouter();

  const [showComparison, setShowComparison] = useState(false);

  const programArea = [
    'None',
    '1. History and Culture of the Arab World',
    '2. Culture in a Critical Perspective',
    '3. Arts and Literature',
    '4. Human Interaction and Behavior',
    '5. Natural Sciences',
    '6. Mathematics',
    '7. Statistics',
    '8. Communication',
    '9. Ethical Understanding',
    '10. Discipline-Specific Writing-Intensive Course',
    '11. Oral Proficiency',
    '12. Information Literacy',
    '13. Computer Literacy',
  ]

  const validationSchema = Yup.object().shape({
    programArea: Yup.string()
      .required('Program Area is required'),
    gradeRequirement: Yup.string()
      .required('Grade Requirement is required')
      .matches(/^(A|B|C|D)(\+|\-)?$/, 'Grade Requirement must be in the format A, A+, A-, B, B+, B-, C, C+, C-, D, D+, or D-'),
    preReqsMet: Yup.boolean()
      .required('Prerequisites Met is required'),
  });

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Course Approval</Typography>
        <Formik
          initialValues={{
            programArea: '',
            gradeRequirement: '',
            preReqsMet: false,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
            // TODO: Send the form data to the server
            router.push('/teaching_faculty/course_requests')
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', marginRight: '20px', marginBottom: '20px', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <FormControl variant="filled" size="small" style={{ marginBottom: '20px', flexGrow: '1' }}>
                  <InputLabel>Program Area</InputLabel>
                  <Field as={Select} name="programArea" label="Program Area" error={touched.programArea && !!errors.programArea} helperText={touched.programArea && errors.programArea}>
                    {programArea.map((area, index) => (
                      <MenuItem key={index} value={area}>{area}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <Tooltip title="If considered general education course or free elective">
                  <IconButton size="small" style={{ marginLeft: '10px' }}>
                    <InfoIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>

              </div>
              <Field variant="filled" size="small" as={TextField} name="gradeRequirement" label="Grade Requirement" error={touched.gradeRequirement && !!errors.gradeRequirement} helperText={touched.gradeRequirement && errors.gradeRequirement} style={{ marginBottom: '20px' }} />
              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Prerequisites Met</InputLabel>
                <Field as={Select} name="preReqsMet" label="Prerequisites Met" error={touched.preReqsMet && !!errors.preReqsMet} helperText={touched.preReqsMet && errors.preReqsMet}>
                  <MenuItem value={'true'}>Yes</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Field>
              </FormControl>
              <Button 
                variant="contained" 
                onClick={() => setShowComparison(p => !p)}
                sx={{alignSelf: 'center', marginBottom: '10px'}}>
                {showComparison ? 'Show Syllabus' : 'Show Comparison'}
                </Button>
              {showComparison ? <ComparisonResult /> : <RawPdf />}

              <Button sx={{ alignSelf: 'end', position: 'sticky', bottom: 25, marginTop: 1 }} variant="contained" type="submit">Approve Course</Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}