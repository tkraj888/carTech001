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
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function ResetPassword(props: { disableCustomTheme?: boolean }) {
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = React.useState('');
  const [newPassword , setNewPassword] = React.useState('');
  const [confirmPassword , setConfirmPassword] = React.useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <p>Invalid or missing token.</p>; 
  }



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
       const data = {
         newPassword ,
         confirmPassword,
         token
       }
       const response = await ResetPasswordAPI(data);
       if (response.code == 200) {
        console.log("Password reset successful:", response);
        alert("Password reset successful!");
        navigate("/signIn"); 
      } else {
        alert("Password reset failed!. Please try again.");
      }
    } catch (err) {
      console.error("Error reset password:", err);
      alert("Reset password failed. Please check your password.");
    }
  };


  const validateInputs = () => {
    const newPassword = document.getElementById('newPassword') as HTMLInputElement;
    const confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
  
    let isValid = true;
  
    if (!newPassword.value || newPassword.value.length < 6) {
      setNewPasswordError(true);
      setNewPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage('');
    }
  
    if (!confirmPassword.value || confirmPassword.value.length < 6) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
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
  

  return (
    <AppTheme {...props}>
         <Stack
        direction="column"
        component="main"
        sx={[
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
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
        <Card variant="outlined">
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
 
        </Box>
        <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
            Update Password
        </Typography>
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
            <FormControl>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <TextField
                error={newPasswordError}
                helperText={newPasswordErrorMessage}
                name="newPassword"
                placeholder="••••••"
                type="password"
                id="newPassword"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={newPasswordError ? 'error' : 'primary'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            </FormControl>
            <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            </Box>
            <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                name="confirmPassword"
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={confirmPasswordError ? 'error' : 'primary'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </FormControl>
            <br/>
            <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
            Update Password
            </Button>
        </Box>
        </Card>
        </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}
