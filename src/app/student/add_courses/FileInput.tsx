'use client';
import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

export default function FileInput({ fileRef, name, errors, touched }: { fileRef: React.MutableRefObject<File>, name: string, errors: any, touched: any }) {
  const [field, meta, helpers] = useField(name);
  const [fileName, setFileName] = useState('');
  const { validateField } = useFormikContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length) {
      setFileName(event.currentTarget.files[0].name);
      fileRef.current = event.currentTarget.files[0];
      helpers.setValue(event.currentTarget.files[0]);
      validateField(name);
    }
  };

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Button variant="contained" component="label">
        Upload Host University Syllabus
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept=".pdf"
        />
      </Button>
      {fileName && (
        <Typography variant="subtitle1">
          {fileName}
        </Typography>
      )}
      {(meta.touched && meta.error) || (errors.hostUniversitySyllabus && touched.hostUniversitySyllabus) ? (
        <Typography color="error">
          {meta.error || errors.hostUniversitySyllabus}
        </Typography>
      ) : null}
    </Box>)
}
