'use client';
import React, { useRef, useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { Field} from 'formik';

export default function CourseInput({ AusCourses, AusSubjects, errors, touched }: { AusCourses: { code: string, name: string }[], AusSubjects: string[], errors: any, touched: any }): JSX.Element {

  const [subject, setSubject] = useState<string>('');

  const onSubjectChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSubject(event.target.value);
  }

  const courses = AusCourses.filter((course) => course.code.split(' ')[0] === subject);
  return (
    <>
    <div style={{ marginBottom: (touched.ausCourse && !!errors.ausCourse) ? '0px': '20px', display: 'grid', gridTemplateColumns: "20% 80%", gap: '10px'}}>
      <FormControl variant="filled" size="small">
        <InputLabel>Subject</InputLabel>
        <Field as={Select} onChange={onSubjectChange} value={subject} error={touched.ausSubject && !!errors.ausSubject} helperText={touched.ausSubject && errors.ausSubject}>
          <MenuItem value="">None</MenuItem>
          {AusSubjects.map((subject, index) =>
            <MenuItem key={index} value={subject}>{subject}</MenuItem>
          )}
        </Field>
      </FormControl>
      <FormControl variant="filled" size="small">
        <InputLabel>Equivalent Course at AUS</InputLabel>
        <Field as={Select} name="ausCourse" label="Equivalent Course at AUS" error={touched.ausCourse && !!errors.ausCourse} helperText={touched.ausCourse && errors.ausCourse}>
          <MenuItem value="">None</MenuItem>
          {courses.map((course) =>
            <MenuItem key={course.code} value={course.code}>{course.code} - {course.name}</MenuItem>
          )}
        </Field>
      </FormControl>
    </div>
    {(touched.ausCourse && !!errors.ausCourse) ? (
      <Typography color="error" sx={{marginBottom: '20px'}}>
        {errors.ausCourse}
      </Typography>
    ) : null}
  </>
  )
}