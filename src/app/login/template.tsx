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
                    <Stack spacing={4} marginTop={6} className="center-flex">
                        <Image src='/logo.png' width={100} height={100} alt="logo" className="login-logo-image" />
                        <Typography variant={"h6"} component="div" style={{ color: "black", fontWeight: "bold", textAlign: 'center' }} paddingInline={1}>
                            AUS EXCHANGE PROGRAM PORTAL
                        </Typography>
                        <Suspense fallback={null}>
                            <Stack spacing={2} className="center-flex">
                                {props.children}
                            </Stack>
                        </Suspense>
                    </Stack>
                </div>
            </Grid>
            </Zoom>
        </Grid>
    )
}