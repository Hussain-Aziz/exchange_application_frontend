'use client'
import React, { useRef } from "react";
import {
  Button,
  Stack,
  Typography,
  Alert,
  Grow,
} from "@mui/material";
import { emailRegex, strongPasswordRegex, ElementWidth } from "../../../constants/LoginConstants";
import EmailField from "../../../components/EmailField";
import PasswordField from "../../../components/PasswordField";
import useTimedAlert from "../../../hooks/useTimedAlert";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function Login(): React.ReactNode {
  const router = useRouter()

  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const [alertInfo, setAlertInfo] = useTimedAlert()

  const handleRegisterClick = () => {
    const username = emailRef.current?.value;
    const password1 = password1Ref.current?.value;
    const password2 = password2Ref.current?.value;

    if (!username || !password1 || !password2) {
      setAlertInfo({ severity: "error", message: "Please fill in all fields" })
    } else if (password1 !== password2) {
      setAlertInfo({ severity: "error", message: "Passwords do not match" })
    } else if (!emailRegex.test(username)) {
      setAlertInfo({ severity: "error", message: "Invalid email address" })
    } else {
      router.push('/login?registered=true')
    }
  }

  return (
    <>

      <EmailField emailRef={emailRef} checkEmailValidity />

      <PasswordField passwordRef={password1Ref} checkPasswordStrength />

      <PasswordField passwordRef={password2Ref} passwordText="Confirm Password" />

      <Stack spacing={1} className="center-flex">
        <Button onClick={handleRegisterClick} variant="contained" size="large" sx={ElementWidth}>Register</Button>
        <Typography variant="body1">Already have an account? <Link href="/login">Login</Link></Typography>
      </Stack>

      <Grow in={alertInfo !== undefined}>
        <Alert severity={alertInfo?.severity} sx={ElementWidth}>{alertInfo?.message}</Alert>
      </Grow>

    </>
  )
}