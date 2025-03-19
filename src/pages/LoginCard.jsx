/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSignInMutation } from "../services/authAPI";
import { setToken } from "../features/authSlice";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Visibility, VisibilityOff } from '@material-ui/icons';

export function LoginCard() {
  const [formStateData, setFormStateData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormStateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data , error} = await signIn(formStateData);
            
      if (data) {
         
        const jwtDecodes = jwtDecode(data);
        const jwtDecodesJson = JSON.stringify(jwtDecodes);
        localStorage.setItem("userInfo", jwtDecodesJson);
        
        toast.success("Login Sucessfully");
        setTimeout(() => {
          navigate("/");
        }, 1000); 
        dispatch(setToken(data));
      } else {
        if(error.status === 401){
          toast.error(error.data.message);
        }else{

          toast.error("email and password is not match");
        }
      }

      // Handle successful sign-in, such as redirecting to a different page
    } catch (error) {
      // console.log(error);
      // Handle sign-in error
    }

    
  };

  return (
    <div>

    <div className="flex justify-center items-center h-screen mx-2" 
    
    // style={{
    //     backgroundImage: "url('../public/new/bgn6.jpg')",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     margin: "0px 0px 0px 0px",
    //     height: "90vh"
    //   }}
      >
    
   
    <ToastContainer autoClose={2000} />
      <Card className="w-96 bg-white shadow-xl border ">

      <div className="items-center mb-12 ">
<Link to={"/"}>
          {/* <Typography className="flex cursor-pointer mt-2  font-bold text-3xl justify-center items-center 
           ">
            CarTechIndia
          </Typography> */}
        </Link>
        </div>


      
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              name="username"
              type="email"
              value={formStateData.username}
              onChange={handleChange}
            />
            <Input label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formStateData.password}
              onChange={handleChange}
              icon={showPassword ? <VisibilityOff onClick={handleTogglePassword} className="cursor-pointer" /> : <Visibility onClick={handleTogglePassword} className="cursor-pointer" />} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
            <div className="flex items-center justify-center mt-4">
            <Typography variant="small" className="flex justify-center">
  Don&apos;t have an account?{' '}
</Typography>

              <Link to="/signup">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </div>
            <div className="flex justify-center">
                <Link to="/forgetPassword">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Forget Password ?
                </Typography>
              </Link>
              </div>
          </CardFooter>
        </form>
      </Card>
    </div>
    </div>
  );
}
