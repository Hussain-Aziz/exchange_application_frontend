'use client'
import React, { useContext, useRef, useEffect } from "react";
import {
  Stack,
  Typography,
  Button,
  Grow,
  Alert,
} from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import { ElementWidth, emailRegex } from "../../constants/LoginConstants";
import PasswordField from "../../components/PasswordField";
import EmailField from "../../components/EmailField";
import useTimedAlert from "../../hooks/useTimedAlert";
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link'

export default function Page(): React.ReactNode {
  const userContext = useContext(UserContext)
  const router = useRouter()

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [alertInfo, setAlertInfo] = useTimedAlert()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("registered")) setAlertInfo({ severity: "info", message: "Check your email for a verification link" })
    if (searchParams.get("recovered")) setAlertInfo({ severity: "info", message: "Check your email for a password reset link" })
  }, [searchParams, setAlertInfo])

  const handleLoginClick = () => {
    const username = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setAlertInfo({ severity: "error", message: "Please fill in all fields" })
    } else if (!emailRegex.test(username)) {
      setAlertInfo({ severity: "error", message: "Invalid email address" })
    } else {
      userContext.setIsUserAuthenticated(true)
      router.push('/home')
    }
  }

  return (
    <>
      <EmailField emailRef={emailRef} />

      <PasswordField passwordRef={passwordRef} />

      <Stack spacing={1} marginTop={2} className="center-flex">
        <Button onClick={handleLoginClick} variant="contained" sx={ElementWidth}>Login</Button>
        <Typography variant="body2"><Link href="/login/recover">Forgot Password?</Link></Typography>
        <Typography variant="body2">{"Don't have an account?"} <Link href="/login/register">Sign Up</Link></Typography>
      </Stack>

      <Grow in={alertInfo !== undefined}>
        <Alert severity={alertInfo?.severity} sx={ElementWidth}>{alertInfo?.message}</Alert>
      </Grow>
    </>
  )
}