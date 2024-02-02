'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#354545',
                },
            },
        },
    },
});

/**
 * CustomThemeProvider component for MUI theme. Should be used as a wrapper for the entire app.
 * see https://mui.com/material-ui/customization/theming/ for more info.
 */
export default function CustomThemeProvider(
    props: { children: React.ReactNode }
) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}