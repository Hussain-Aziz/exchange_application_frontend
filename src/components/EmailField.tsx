'use client'
import { useState, useEffect } from "react";
import { 
    Box,
    TextField,
} from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { emailRegex, LoginIconStyles, ElementWidth, LoginIconSize } from "../constants/LoginConstants";

/**
 * Renders a email field component with a account icon.
 * @param emailRef A reference to the email input field that can be used to get the text value.
 * @param checkEmailValidity Whether to check if the email is a valid AUS email and display an error message if it is not.
 */
export default function EmailField(
    {emailRef, checkEmailValidity = false}:
    {emailRef: React.RefObject<HTMLInputElement>, checkEmailValidity?: boolean | undefined}) 
{
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string>('');
    const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    useEffect(() => {
        if (!checkEmailValidity) return;

        if (email.length && !emailRegex.test(email)) {
            setEmailError("Email is invalid")
        } else {
            setEmailError(undefined)
        }
    }, [email, checkEmailValidity])
    
    return (
        <Box className="center-flex" sx={{width: ElementWidth}}>
        <TextField 
            label="Email" 
            variant="filled"
            size="small"
            inputRef={emailRef}
            onChange={onEmailChanged}
            error={emailError !== undefined}
            helperText={emailError}
            sx={{ width: '100%' }} 
        />
        <AccountCircleRoundedIcon sx={{...LoginIconStyles, ...LoginIconSize}} />
    </Box>
    )
}