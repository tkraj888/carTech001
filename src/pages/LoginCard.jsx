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
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { motion } from "framer-motion";

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
      const { data, error } = await signIn(formStateData);

      if (data) {
        const jwtDecodes = jwtDecode(data);
        const jwtDecodesJson = JSON.stringify(jwtDecodes);
        localStorage.setItem("userInfo", jwtDecodesJson);

        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
        dispatch(setToken(data));
      } else {
        if (error.status === 401) {
          toast.error(error.data.message);
        } else {
          toast.error("Email and password do not match");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Background Animation with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="flex justify-center items-center h-screen mx-2 p-6"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/premium-photo/modern-showroom-with-rows-new-cars_285145-11127.jpg?uid=R154194869&ga=GA1.1.15909760.1718124178&semt=ais_hybrid")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // Parallax effect
        }}
      >
        <ToastContainer autoClose={2000} />

        {/* Card Animation with Bounce Effect */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 12,
            duration: 0.5,
          }}
        >
          <Card className="w-96 bg-white shadow-2xl border rounded-2xl p-6">
            <div className="items-center mb-8">
              <Link to={"/"}>{/* Logo */}</Link>
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
              <CardBody className="flex flex-col gap-6">
                {/* Email Input with Glow and Slide-Up on Focus */}
                <motion.div
                  whileFocus={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    label="Email"
                    name="username"
                    type="email"
                    value={formStateData.username}
                    onChange={handleChange}
                    
                  />
                </motion.div>

                {/* Password Input with Glow and Slide-Up on Focus */}
                <motion.div
                  whileFocus={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formStateData.password}
                    onChange={handleChange}
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
                </motion.div>
              </CardBody>

              <CardFooter className="pt-0">
                {/* Button Animation with Ripple Effect */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#3b82f6", // Blue color transition
                    transition: { duration: 0.3 },
                  }}
                >
                  <Button
                    variant="gradient"
                    fullWidth
                    type="submit"
                    className="hover:bg-blue-600"
                  >
                    Sign In
                  </Button>
                </motion.div>

                {/* Sign Up Link with Fade Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center justify-center mt-4"
                >
                  <Typography variant="small">
                    Don&apos;t have an account?{" "}
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
                </motion.div>

                {/* Forget Password with Slide-Up Effect */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-center mt-2"
                >
                  <Link to="/forgetPassword">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="ml-1 font-bold"
                    >
                      Forget Password?
                    </Typography>
                  </Link>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
