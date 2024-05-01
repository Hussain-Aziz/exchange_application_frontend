import React from 'react';
import ViewPdf from '../../../../components/ViewPdf';
import { Grid } from '@mui/material';

export default function RawPdf({pdf1, pdf2}:{pdf1: string, pdf2: string}) {
  if (pdf1 === '' || pdf1 === null || pdf1 === undefined){
    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
        <ViewPdf link={pdf2} />
      </Grid>
    </Grid>
    )
  }
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