'use client'
import React, { useRef } from "react";
import {
  Button,
  Stack,
  Typography,
  Alert,
  Grow,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,

} from "@mui/material";
import { emailRegex, strongPasswordRegex, ElementWidth } from "../../../constants/LoginConstants";
import EmailField from "../../../components/EmailField";
import PasswordField from "../../../components/PasswordField";
import useTimedAlert from "../../../hooks/useTimedAlert";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function RegisterContent({register}: {register: (data: any) => Promise<void>}): React.ReactNode {
  const router = useRouter()

  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const [alertInfo, setAlertInfo] = useTimedAlert()

  const handleRegisterClick = async () => {
    const username = emailRef.current?.value;
    const password1 = password1Ref.current?.value;
    const password2 = password2Ref.current?.value;

    if (!username || !password1 || !password2) {
      setAlertInfo({ severity: "error", message: "Please fill in all fields" })
    } else if (password1 !== password2) {
      setAlertInfo({ severity: "error", message: "Passwords do not match" })
    //} else if (!emailRegex.test(username)) {
      //setAlertInfo({ severity: "error", message: "Invalid email address" })
    } else if (!strongPasswordRegex.test(password1)) {
      setAlertInfo({ severity: "error", message: "Password is too weak" })
    } else if (isFaculty && (facultyRole === '' || facultyDepartment === '')) {
      setAlertInfo({ severity: "error", message: "Please select a department and role" })
    } else {
      const data = {
        username: username,
        password: password1,
        is_faculty: isFaculty,
        faculty_department: getDepartments().findIndex(department => department === facultyDepartment),
        faculty_role: roles().findIndex(role => role === facultyRole),
      }
      try{
      await register(data)
      } catch (e) {}
      router.push('/login?registered=true')
    }
  }
  const [isFaculty, setIsFaculty] = React.useState(false);
  const [facultyDepartment, setFacultyDepartment] = React.useState('');
  const [facultyRole, setFacultyRole] = React.useState('');

  return (
    <>

      <EmailField emailRef={emailRef} checkEmailValidity />

      <PasswordField passwordRef={password1Ref} checkPasswordStrength />

      <PasswordField passwordRef={password2Ref} passwordText="Confirm Password" />

      <FormControlLabel
        control={
          <Checkbox
            checked={isFaculty}
            onChange={(event) => setIsFaculty(event.target.checked)}
            color="primary"
          />
        }
        label="I am a faculty member"
      />

      {isFaculty && (
        <div style={{display:'flex', flex: 1, minWidth: '300px', gap: '20px'}}>
          <FormControl sx={ElementWidth}>
            <InputLabel id="department-label">
              Department
            </InputLabel>
            <Select
              labelId="department-label"
              value={facultyDepartment}
              onChange={(event) => setFacultyDepartment(event.target.value)}
            >
              {getDepartments().map((department) => (
                <MenuItem key={department} value={department}>{department}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={ElementWidth}>
            <InputLabel id="department-label">
              Role
            </InputLabel>
            <Select
              labelId="department-label"
              value={facultyRole}
              onChange={(event) => setFacultyRole(event.target.value)}
            >
              {roles().map((department) => (
                <MenuItem key={department} value={department}>{department}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      <Stack spacing={1} marginTop={2} className="center-flex">
        <Button onClick={handleRegisterClick} variant="contained" size="medium" sx={ElementWidth}>Register</Button>
        <Typography variant="body2">Already have an account? <Link href="/login">Login</Link></Typography>
      </Stack>

      <Grow in={alertInfo !== undefined}>
        <Alert severity={alertInfo?.severity} sx={ElementWidth}>{alertInfo?.message}</Alert>
      </Grow>

    </>
  )
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

function roles(): string[] {
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