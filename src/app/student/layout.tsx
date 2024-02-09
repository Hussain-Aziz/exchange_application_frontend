import React, { Suspense } from "react";
import {
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import './student.css';

export default function Layout(props: { children: React.ReactNode }): React.ReactNode {
  return (
    <Stack padding={2} spacing={4} className="full-screen login-background">
      <Stack spacing={2} direction={"row"} style={{display: 'flex'}}>
        <Image src='/logo.png' width={100} height={100} alt="logo" />
        <Typography variant={"h4"} component="div" className="home-heading" paddingInline={1}>
          AUS Exchange Program Portal
        </Typography>
      </Stack>
      <Suspense fallback={null}>
        {props.children}
      </Suspense>
    </Stack>
  )
}