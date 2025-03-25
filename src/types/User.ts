export interface SignUpData{
    fname : string,
    lname : string,
    address : string,
    mobileNumber : string,
    email:string,
    password : string,
    role : string
}

export interface ForgetPassword{
    email : string
}

export interface VerifyEmail{
    email : string,
    otp : string
}

export interface SignInData{
    username : string,
    password : string
}

export interface updatePasswordData{
    newPassword : string ,
    confirmPassword : string,
    token : string
}