'use client';

import { Faculty } from "@/constants/types/courseApplicationTypes";
import { 
  Stack, 
  Typography, 
  Box, 
  Divider,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

export default function EditFacultyContent({facultyList, editFacultyInfo}: {facultyList: Faculty[], editFacultyInfo: any}){
  return (
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Department</TableCell>
        <TableCell>Faculty Type</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {facultyList.map((faculty: Faculty) => (
        <TableRow key={faculty.id}>
          <TableCell component="th" scope="row">{(faculty.user.first_name || '') + ' ' + (faculty.user.last_name || '')}</TableCell>
          <TableCell>{faculty.user.username}</TableCell>
          <TableCell>{get_department(faculty.department)}</TableCell>
          <TableCell>{getFacultyType(faculty.faculty_type)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  )
}
function getFacultyType(faculty_type: number) {
  switch(faculty_type){
    case 0: return 'Admin Assistant'
    case 1: return 'Teaching Faculty'
    case 2: return 'Head of Department'
    case 3: return 'Advisor'
    case 4: return 'Associate Dean'
    case 5: return 'Scholarship'
    case 6: return 'Sponsorship'
    default: return 'Teaching Faculty'
  }
}

function get_department(department: number) {
  switch (department) {
    case 0: return "Unknown";
    case 1: return "Architecture";
    case 2: return "Art and Design";
    case 3: return "Arabic and Translation Studies";
    case 4: return "Biology, Chemistry and Environmental Sciences";
    case 5: return "English";
    case 6: return "International Studies";
    case 7: return "Media Communication";
    case 8: return "Mathematics and Statistics";
    case 9: return "Physics";
    case 10: return "Psychology";
    case 11: return "Chemical and Biological Engineering";
    case 12: return "Civil Engineering";
    case 13: return "Computer Science and Engineering";
    case 14: return "Electrical Engineering";
    case 15: return "Industrial Engineering";
    case 16: return "Mechanical Engineering";
    case 17: return "Accounting";
    case 18: return "Economics";
    case 19: return "Finance";
    case 20: return "Management, Strategy and Entrepreneurship";
    case 21: return "Marketing and Information Systems";
    default: return "Unknown";
  }
}