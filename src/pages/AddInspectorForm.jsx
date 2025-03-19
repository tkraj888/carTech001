/* eslint-disable no-unused-vars */
import { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, CardBody, Typography } from "@material-tailwind/react";
import Inputs from "../forms/Inputs";
import CardUi from "../ui/CardUi";
import { useSignUpMutation } from "../services/authAPI";

export function AddInspectorForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [SignUp] = useSignUpMutation();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    roles: "INSPECTOR",
    document: 0,
    shopName: "",
    area: "",
    status: true,
    userType: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here, e.g., send data to backend
    try {
      const { data } = await SignUp(formData);
      // console.log("inspector data",data);
      if (data) {
        alert("Register Sucessfully");
      }else{
        alert("Register Unsucessfull");
      }
      
    } catch (error) {
      // console.log(error);
    }
    // Reset form after submission
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
    });
    // Close the dialog
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} color="indigo" className="flex gap-2">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Inspector
      </Button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <CardUi>
        <div className="md:flex justify-center m-5 md:m-0">
          <CardBody className="flex flex-col gap-4 ">
            <Typography variant="h4" color="blue-gray">
              Add Inspector
            </Typography>
            <form onSubmit={handleSubmit} className="space-y-3  ">
              <div className="flex md:flex-row flex-col  md:gap-2 gap-3">
                <Inputs
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Inputs
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <Inputs
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Inputs
                label="Mobile Number"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
              <Inputs
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Inputs
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <Inputs
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <Button color="indigo" type="submit">Add</Button>
            </form>
          </CardBody>
          </div>
        </CardUi>
      </Dialog>
    </>
  );
}
