/* eslint-disable react/prop-types */
 
import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import { useSignUpMutation } from "../../services/authAPI";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast ,ToastContainer } from "react-toastify";


export function AddDealerFormSales({refetch}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [SignUp] = useSignUpMutation();

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userid = token ? jwtDecodes?.userId : null;
  // console.log("userid", userid);



  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    roles: "DEALER",
    document: 0,
    shopName: "",
    area: "",
    status: false,
    userType: "",
    salesPersonId: userid,
  });

  // Validation state
  const [errors, setErrors] = useState({
    email: "",
    mobileNo: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate mobile number
  const validateMobileNo = (mobileNo) => {
    const mobileNoRegex = /^\d{10}$/; // Adjust the pattern according to your requirements
    return mobileNoRegex.test(mobileNo);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    const emailError = validateEmail(formData.email) ? "" : "Invalid email address";
    const mobileNoError = validateMobileNo(formData.mobileNo) ? "" : "Invalid mobile number";
    
    setErrors({ email: emailError, mobileNo: mobileNoError });
  
    // If there are validation errors, do not proceed
    if (emailError || mobileNoError) {
      return;
    }
  
    try {
      // Perform form submission logic here, e.g., send data to backend
      const { data, error } = await SignUp(formData);

      // If there's an error, show an error message
      if (error) {
        toast.error(error?.data?.message || "An error occurred");
      } else {
        toast.success(data?.message);
      }
      refetch();
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        password: "",
        area: "",
        city: "",
        address: "",
        shopName: "",
        roles: "DEALER",
        document: 0,
        status: false,
        userType: "",
      });
  
      // Close the dialog
      setOpen(false);
  
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Submission failed. Please try again later.");
    }
  };
  

  return (
    <>
    <ToastContainer />
      <Button onClick={handleOpen} color="indigo" className="flex gap-2">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Dealer
      </Button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <CardUi>
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Dealer
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="space-y-3 md:w-full"
            >
              <div className="flex md:flex-row flex-col gap-2 ">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                // error={errors?.email}
                required
              />
              {errors.email && (
                <Typography color="red">{errors.email}</Typography>
              )}
              <Input
                label="Mobile Number"
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                // error={errors?.mobileNo}
                required
              />
              {errors.mobileNo && (
                <Typography color="red">{errors.mobileNo}</Typography>
              )}
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="flex gap-2 md:flex-row flex-col">
                <Input
                  label="Area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <Input
                label="Shop Name"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                required
              />
              <Button color="indigo" type="submit">Add</Button>
            </form>
          </CardBody>
        </CardUi>
      </Dialog>
    </>
  );
}
