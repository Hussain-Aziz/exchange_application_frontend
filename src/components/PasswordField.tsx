'use client'
import { 
    Box,
    TextField,
    IconButton,
} from "@mui/material";
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useEffect, useState } from "react";
import { LoginIconStyles, ElementWidth, LoginIconSize, strongPasswordRegex } from "../constants/LoginConstants";

/**
 * Renders a password field component with a toggleable visibility icon.
 * @param passwordRef A reference to the password input field that can be used to get the text value.
 * @param passwordText The label text for the password field.
 * @param checkPasswordStrength Whether to check the password strength and display an error message if it is too weak.
 */
export default function PasswordField(
    {passwordRef, passwordText = "Password", checkPasswordStrength = false}:
    {passwordRef: React.RefObject<HTMLInputElement>, passwordText?: string | undefined, checkPasswordStrength?: boolean | undefined}) 
{
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string>('');
    const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    useEffect(() => {
        if (!checkPasswordStrength) return;

        if (password.length && !strongPasswordRegex.test(password)) {
            setPasswordError("Password is too weak")
        } else {
            setPasswordError(undefined)
        }
    }, [password, checkPasswordStrength])

    return (
        <Box className="center-flex" sx={{width: ElementWidth}}>
            <TextField 
                type={showPassword ? 'text' : 'password'} 
                label={passwordText} 
                variant="filled" 
                size="small"
                error={passwordError !== undefined}
                helperText={passwordError}
                inputRef={passwordRef} 
                onChange={onPasswordChanged} 
                sx={{ width: '100%' }} 
            />
            <IconButton onClick={handleClickShowPassword} sx={LoginIconStyles} onMouseDown={(e) => e.preventDefault()}>
                {showPassword ? <VisibilityOffIcon sx={{ margin: '0', ...LoginIconSize }} /> : <VisibilityIcon sx={{ margin: '0', ...LoginIconSize }} />}
            </IconButton>
        </Box>
    )
}