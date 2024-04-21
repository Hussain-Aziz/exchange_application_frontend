import React from 'react';
import ViewPdf from '../../../../components/ViewPdf';
import { Grid } from '@mui/material';

export default function RawPdf({pdf1, pdf2}:{pdf1: string, pdf2: string}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <ViewPdf link={pdf1} />
      </Grid>
      <Grid item xs={6}>
        <ViewPdf link={pdf2} />
      </Grid>
    </Grid>
  );
}