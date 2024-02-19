'use client';
import React, { useEffect, useState } from "react";
import { Typography } from '@mui/material';

export default function Page() {
  const [applicationState, setApplicationState] = useState<string>('')
  useEffect(() => {
    setApplicationState(JSON.parse(localStorage.getItem("applicationState") || JSON.stringify('')))
  }, [])

  return (
    <Typography variant="h5">
      {`Current Status: ${applicationState}`}
    </Typography>
  );
}