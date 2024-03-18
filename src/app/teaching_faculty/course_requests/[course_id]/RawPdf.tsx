import React from 'react';
import ViewPdf from '../../../../components/ViewPdf';
import { Grid } from '@mui/material';

export default function RawPdf() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <ViewPdf link='/CMP305.pdf' />
      </Grid>
      <Grid item xs={6}>
        <ViewPdf link='/ECE36800.pdf' />
      </Grid>
    </Grid>
  );
}