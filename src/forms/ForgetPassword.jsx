/* eslint-disable no-unused-vars */

import { Button, Input } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useForgetPasswordEmailMutation} from "../services/authAPI"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPassword() {
 const [email,setEmail] = useState("")
  const [forgetPasswordEmail] = useForgetPasswordEmailMutation()

const handleSubmit = async(e) => {
    e.preventDefault()
const formData = new FormData()
formData.append('email',email)
try {
    const res = await forgetPasswordEmail(formData);
    console.log(res)
    if (res?.data?.status === "Successful") {
        toast.success("Link Successfully send to email address")
    }else{
        toast.error("Failed to send link to email , please enter valid email Id ") 
    }
} catch (error) {
    toast.error(error)
}
setEmail("")
}
  return (
    <div className='flex justify-center md:m-10 m-5 w-auto'>
        <div className='md:p-10 w-full md:w-auto p-2 border-2 border-gray-200 rounded-md shadow-md shadow-black'>
          <div className='mt-5 md:ml-0 ml-5'>
             <p className='md:text-4xl text-2xl'>Forget Your Password ?</p>
            </div> 

            <div className='md:mt-20 mt-10 md:ml-0 ml-5'>
                <p>Enter your email address associated with your account</p>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='mt-5'>
                <Input label='Enter Email' type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='md:w-96 mt-5'>
                <Button className='w-full' type='submit'>Continue</Button>
            </div>
            </form>

            <div className='flex justify-center mt-5'>
                <p> Don&apos;t have an account? <span className='text-blue-600'><Link to="/signup">Sing U</Link>p</span></p>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}
