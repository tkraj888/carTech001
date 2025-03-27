/* eslint-disable no-unused-vars */

import { Button, Input } from '@material-tailwind/react'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import {useResetPasswordMutation} from "../services/authAPI"
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
     const navigate = useNavigate()
    const [resetPassword] = useResetPasswordMutation()

const handleResetPassword = async (e) => {
    e.preventDefault();
 
    if (password !== confirmPassword) {
     toast.error("password and confirmPassword is not match")
      return;
    }
 const emailData = {
    token: token,
    password: password,
    confirmPassword: confirmPassword,
 }
    try {
     const res = await resetPassword({emailData})
    
      if (res.data?.status === 'Successful') {
        toast.success("Password Change Successfully")
        setTimeout(() => {
            navigate("/signin")
        },1000)
        
      }else{
        toast.error("Password is not Change ")
      }
    } catch (error) {
        toast.error(error)
     
    }
  };

  return (
    <div className="h-auto mt-10 flex justify-center items-center ">
      <div className="shadow-md shadow-black m-5 rounded-md p-5 md:w-96">
        <div>
        <p className='text-3xl'>Reset Password</p>
        </div>
      
      <form onSubmit={handleResetPassword}>
      <div className='mt-5'>
        <Input
        label='Password'
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>

        <div className='mt-5'>
           <Input
          label='Confirm Password'
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        </div>
        <div className='mt-5 flex justify-center'>
        <Button type="submit">Reset Password</Button>
        </div>
        
      </form>
      </div>
      <ToastContainer/>
    </div>
  )
}
