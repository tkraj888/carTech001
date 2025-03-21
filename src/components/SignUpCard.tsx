import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme';
// import ColorModeSelect from '../theme/ColorModeSelect';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { SendOTP, signUpUser } from '../Services/userService';
import OTPComponent from './OTPComponent';
import { ArrowBack } from "@mui/icons-material";


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
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

const SignUpContainer = styled(Stack)(({ theme }) => ({

  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
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
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [lNameError, setLNameError] = React.useState(false);
  const [mobileNoError, setMobileNoError] = React.useState(false);
  const [addressError ,setAddressError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [lNameErrorMessage, setLNameErrorMessage] = React.useState('');
  const [mobileNoErrorMessage , setMobileNoErrorMessage] = React.useState('');
  const [addressErrorMessage , setAddressErrorMessage] = React.useState('');
  const [otpOpen, setOtpClosed] = React.useState(false);
  const [email, setEmail ] = React.useState<string>("");
  const [isVerify , setIsVerify] = React.useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const lname = document.getElementById('lname') as HTMLInputElement;
    const mobileNo = document.getElementById('mobileNo') as HTMLInputElement;
    const address = document.getElementById('address') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('First Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!lname.value || lname.value.length < 1) {
        setLNameError(true);
        setLNameErrorMessage('Last Name is required.');
        isValid = false;
      } else {
        setLNameError(false);
        setLNameErrorMessage('');
      }

      if (!mobileNo.value || !/^\d{10}$/.test(mobileNo.value)) {
        setMobileNoError(true);
        setMobileNoErrorMessage('Please enter a valid 10-digit mobile number.');
        isValid = false;
      } else {
        setMobileNoError(false);
        setMobileNoErrorMessage('');
      }

      if (!address.value || address.value.length < 1) {
        setAddressError(true);
        setAddressErrorMessage('Address is required.');
        isValid = false;
      } else {
        setAddressError(false);
        setAddressErrorMessage('');
      }

    return isValid;
    
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
  
    if (nameError || emailError || passwordError || lNameError || addressError || mobileNoError) {
      return; 
    }
  
    try {
    
      const formData = {
        fname: (event.currentTarget.elements.namedItem("fname") as HTMLInputElement)?.value,
        lname: (event.currentTarget.elements.namedItem("lname") as HTMLInputElement)?.value,
        email: (event.currentTarget.elements.namedItem("email") as HTMLInputElement)?.value,
        password: (event.currentTarget.elements.namedItem("password") as HTMLInputElement)?.value,
        mobileNumber: (event.currentTarget.elements.namedItem("mobileNo") as HTMLInputElement)?.value,
        address: (event.currentTarget.elements.namedItem("address") as HTMLInputElement)?.value,
        role: 'USER'
      };
      const response = await signUpUser(formData);
      if(response.code == 200){
        console.log("User signed up successfully:", response);
        alert("Sign-up successful!");
        navigate("/signIn");
      }else{
        alert("Something is wrong");
      }
  
    } catch (err) {
      console.error("Error signing up:", err);
      alert("Sign-up failed. Please try again.");
    }
  };
  
  const handleSendOtpToVerfyMail = async () =>{
    
    try{
      const data ={
        email: (document.getElementById('email') as HTMLInputElement)?.value || ""
      }
      const response = await SendOTP(data);
      if(response.errorCode == "NOT_FOUND"){
        alert(response.errorMessage)
      }else{
        console.log("send OTP successfully",response);
        alert("Send OTP successfully");
      }
      setOtpClosed(true);
    }catch(err){
      console.error("Error Send OTP:", err);
      alert("OTP send failed. Please try again.");
    }
  }

  const handleOpen = () => {
    const email = document.getElementById('email') as HTMLInputElement;
  
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      return; 
    } else {
      setEmail(email.value);
      setEmailError(false);
      setEmailErrorMessage('');
    }
  
    handleSendOtpToVerfyMail();
    
  };
  
  const handleVerifiedEmail = () =>{
    setOtpClosed(false)
  }
  const handleVerifySuccess = () => {
    setIsVerify(true); 
    setOtpClosed(false); 
  };

  return (
    <AppTheme {...props}>
    
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <RouterLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", color: "inherit" }}>
            <ArrowBack sx={{ mr: 1 }} /> Car Auto Care
          </RouterLink>
 
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="fname">First name</FormLabel>
              <TextField
                autoComplete="First name"
                name="fname"
                required
                fullWidth
                id="name"
                placeholder="Jon"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lname">Last name</FormLabel>
              <TextField
                autoComplete="Last name"
                name="lname"
                required
                fullWidth
                id="lname"
                placeholder="Snow"
                error={lNameError}
                helperText={lNameErrorMessage}
                color={lNameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="mobileNo">Contact No</FormLabel>
              <TextField
                autoComplete="Contact No"
                name="mobileNo"
                required
                fullWidth
                id="mobileNo"
                placeholder="1234567890"
                error={mobileNoError}
                helperText={mobileNoErrorMessage}
                color={mobileNoError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Link
                component={Button}
                onClick={isVerify ? undefined : handleOpen} 
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                {isVerify ? "Verified" : "Verify"}
              </Link>
          {isVerify ?(
            <>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="mobileNo">Address</FormLabel>
              <TextField
                autoComplete="Address"
                name="address"
                required
                fullWidth
                id="address"
                placeholder="Abc"
                error={addressError}
                helperText={addressErrorMessage}
                color={addressError ? 'error' : 'primary'}
              />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
            </>
          ) : undefined }
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button> */}
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/signIn"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
            <OTPComponent open={otpOpen} handleClose={handleVerifiedEmail} email={email} isVerifySuccess={handleVerifySuccess}/>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
