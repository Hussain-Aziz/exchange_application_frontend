'use client'
import { Student } from '@/constants/types/courseApplicationTypes';
import {Button} from '@mui/material';

export default function StatusContent({makeRequest, student}: {makeRequest: (data: any) => Promise<void>, student: Student}){
  
  return (
    <>
    {(student.ixo_details.scholarship_approval === null || student.ixo_details.scholarship_approval === undefined) &&
    <Button 
      sx={{alignSelf: 'start'}} 
      onClick={() => {makeRequest({'scholarship': 'true'}); setTimeout(() => window.location.reload(), 1000)}}
      variant="contained">Request approval from Scholarship</Button>
    }
    {
      (student.ixo_details.sponsorship_approval === null || student.ixo_details.sponsorship_approval === undefined) &&
      <Button 
      sx={{alignSelf: 'start'}} 
      onClick={() => {makeRequest({'sponsorship': 'true'}); setTimeout(() => window.location.reload(), 1000)}}
      variant="contained">Request approval from Sponsorship</Button>}
</>
  )
}