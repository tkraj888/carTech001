/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Input, Button, Checkbox, Typography } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Inputs from "../forms/Inputs";
import CardUi from "../ui/CardUi";
import { useSignUpMutation } from "../services/authAPI";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export function SimpleRegistrationForm() {
  const [SignUp] = useSignUpMutation();
  const [formStateData, setFormData] = useState({
    email: "",
    password: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    roles: "USER",
    document: 0,
    area: "",
    status: false,
    userType: "",
  });
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    area: "",
    password: "",
    agreeTerms: "",
  });

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
    let validationErrors = {};
    switch (name) {
      case "firstName":
        error = value.trim() === "" ? "First name is required" : "";
        break;
      case "lastName":
        error = value.trim() === "" ? "Last name is required" : "";
        break;
      case "email":
        error = !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "";
        break;
        case "mobileNumber":
          // Validate if the mobile number consists of exactly 10 digits
          if (!/^\d{10}$/.test(value)) {
            validationErrors.mobileNumber = "Mobile number must be 10 digits";
          }
          break;
      case "address":
        error = value.trim() === "" ? "Address is required" : "";
        break;
      case "city":
        error = value.trim() === "" ? "City is required" : "";
        break;
      case "area":
        error = value.trim() === "" ? "Area is required" : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
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

    // Validate password separately
    if (formStateData.password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      hasError = true;
    }

    if (!hasError) {
      // Your form submission logic goes here
      // console.log("Form data submitted:", formStateData);
    }

    try {
      const {data , error} = await SignUp(formStateData);
      if(error?.status === 400){
        toast.error(error?.data?.message);
      }
      else{
        toast.success(data?.message);
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    } catch (error) {
        toast.error("Register UnSucessfully");
    }
  };

  const { countries } = useCountries();
  const defaultCountryIndex = countries.findIndex(
    (country) => country.name === "India"
  );
  const [country, setCountry] = useState(
    defaultCountryIndex !== -1 ? defaultCountryIndex : 0
  );
  const { name, flags, countryCallingCode } = countries[country];

  return (
    <div className="h-auto mt-10 flex justify-center items-center">
      <CardUi color="transparent" shadow={false}>
      <ToastContainer />
        <Typography variant="h3" color="black" className="text-center">
          Sign Up
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 m-4 flex flex-col gap-6 w-100">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              First Name
            </Typography>
            <Inputs
              label={"Enter your first name"}
              name="firstName"
              value={formStateData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Last Name
            </Typography>
            <Inputs
              label={"Enter your last name"}
              name="lastName"
              value={formStateData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Inputs
              label={"Email"}
              type={"email"}
              name="email"
              value={formStateData.email}
              onChange={handleChange}
              error={errors.email}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Mobile Number
            </Typography>
            <div className="relative flex w-full max-w-[24rem]">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    {countryCallingCode}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {countries.map(
                    ({ name, flags, countryCallingCode }, index) => {
                      return (
                        <MenuItem
                          key={name}
                          value={name}
                          className="flex items-center gap-2"
                          onClick={() => setCountry(index)}
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          {name}{" "}
                          <span className="ml-auto">{countryCallingCode}</span>
                        </MenuItem>
                      );
                    }
                  )}
                </MenuList>
              </Menu>
              <Input
                placeholder="Mobile Number"
                className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
                label={"Mobile Number"}
                name="mobileNo"
                value={formStateData.mobileNo}
                onChange={handleChange}
                type={"number"}
                required={"required"}
              />
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Inputs
              label={"Password"}
              type={"password"}
              name="password"
              value={formStateData.password}
              onChange={handleChange}
              error={errors.password}
              required={"required"}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Address
            </Typography>
            <Inputs
              label={"Address"}
              name="address"
              value={formStateData.address}
              onChange={handleChange}
              error={errors.address}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              City
            </Typography>
            <Inputs
              label={"City"}
              name="city"
              value={formStateData.city}
              onChange={handleChange}
              error={errors.city}
              required={"required"}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Area
            </Typography>
            <Inputs
              label={"Area"}
              name="area"
              value={formStateData.area}
              onChange={handleChange}
              error={errors.area}
              required={"required"}
            />
          </div>
          <div className="ml-4">
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <Link
                  to="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            name="status"
            checked={formStateData.status}
            onChange={handleChange}
            // error={errors.agreeTerms}
          />
          </div>
          <div className="flex justify-center">
          <Button className="mt-6 w-28" fullWidth type="submit">
            Sign Up
          </Button>
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </CardUi>
    </div>
  );
}

export default SimpleRegistrationForm;
