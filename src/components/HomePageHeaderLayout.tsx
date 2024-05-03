import React, { Suspense } from "react";
import {
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import './components.css';
import {LogoutButton, BackButton, Header} from "./HeaderButtons";
import { cookies } from 'next/headers';

export default function HomePageHeaderLayout(props: { portalHeader: string, children: React.ReactNode }): React.ReactNode {
  const logout = async () => {
    "use server"
    cookies().delete('token')
    cookies().delete('user')
  }
  return (
    <Stack padding={2} spacing={4} className="full-screen login-background">
      <Stack spacing={2} direction={"row"} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <BackButton />
          <Image src='/logo.png' width={80} height={80} alt="logo" />
          <Header portalHeader={props.portalHeader} />
          </div>
        <LogoutButton logout={logout} />
      </Stack>
      <Suspense fallback={null}>
        {props.children}
      </Suspense>
    </Stack>
  )
}