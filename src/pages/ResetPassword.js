import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme';
import Stack from '@mui/material/Stack';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { ResetPasswordAPI } from '../Services/userService';
import { useNavigate, useSearchParams } from 'react-router-dom';
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));
export default function ResetPassword(props) {
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
    const [newPasswordError, setNewPasswordError] = React.useState(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    if (!token) {
        return _jsx("p", { children: "Invalid or missing token." }); 
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }
        try {
            const data = {
                newPassword,
                confirmPassword,
                token
            };
            const response = await ResetPasswordAPI(data);
            if (response.code == 200) {
                console.log("Password reset successful:", response);
                alert("Password reset successful!");
                navigate("/signIn"); 
            }
            else {
                alert("Password reset failed!. Please try again.");
            }
        }
        catch (err) {
            console.error("Error reset password:", err);
            alert("Reset password failed. Please check your password.");
        }
    };
    const validateInputs = () => {
        const newPassword = document.getElementById('newPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        let isValid = true;

        if (!newPassword.value || newPassword.value.length < 6) {
            setNewPasswordError(true);
            setNewPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        }
        else {
            setNewPasswordError(false);
            setNewPasswordErrorMessage('');
        }
        if (!confirmPassword.value || confirmPassword.value.length < 6) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        }
        else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
        }
 
        if (newPassword.value !== confirmPassword.value) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage('Passwords do not match.');
            isValid = false;
        }
        return isValid;
    };
    return (_jsx(AppTheme, { ...props, children: _jsx(Stack, { direction: "column", component: "main", sx: [
                {
                    justifyContent: 'center',
                    height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
                    marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
                    minHeight: '100%',
                },
                (theme) => ({
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        zIndex: -1,
                        inset: 0,
                        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                        backgroundRepeat: 'no-repeat',
                        ...theme.applyStyles('dark', {
                            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                        }),
                    },
                }),
            ], children: _jsx(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
                    justifyContent: 'center',
                    gap: { xs: 6, sm: 12 },
                    p: 2,
                    mx: 'auto',
                }, children: _jsx(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
                        justifyContent: 'center',
                        gap: { xs: 6, sm: 12 },
                        p: { xs: 2, sm: 4 },
                        m: 'auto',
                    }, children: _jsxs(Card, { variant: "outlined", children: [_jsx(Box, { sx: { display: { xs: 'flex', md: 'none' } } }), _jsx(Typography, { component: "h1", variant: "h4", sx: { width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }, children: "Update Password" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, sx: { display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }, children: [_jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "newPassword", children: "New Password" }), _jsx(TextField, { error: newPasswordError, helperText: newPasswordErrorMessage, name: "newPassword", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022", type: "password", id: "newPassword", autoComplete: "current-password", autoFocus: true, required: true, fullWidth: true, variant: "outlined", color: newPasswordError ? 'error' : 'primary', value: newPassword, onChange: (e) => setNewPassword(e.target.value) })] }), _jsxs(FormControl, { children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between' }, children: _jsx(FormLabel, { htmlFor: "confirmPassword", children: "Confirm Password" }) }), _jsx(TextField, { error: confirmPasswordError, helperText: confirmPasswordErrorMessage, name: "confirmPassword", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022", type: "password", id: "confirmPassword", autoComplete: "current-password", autoFocus: true, required: true, fullWidth: true, variant: "outlined", color: confirmPasswordError ? 'error' : 'primary', value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value) })] }), _jsx("br", {}), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", onClick: validateInputs, children: "Update Password" })] })] }) }) }) }) }));
}
