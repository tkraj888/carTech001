/* eslint-disable no-unused-vars */
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
import { ToastContainer, toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export function AddSalesForm({refetch}) {
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
    profilePhotoId: "",
    joiningdate: "",
    city: "",
    roles: "SALESPERSON",
    documentId: "",
    area: "",
    status: true,
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
    const emailError = validateEmail(formData.email)
      ? ""
      : "Invalid email address";
    const mobileNoError = validateMobileNo(formData.mobileNo)
      ? ""
      : "Invalid mobile number";
    setErrors({ email: emailError, mobileNo: mobileNoError });

    // If there are validation errors, do not proceed
    if (emailError || mobileNoError) {
      return;
    }

    // Perform form submission logic here, e.g., send data to backend
    try {
      const { data ,error} = await SignUp(formData);
      if(error?.status){
        toast.error("Something is wrong");
      }else{
        toast.success("Register Successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error);
    }
    // Reset form after submission
    setFormData({
      email: "",
      password: "",
      mobileNo: "",
      firstName: "",
      lastName: "",
      address: "",
      joiningdate: "",
      city: "",
      documentId: "",
      area: "",
      status: false,
    });
    // Close the dialog
    setOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <Button color="indigo" onClick={handleOpen} className="flex gap-2">
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Seller
      </Button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <CardUi>
          <CardBody className="flex flex-col gap-4 items-center">
            <Typography variant="h4" color="blue-gray">
              Add Seller
            </Typography>
            <div className="w-full overflow-y-auto style={{ maxHeight: '400px' }}">
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-3 md:w-full overflow-y-auto"
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
                  error={errors.email}
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
                  error={errors.mobileNo}
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
                  label="Aadhar No"
                  name="documentId"
                  value={formData.documentId}
                  onChange={handleChange}
                  required
                />

                <Button color="indigo" type="submit">Add</Button>
              </form>
            </div>
          </CardBody>
        </CardUi>
      </Dialog>
    </>
  );
}
