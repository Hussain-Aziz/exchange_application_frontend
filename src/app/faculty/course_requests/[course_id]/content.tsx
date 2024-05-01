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
import './courseRequest.css'
import { useFormikContext } from 'formik';
import { CourseApplication } from '@/constants/types/courseApplicationTypes';
import DelegateDialog from './DelegateDialog';

const DelegateButton = ({ submitToBackend }: { submitToBackend: (data: any) => Promise<void> }) => {
  const router = useRouter()
  const { values } = useFormikContext();
  const saveValues = async (email: string) => {
    const v = values as any
    const values_with_delegate = { ...v, delegate: email }
    delete values_with_delegate.approved;
    await submitToBackend(values_with_delegate)
    router.push('/faculty/course_requests')
  }

  const [delegateDialogOpen, setDelegateDialogOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => { setDelegateDialogOpen(true) }}>Delegate</Button>
      <DelegateDialog open={delegateDialogOpen} setOpen={setDelegateDialogOpen} onConfirm={saveValues} />
    </>
  )
}

const SaveButton = ({ submitToBackend }: { submitToBackend: (data: any) => Promise<void> }) => {
  const router = useRouter()
  const { values } = useFormikContext();
  const saveValues = async () => {
    const v = values as any
    delete v.approved;
    await submitToBackend(v)
    router.push('/faculty/course_requests')
  }
  return (
    <Button variant="contained" onClick={saveValues}>Save</Button>

  )
}


export default function CourseRequestContent({ course_data, submitToBackend, get_comparison_result, faculty_type }:
  { course_data: CourseApplication, submitToBackend: (data: any) => Promise<void>, get_comparison_result: (id: number) => Promise<any>, faculty_type: number }) {
  const router = useRouter();

  const [showComparison, setShowComparison] = useState(false);

  const programArea = [
    '0. None',
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

  const extraYesText = course_data.delegated_to !== null && course_data.delegated_approval ? ' (Suggested by ' + course_data.delegated_to + ')' : ''
  const extraNoText = course_data.delegated_to !== null && !course_data.delegated_approval ? ' (Suggested by ' + course_data.delegated_to + ')' : ''

  const validationSchema = Yup.object().shape({
    programArea: Yup.string().when('approved', {
      is: false,
      then: schema => schema,
      otherwise: schema => schema.required('Program Area is required')
    }),
    gradeRequirement: Yup.string()
      .when('approved', {
        is: false,
        then: schema => schema,
        otherwise: schema => schema.required('Grade Requirement is required')
          .matches(/^(A|B|C|D)(\+|\-)?$/, 'Grade Requirement must be in the format A, A+, A-, B, B+, B-, C, C+, C-, D, D+, or D-')
      }),
    preReqsMet: Yup.boolean()
      .when('approved', {
        is: false,
        then: schema => schema,
        otherwise: schema => schema.required('Prerequisites Met is required')
      }),
    approved: Yup.boolean()
      .required('Approval is required'),
    comments: Yup.string()
  });

  if (!(faculty_type === 0 || faculty_type === 2)) {
    return <CourseRequestContent_TF course_data={course_data} submitToBackend={submitToBackend} get_comparison_result={get_comparison_result} faculty_type={faculty_type} />
  }

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Course Approval</Typography>
        <Formik
          initialValues={{
            programArea: course_data.program_area || undefined,
            gradeRequirement: course_data.grade_required || undefined,
            preReqsMet: course_data.pre_requisites_met || undefined,
            approved: course_data.approved_status || undefined,
            comments: course_data.comments || undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            await submitToBackend(values);
            router.push('/faculty/course_requests')
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
              <Field variant="filled" size="small" as={TextField} name="comments" label="Comments (optional)" error={touched.comments && !!errors.comments} helperText={touched.comments && errors.comments} style={{ marginBottom: '20px' }} />
              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Approved</InputLabel>
                <Field as={Select} name="approved" label="Approved" error={touched.approved && !!errors.approved} helperText={touched.approved && errors.approved}>
                  <MenuItem value={'true'}>{'Yes' + extraYesText}</MenuItem>
                  <MenuItem value={'false'}>{'No' + extraNoText}</MenuItem>
                </Field>
              </FormControl>
              { !course_data.ignore_aus_syllabus &&
              <Button
                variant="contained"
                onClick={() => setShowComparison(p => !p)}
                sx={{ alignSelf: 'center', marginBottom: '10px' }}>
                {showComparison ? 'Show Syllabus' : 'Show Comparison'}
              </Button>
              }
              {showComparison
                ? <ComparisonResult
                  key={course_data.course_application_id}
                  id={course_data.course_application_id}
                  comparison_result={course_data.comparison_result}
                  get_comparison_result={get_comparison_result}
                />
                : <RawPdf
                  pdf1={course_data.aus_syllabus}
                  pdf2={course_data.syllabus}
                />}
              <div className='SaveSubmitContainer'>
                <DelegateButton submitToBackend={submitToBackend} />
                <SaveButton submitToBackend={submitToBackend} />
                <Button variant="contained" type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

function CourseRequestContent_TF({ course_data, submitToBackend, get_comparison_result, faculty_type }:
  { course_data: CourseApplication, submitToBackend: (data: any) => Promise<void>, get_comparison_result: (id: number) => Promise<any>, faculty_type: number }) {
  const router = useRouter();

  const [showComparison, setShowComparison] = useState(false);

  const validationSchema = Yup.object().shape({
    approved: Yup.boolean()
      .required('Approval is required'),
  })

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Course Approval</Typography>
        <Formik
          initialValues={{
            approved: course_data.delegated_approval || undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            await submitToBackend(values);
            router.push('/faculty/course_requests')
          }}
        >
          {({ errors, touched }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', marginRight: '20px', marginBottom: '20px', paddingBottom: '20px' }}>
              <FormControl variant="filled" size="small" style={{ marginBottom: '20px' }}>
                <InputLabel>Approved</InputLabel>
                <Field as={Select} name="approved" label="Approved" error={touched.approved && !!errors.approved} helperText={touched.approved && errors.approved}>
                  <MenuItem value={'true'}>{'Yes'}</MenuItem>
                  <MenuItem value={'false'}>{'No'}</MenuItem>
                </Field>
              </FormControl>
              <Button
                variant="contained"
                onClick={() => setShowComparison(p => !p)}
                sx={{ alignSelf: 'center', marginBottom: '10px' }}>
                {showComparison ? 'Show Syllabus' : 'Show Comparison'}
              </Button>
              {showComparison
                ? <ComparisonResult
                  key={course_data.course_application_id}
                  id={course_data.course_application_id}
                  comparison_result={course_data.comparison_result}
                  get_comparison_result={get_comparison_result}
                />
                : <RawPdf
                  pdf1={course_data.aus_syllabus}
                  pdf2={course_data.syllabus}
                />}
              <div className='SaveSubmitContainer'>
                <SaveButton submitToBackend={submitToBackend} />
                <Button variant="contained" type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

