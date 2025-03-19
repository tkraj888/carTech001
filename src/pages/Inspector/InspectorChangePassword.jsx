/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import Inputs from "../../forms/Inputs";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {useInspChangePasswordMutation} from "../../services/inspectorapi"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export function InspectorChangePassword() {
const token  =  Cookies.get("token")

let jwtDecodes;

if (token)
  {
    jwtDecodes =jwtDecode(token)
}

const navigate = useNavigate()
const InspectorProfileId = token ? jwtDecodes?.inspectorProfileId : null;

  const [showPassword, setShowPassword] = useState(false);
  const [formStateData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
// console.log(formStateData)
  const [errors, setErrors] = useState({
    userProfileId: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
const [changePassword] = useInspChangePasswordMutation()
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validate input fields
    if (type !== "checkbox") {
      validateInput(name, value);
    }
  };

  const validateInput = (name, value) => {
    let error = "";

    switch (name) {
      case "userProfileId":
        error = value.trim() === "" ? "user Profile Id is required" : "";
        break;
      case "oldPassword":
        error = value.trim() === "" ? "Old Password is required" : "";
        break;
      case "newPassword":
        error = value.trim() === "" ? "New Password is required" : "";
        break;
      case "confirmNewPassword":
        error = value.trim() === "" ? "Confirm Password is required" : "";
        if (value.trim() !== formStateData.newPassword) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Validate all fields before submission
    let hasError = false;
    Object.keys(formStateData).forEach((key) => {
      validateInput(key, formStateData[key]);
      if (errors[key]) {
        hasError = true;
      }
    });

    // Validate if passwords match
    if (formStateData.newPassword !== formStateData.confirmNewPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmNewPassword: "Passwords do not match",
      }));
      hasError = true;
      toast.error(`Passwords do not match`) 

    }

    if (formStateData.oldPassword === formStateData.newPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "New Password cannot be the same as Old Password",
      }));
      hasError = true;
      toast.error(`New Password cannot be the same as Old Password`) 
    }
    if (hasError) return;
    const passChange = {
        oldPassword : formStateData.oldPassword,
        newPassword : formStateData.newPassword,
        confirmPassword : formStateData.confirmNewPassword
    }
  // console.log(passChange)
      try {
        
          const res = await changePassword({passChange,InspectorProfileId});
          
          
          if (res?.data.code === "Successful") {
            toast.success(`${res?.data.message}`)
            setTimeout(() =>{
              navigate("/")
            },1000)
          }else{
            toast.error(`${res?.error.data.message}`) 
          }
      } catch (error) {
        // console.log(error);
      }
   
  };
  

  return (
    <div className="h-auto mt-10 flex justify-center items-center">
      <CardUi color="transparent" shadow={true} className="">
        <Typography variant="h3" color="black" className="text-center">
          Change Password
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="mt-2 mb-2 w-80 p-5  max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6 w-100">
            
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Old Password
            </Typography>
            <Inputs
              label={"Old Password"}
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              value={formStateData.oldPassword}
              onChange={handleChange}
              error={errors.oldPassword}
              required={"required"}
              icon={
                showPassword ? (
                  <VisibilityOff
                    onClick={handleTogglePassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <Visibility
                    onClick={handleTogglePassword}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              New Password
            </Typography>
            <Inputs
              label={"New Password"}
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formStateData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <Inputs
              label={"Confirm Password"}
              type={showPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={formStateData.confirmNewPassword}
              onChange={handleChange}
              error={errors.confirmNewPassword}
              required={"required"}
            />
          </div>
          
          <Button className="mt-6" fullWidth type="submit">
            Change Password
          </Button>
        </form>
      </CardUi>
      <ToastContainer/>
    </div>
  );
}

export default InspectorChangePassword;
