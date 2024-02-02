import React, { Suspense } from "react";
import {
    Grid,
    Zoom,
    Stack,
    Typography,
} from "@mui/material";
import Image from "next/image";
import './login.css';

export default function LoginLayout(props: {children:React.ReactNode}): React.ReactNode {
    return (
        <Grid container className="full-screen">
            <Zoom in={true}>
            <Grid item xs={12} md={6} className="login-background">
                <div className="horizontal-center-container">
                    <Stack spacing={4} marginTop={8} className="center-flex">
                        <Image src='/logo.png' width={150} height={150} alt="logo" className="login-logo-image" />
                        <Typography variant={"h5"} component="div" style={{ color: "black", fontWeight: "bold", textAlign: 'center' }} paddingInline={1}>
                            AUS EXCHANGE PROGRAM PORTAL
                        </Typography>
                        <Suspense fallback={<div>Loading...</div>}>
                            {props.children}
                        </Suspense>
                    </Stack>
                </div>
            </Grid>
            </Zoom>
        </Grid>
    )
}