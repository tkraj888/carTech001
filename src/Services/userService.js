import apiClient from "./apiService";
export const signUpUser = async (userData) => {
    try {
        const response = await apiClient.post("/user/registerUser", userData);
        return response.data;
    }
    catch (error) {
        console.error('Error save user', error);
        throw new Error('Failed to save user');
    }
};
export const SignInUser = async (userloginData) => {
    try {
        const response = await apiClient.post("/jwt/login", userloginData);
        return response.data;
    }
    catch (error) {
        console.log('Error login user', error);
        throw new Error("failed to login user");
    }
};
export const SendOTP = async (emailData) => {
    try {
        const response = await apiClient.post(`/emailVerification/send-otp`, emailData);
        return response.data;
    }
    catch (error) {
        console.log(`Error to send OTP`, error);
        throw new Error(error instanceof Error ? error.message : "Send OTP Error");
    }
};
export const userForgetPassword = async (forgetData) => {
    try {
        const response = await apiClient.post(`/user/forgot-password?email=${forgetData.email}`);
        return response.data;
    }
    catch (error) {
        console.log(`Error to send OTP`, error);
        throw new Error("Send OTP Error");
    }
};
export const VerifyEmailOtp = async (verifyData) => {
    try {
        const response = await apiClient.post(`/emailVerification/verify-otp`, verifyData);
        return response.data;
    }
    catch (error) {
        console.log(`Error to verified OTP`, error);
        throw new Error("Send OTP Error");
    }
};
export const ResetPasswordAPI = async (passwordData) => {
    try {
        const response = await apiClient.post(`/user/update-password`, passwordData);
        return response.data;
    }
    catch (error) {
        console.log(`Error to password reset`, error);
        throw new Error("password reset faild");
    }
};
