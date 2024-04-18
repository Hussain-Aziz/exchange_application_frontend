'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

export default function ComparisonResult({id, comparison_result, running_comparison, get_comparison_result}: 
  {id: number, comparison_result: any, running_comparison: boolean, get_comparison_result: (id: number) => Promise<any>}) {

    const [real_comparison_result, setComparisonResult] = useState<any>(comparison_result);

    useEffect(() => {
      if (running_comparison) {
        get_comparison_result(id)
        .then((result) => {setComparisonResult(result)})
      }

    }, [get_comparison_result, id, running_comparison]);

    if (real_comparison_result === null || real_comparison_result === undefined) {
      // return loading text
      return (
        <Grid container className="full-screen" sx={{ height: '400px' }}>
          <Grid item xs={12} className="login-background" sx={{height: '400px', overflow: 'auto'}}>
            <Typography variant="h4" sx={{ marginBottom: '10px', textAlign: 'center' }}>Comparison Result</Typography>
            <Typography variant="h6" sx={{ marginBottom: '20px', textAlign:'center' }}>Loading...</Typography>
          </Grid>
        </Grid>
      );
    }

  const match = Number(real_comparison_result['match percentage'].replace('%', ''));
  const color = match > 80 ? 'green' : 
                match > 60 ? undefined : // default color
                            'red';

  return (
    <Grid container className="full-screen" sx={{ height: '400px' }}>
      <Grid item xs={12} className="login-background" sx={{height: '400px', overflow: 'auto'}}>
        <Typography variant="h4" sx={{ marginBottom: '10px', textAlign: 'center' }}>Comparison Result</Typography>
        <Typography variant="h6" sx={{ marginBottom: '20px', color: color, textAlign:'center' }}>{`Match: ${real_comparison_result['match percentage']}`}</Typography>
        <Grid container>
          {
            Object.keys(real_comparison_result).map((key: string, index: number) => {
              if (key === 'match percentage' || key === 'prompt') return;
              const value = real_comparison_result[key as keyof typeof real_comparison_result];
              return (
                <TableContainer key={index}>
                  <Table>
                    <TableBody>
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" style={{ width: '50%' }}>
                          <Typography variant="body1">{`CLO ${index}: ${key}`}</Typography>
                        </TableCell>
                        <TableCell align="justify" style={{ width: '50%' }}>
                          <Typography variant="body1">{value}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            })
          }
        </Grid>
      </Grid>
    </Grid>
  );
}