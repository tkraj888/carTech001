import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export default function OTPComponent({ open, handleClose, email, isVerifySuccess }) {
    const [otp, setOtp] = React.useState(Array(6).fill(""));
    const [timer, setTimer] = React.useState(120); 
    const [resendDisabled, setResendDisabled] = React.useState(true);
    const inputRefs = React.useRef(new Array(6).fill(null));
    const [loading, setLoading] = React.useState(false);
    const handleVerifyOTP = async () => {
        try {
            setLoading(true);
            const otpCode = otp.join("");
            const data = {
                email: email,
                otp: otpCode
            };
            const response = await VerifyEmailOtp(data);
            console.log(response);
            if (response.message === "Verified") {
                alert("OTP Verified Successfully!");
                isVerifySuccess();
            }
            else {
                alert("Invalid OTP, please try again.");
            }
        }
        catch (error) {
            console.error("Error verifying OTP:", error);
            alert("Verification failed. Please check the OTP.");
        }
        finally {
            setLoading(false);
        }
    };
    
    const handleChange = (index, event) => {
        const value = event.target.value;
        if (!/^\d*$/.test(value))
            return; 
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
     
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };
   
    const handleKeyDown = (index, event) => {
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
        }
        else {
            setResendDisabled(false);
        }
        if (open) {
            setTimer(120); 
            const timer = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1)
                        clearInterval(timer); 
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer); 
        }
    }, [open, timer]);

    const handleResend = () => {
        setTimer(120); 
        setResendDisabled(true);
        setOtp(Array(6).fill("")); 
        inputRefs.current[0]?.focus();
      
    };
    return (_jsxs(Dialog, { open: open, onClose: handleClose, slotProps: {
            paper: {
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();
                    handleVerifyOTP();
                  
                },
                sx: { backgroundImage: "none" },
            },
        }, children: [_jsx(DialogTitle, { children: "Enter OTP" }), _jsxs(DialogContent, { sx: { display: "flex", flexDirection: "column", gap: 2, width: "100%" }, children: [_jsx(DialogContentText, { children: "A verification mail has been sent to your registered email. Please check your inbox and enter the 6-digit OTP to proceed." }), _jsx(Box, { sx: { display: "flex", justifyContent: "center", gap: 1 }, children: otp.map((digit, index) => (_jsx(OutlinedInput, { inputRef: (el) => (inputRefs.current[index] = el), value: digit, onKeyDown: (eve) => handleKeyDown(index, eve), onChange: (event) => handleChange(index, event), required: true, inputProps: {
                                maxLength: 1,
                                style: { textAlign: "center", fontSize: "1.5rem", width: "2.5rem" },
                            }, type: "text" }, index))) }), _jsx(Typography, { sx: { textAlign: "center", mt: 2 }, children: resendDisabled ? `Resend OTP in ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}` : (_jsx(Button, { onClick: handleResend, disabled: resendDisabled, children: "Resend OTP" })) })] }), _jsxs(DialogActions, { sx: { pb: 3, px: 3 }, children: [_jsx(Button, { onClick: handleClose, children: "Cancel" }), _jsx(Button, { variant: "contained", type: "submit", children: "Continue" })] })] }));
}
