import React, { Suspense } from "react";
import {
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import './components.css';

export default function HomePageHeaderLayout(props: { portalHeader: string, children: React.ReactNode }): React.ReactNode {
  return (
    <Stack padding={2} spacing={4} className="full-screen login-background">
      <Stack spacing={2} direction={"row"} style={{display: 'flex'}}>
        <Image src='/logo.png' width={100} height={100} alt="logo" />
        <Stack spacing={1} direction={"column"}>
          <Typography variant={"h4"} component="div" className="home-heading" paddingInline={1}>
            AUS Exchange Program Portal
          </Typography>
          <Typography variant={"h6"} component="div" paddingInline={1}>
            {props.portalHeader}
          </Typography>
        </Stack>
      </Stack>
      <Suspense fallback={null}>
        {props.children}
      </Suspense>
    </Stack>
  )
}