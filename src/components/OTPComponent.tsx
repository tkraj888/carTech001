import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { VerifyEmailOtp } from "../Services/userService";

interface OTPProps {
  open: boolean;
  handleClose: () => void;
  isVerifySuccess: () => void;
  email : string;
}

export default function OTPComponent({ open, handleClose, email ,isVerifySuccess }: OTPProps) {
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = React.useState(120); // 2 minutes
  const [resendDisabled, setResendDisabled] = React.useState(true);
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>(
    new Array(6).fill(null)
  );
  const [loading, setLoading] = React.useState(false);

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const otpCode = otp.join(""); // Convert array to string
      const data= {
        email : email,
        otp : otpCode
      } 
      const response = await VerifyEmailOtp(data);
      console.log(response);
      if (response.message === "Verified") {
        alert("OTP Verified Successfully!");
        isVerifySuccess();
      } else {
        alert("Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Verification failed. Please check the OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return; 
  
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
 
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }

    if (open) {
        setTimer(120); 
  
        const timer = setInterval(() => {
            setTimer((prev) => {
            if (prev === 1) clearInterval(timer); 
            return prev - 1;
          });
        }, 1000);
  
        return () => clearInterval(timer); 
      }
  }, [open ,timer]);



  const handleResend = () => {
    setTimer(120); 
    setResendDisabled(true);
    setOtp(Array(6).fill("")); 
    inputRefs.current[0]?.focus();
    
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleVerifyOTP();
            
          },
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>Enter OTP</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <DialogContentText>
          A verification mail has been sent to your registered email. Please check your inbox and enter the 6-digit OTP to proceed.
        </DialogContentText>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {otp.map((digit, index) => (
            <OutlinedInput
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onKeyDown={(eve) => handleKeyDown(index, eve)}
              onChange={(event) => handleChange(index, event)}
              required
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "1.5rem", width: "2.5rem" },
              }}
              type="text"
            />
          ))}
        </Box>

        <Typography sx={{ textAlign: "center", mt: 2 }}>
          {resendDisabled ? `Resend OTP in ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}` : (
            <Button onClick={handleResend} disabled={resendDisabled}>
              Resend OTP
            </Button>
          )}
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
