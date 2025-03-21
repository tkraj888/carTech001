import { useState } from "react";
import { Input, Button, Checkbox, Typography } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { motion } from "framer-motion";
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
import { toast, ToastContainer } from "react-toastify";
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

    if (type !== "checkbox") {
      validateInput(name, value);
    }
  };

  const validateInput = (name, value) => {
    let error = "";
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
      case "mobileNo":
        error = !/^\d{10}$/.test(value)
          ? "Mobile number must be 10 digits"
          : "";
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

    let hasError = false;
    Object.keys(formStateData).forEach((key) => {
      validateInput(key, formStateData[key]);
      if (errors[key]) {
        hasError = true;
      }
    });

    if (formStateData.password.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      hasError = true;
    }

    if (!hasError) {
      try {
        const { data, error } = await SignUp(formStateData);
        if (error?.status === 400) {
          toast.error(error?.data?.message);
        } else {
          toast.success(data?.message);
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        }
      } catch (error) {
        toast.error("Register Unsuccessfully");
      }
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
    <div
      className=" p-6 h-auto mt-3 flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-300"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/modern-showroom-with-rows-new-cars_285145-11127.jpg?uid=R154194869&ga=GA1.1.15909760.1718124178&semt=ais_hybrid")', // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md shadow-lg rounded-lg"
      >
        <CardUi color="transparent" shadow={false}>
          <ToastContainer />

          {/* New Sign Up Title */}
          <Typography
            variant="h4"
            color="black"
            className="text-center mb-2 shadow p-2 rounded"
          >
            Sign Up
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-auto mt-10 flex justify-center items-center"
          >
            <Typography
              variant="h3"
              color="black"
              className="text-center shadow-lg p-2 rounded"
            >
              Create Your Account
            </Typography>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 m-4 flex flex-col gap-6 w-100">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                First Name
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Inputs
                  label={"Enter your first name"}
                  name="firstName"
                  value={formStateData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required={"required"}
                  className={`transition duration-300 shadow-lg ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {errors.firstName && (
                  <motion.span
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.firstName}
                  </motion.span>
                )}
              </motion.div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Last Name
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Inputs
                  label={"Enter your last name"}
                  name="lastName"
                  value={formStateData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required={"required"}
                  className={`transition duration-300 shadow-lg ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {errors.lastName && (
                  <motion.span
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.lastName}
                  </motion.span>
                )}
              </motion.div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Inputs
                  label={"Email"}
                  type={"email"}
                  name="email"
                  value={formStateData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required={"required"}
                  className={`transition duration-300 shadow-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {errors.email && (
                  <motion.span
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.email}
                  </motion.span>
                )}
              </motion.div>
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
                      className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3 shadow-lg"
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
                            <span className="ml-auto">
                              {countryCallingCode}
                            </span>
                          </MenuItem>
                        );
                      }
                    )}
                  </MenuList>
                </Menu>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    placeholder="Mobile Number"
                    className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900 transition duration-300 shadow-lg focus:ring focus:ring-blue-200"
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
                </motion.div>
              </div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Inputs
                  label={"Password"}
                  type={"password"}
                  name="password"
                  value={formStateData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required={"required"}
                  className={`transition duration-300 shadow-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {errors.password && (
                  <motion.span
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.password}
                  </motion.span>
                )}
              </motion.div>

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Address
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Inputs
                  label={"Address"}
                  name="address"
                  value={formStateData.address}
                  onChange={handleChange}
                  error={errors.address}
                  required={"required"}
                  className={`transition duration-300 shadow-lg ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {errors.address && (
                  <motion.span
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.address}
                  </motion.span>
                )}
              </motion.div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                City
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Inputs
                  label={"City"}
                  name="city"
                  value={formStateData.city}
                  onChange={handleChange}
                  error={errors.city}
                  required={"required"}
                  className={`transition duration-300 shadow-lg ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {errors.city && (
                  <motion.span
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.city}
                  </motion.span>
                )}
              </motion.div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Area
              </Typography>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Inputs
                  label={"Area"}
                  name="area"
                  value={formStateData.area}
                  onChange={handleChange}
                  error={errors.area}
                  required={"required"}
                  className={`transition duration-300 shadow-lg ${
                    errors.area ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-200`}
                />
                {errors.area && (
                  <motion.span
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.area}
                  </motion.span>
                )}
              </motion.div>
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
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="mt-6 w-28 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-lg"
                fullWidth
                type="submit"
              >
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
      </motion.div>
    </div>
  );
}

export default SimpleRegistrationForm;
