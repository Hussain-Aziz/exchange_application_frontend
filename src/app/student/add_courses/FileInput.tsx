'use client';
import React, { useState } from "react";
import {
  Link,
  Typography,
  Box,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { UploadButton } from '../../../components/fileUpload';

import "./addCourseForm.css"

export default function FileInput({ name, errors, touched }: { name: string, errors: any, touched: any }) {
  const [field, meta, helpers] = useField(name);
  const [fileInfo, setFileInfo] = useState<{fileName: string, fileLink: string}>({fileName: '', fileLink: ''});
  const [error, setError] = useState<string>('');

  return (

    <Box sx={{ marginBottom: '20px', display: 'flex', flexDirection: 'row',}}>
      <Typography className="upload-text-margin">Upload Host University Syllabus</Typography>
      <Box>
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
              display: 'block',
              marginLeft: '5px',
            }
          }
        }}
        onClientUploadComplete={(res) => {
          setFileInfo({ fileName: res[0].name, fileLink: res[0].url });
          helpers.setValue(res[0].url);
          setError('');
        }}
        onUploadError={(error: Error) => {
          setError(error.message);
          setFileInfo({ fileName: '', fileLink: '' });
        }}
      />
      {fileInfo.fileLink !== '' && (
        <Link href={fileInfo.fileLink} target="_blank" rel="noopener noreferrer">
          <Typography variant="subtitle1">
            {fileInfo.fileName}
          </Typography>
        </Link>
      )}
      {(error !== '' || meta.error) ? (
        <Typography color="error">
          {meta.error || error}
        </Typography>
      ) : null}
    </Box>
    </Box>


  )
}

/*
{<Box sx={{ marginBottom: '20px' }}>
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
    </Box> }
*/
