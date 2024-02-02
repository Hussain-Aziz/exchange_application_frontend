'use client'
import React, { useRef } from "react";
import {
  Button,
  Stack,
  Typography,
  Alert,
  Grow,
} from "@mui/material";
import { emailRegex, ElementWidth } from "../../../constants/LoginConstants";
import EmailField from "../../../components/EmailField";
import useTimedAlert from "../../../hooks/useTimedAlert";
import { useRouter } from "next/navigation";
import Link from 'next/link'

export default function Login(): React.ReactNode {
  const router = useRouter()

  const emailRef = useRef<HTMLInputElement>(null);

  const [alertInfo, setAlertInfo] = useTimedAlert()

  const handleRecoverClick = () => {
    const username = emailRef.current?.value;

    if (!username) {
      setAlertInfo({ severity: "error", message: "Please fill in all fields" })
    } else if (!emailRegex.test(username)) {
      setAlertInfo({ severity: "error", message: "Invalid email address" })
    } else {
      router.push('/login?recovered=true')
    }
  }

  return (
    <>

      <EmailField emailRef={emailRef} checkEmailValidity />

      <Stack spacing={1} className="center-flex">
        <Button onClick={handleRecoverClick} variant="contained" size="large" sx={ElementWidth}>Recover</Button>
        <Typography variant="body1">Remembered password? <Link href="/login">Login</Link></Typography>
      </Stack>

      <Grow in={alertInfo !== undefined}>
        <Alert severity={alertInfo?.severity} sx={ElementWidth}>{alertInfo?.message}</Alert>
      </Grow>

    </>
  )
}