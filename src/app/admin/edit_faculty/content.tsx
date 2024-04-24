'use client';

import { useState } from 'react';
import { Faculty } from "@/constants/types/courseApplicationTypes";
import {
  Stack,
  Typography,
  Box,
  Divider,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputAdornment,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function EditFacultyContent({ facultyList, editFacultyInfo }: { facultyList: Faculty[], editFacultyInfo: any }) {

  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearchTextChange}
        style={{ justifySelf: 'left', width: '50%', marginTop: 10 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }} />
      <TableContainer component={Paper} style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Faculty Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facultyList.map((faculty: Faculty) => {
              if (searchText !== '' && !faculty.user.username.toLowerCase().includes(searchText.toLowerCase())) {
                return null;
              }
              return <EditFacultyTable faculty={faculty} key={faculty.id} editFacultyInfo={editFacultyInfo} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function EditFacultyTable({ faculty, editFacultyInfo }: { faculty: Faculty, editFacultyInfo: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [department, setDepartment] = useState(get_department(faculty.department));
  const [facultyType, setFacultyType] = useState(getFacultyType(faculty.faculty_type));

  const onSaveClick = () => {
    editFacultyInfo(faculty.id, getDepartments().indexOf(department), getFacultyTypes().indexOf(facultyType))
    setIsEditing(false);
  }

  return (
    <TableRow key={faculty.id}>
      <TableCell component="th" scope="row">
        {`${faculty.user.first_name || ''} ${faculty.user.last_name || ''}`}
      </TableCell>
      <TableCell>
        {faculty.user.username}
      </TableCell>
      <TableCell>
        {isEditing ? <Select value={department} onChange={(e) => setDepartment(e.target.value)}>{getDepartments().map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}</Select> : department}
      </TableCell>
      <TableCell>
        {isEditing ? (<Select value={facultyType} onChange={(e) => setFacultyType(e.target.value)}>{getFacultyTypes().map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}</Select>) : facultyType}
      </TableCell>
      <TableCell>
        {isEditing
          ? <IconButton onClick={onSaveClick}><SaveIcon /></IconButton>
          : <IconButton onClick={() => setIsEditing(!isEditing)}><EditIcon /></IconButton>
        }
      </TableCell>
    </TableRow>
  );
}

function getFacultyType(faculty_type: number): string {
  switch (faculty_type) {
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

function getFacultyTypes(): string[] {
  return [
    'Admin Assistant',
    'Teaching Faculty',
    'Head of Department',
    'Advisor',
    'Associate Dean',
    'Scholarship',
    'Sponsorship',
  ];

}

function get_department(department: number): string {
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

function getDepartments(): string[] {
  return [
    "Unknown",
    "Architecture",
    "Art and Design",
    "Arabic and Translation Studies",
    "Biology, Chemistry and Environmental Sciences",
    "English",
    "International Studies",
    "Media Communication",
    "Mathematics and Statistics",
    "Physics",
    "Psychology",
    "Chemical and Biological Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical Engineering",
    "Industrial Engineering",
    "Mechanical Engineering",
    "Accounting",
    "Economics",
    "Finance",
    "Management, Strategy and Entrepreneurship",
    "Marketing and Information Systems",
  ];
}