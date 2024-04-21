'use client';
import React, { useState, useRef } from 'react';
import ViewPdf from '../../../../components/ViewPdf';
import {
  Box,
  Link,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { UploadButton } from '../../../../components/fileUpload';

export default function SyllabusRequestsContent({ syllabus, sendToBackend }: { syllabus: string, sendToBackend: (data: any) => void}) {
  const router = useRouter();
  const [fileInfo, setFileInfo] = useState<{fileName: string, fileLink: string}>({fileName: '', fileLink: ''});
  const [error, setError] = useState<string>('');

  const submit = () => {
    if (fileInfo.fileLink === '') {
      setError('Please upload a file');
      return;
    }

    sendToBackend({syllabus: fileInfo.fileLink});

    router.push('/faculty/syllabus_requests/');
  }

  return (
    <Grid container className="full-screen" sx={{ overflowY: 'auto' }}>
      <Grid item xs={10} sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Syllabus Upload</Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <UploadButton
            endpoint="pdfUploader"
            appearance={{
              button({ ready, isUploading }) {
                return {
                  backgroundColor: '#354545'
                }
              },
              container({ ready, isUploading }) {
                return {
                  display:'block',
                  marginLeft: '5px',
                }
              }
            }}
            onClientUploadComplete={(res) => {
              setFileInfo({fileName: res[0].name, fileLink: res[0].url});
              setError('');
            }}
            onUploadError={(error: Error) => {
              setError(error.message);
              setFileInfo({fileName: '', fileLink: ''});
            }}
          />
          {fileInfo.fileLink !== '' && (
            <Link href={fileInfo.fileLink} target="_blank" rel="noopener noreferrer">
              <Typography variant="subtitle1">
                {fileInfo.fileName}
              </Typography>
            </Link>
          )}
          {(error !== '') ? (
            <Typography color="error">
              {error}
            </Typography>
          ) : null}
        </Box>
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>Host University Syllabus</Typography>
        <ViewPdf link={syllabus} height={'300px'} />
        <Button sx={{ alignSelf: 'end', position: 'sticky', bottom: 25 }} variant="contained" onClick={submit}>Submit</Button>
      </Grid>
    </Grid>
  );
}