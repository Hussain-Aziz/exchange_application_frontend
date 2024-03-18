'use client';
import React, { useState, useRef } from 'react';
import ViewPdf from '../../../../components/ViewPdf';
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { course_id: string } }) {
  const router = useRouter();
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileRef = useRef<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files.length) {
      setFileName(event.currentTarget.files[0].name);
      fileRef.current = event.currentTarget.files[0];
      if (event.currentTarget.files[0].size > 2 * 1024 * 1024) {
        setError('File size should be less than 2MB');
      } else {
        setError('');
      }
    }
  };

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={10}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Syllabus Upload</Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Button variant="contained" component="label">
            Upload Equivalent AUS Syllabus
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
          {(error !== '') ? (
            <Typography color="error">
              {error}
            </Typography>
          ) : null}
        </Box>
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>Host University Syllabus</Typography>
        <ViewPdf link='/COE424.pdf' height={'300px'} />
      </Grid>
    </Grid>
  );
}