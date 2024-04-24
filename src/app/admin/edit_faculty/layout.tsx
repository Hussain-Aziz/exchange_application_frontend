import React from "react";
import {
  Grow,
  Grid,
  Stack,
} from "@mui/material";

export default function Layout(props: { children: React.ReactNode }): React.ReactNode {
  return (
    <Grow in={true}>
      <Grid container className="full-screen">
        <Grid item xs={10}>
          <Stack spacing={1} sx={{overflowY: 'auto'}}>
            {props.children}
          </Stack>
        </Grid>
      </Grid>
    </Grow>
  )
}