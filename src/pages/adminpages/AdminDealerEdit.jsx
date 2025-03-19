import { useParams } from "react-router-dom";
import {
  useGetDealerQuery,
  useGetEditDealerMutation,
} from "../../services/dealerAPI";
import Inputs from "../../forms/Inputs";
import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const AdminDealerEdit = () => {
  const { userid, id } = useParams();
  const navigate1 = useNavigate();
  const { data: dealerID } = useGetDealerQuery({ id });
  const [getEditDealer] = useGetEditDealerMutation();
  const [inputField, setInputField] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    area: "",
    shopName: "",
    userid,
  });

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

 

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  const onChangeFormhandler = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNo") {
      if (/^\d{0,10}$/.test(value)) {
        setInputField((preVal) => ({
          ...preVal,
          [name]: value,
        }));
      }
    }else{
    setInputField((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value ? `${name} is required` : "",
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(inputField).forEach((field) => {
      if (!inputField[field]) {
        newErrors[field] = `${field} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const res = await getEditDealer({ id: userid, inputField });
      if (res.data.status === 'success') {
        toast.success("Successfully Edited");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (dealerID) {
      const { dealerDto } = dealerID;
      setInputField({
        firstName: dealerDto?.firstName || "",
        lastName: dealerDto?.lastName || "",
        email: dealerDto?.email || "",
        mobileNo: dealerDto?.mobileNo || "",
        address: dealerDto?.address || "",
        city: dealerDto?.city || "",
        area: dealerDto?.area || "",
        shopName: dealerDto?.shopName || "",
        userid,
      });
    }
  }, [dealerID, userid]);

  return (
    <>
    <Typography className=" lg:mt-5 ml-4  lg:ml-16 hidden xl:block">
      <div className="flex">
    <Link to={"/"}>
            <p className="hover:text-blue-900"> Home </p> 
            </Link>
             /
             {userRole === "SALESPERSON" ? (<Link to={"/sales/salesDealers"}>
              <p className="hover:text-blue-900">Dealers </p>
              </Link>):(<Link to={"/admin"}>
              <p className="hover:text-blue-900">Dealers </p>
              </Link>)}
            /
      
            <p>Edit</p>

            </div>
    </Typography>
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 flex justify-center w-full md:w-[50%] mt-10">
    
      <form className="w-full border border-gray-500 px-2 py-2 rounded-md mt-2 mb-2" onSubmit={onSubmitHandler}>
        <div className="mt-3">
          <p className="text-3xl font-semibold">Edit Dealer Details</p>
        </div>
        <ToastContainer />
        <div className="mt-5">
          <Inputs
            required
            label={"First Name"}
            onChange={onChangeFormhandler}
            value={inputField.firstName}
            defaultValue={dealerID?.dealerDto?.firstName || ""}
            type={"text"}
            name={"firstName"}
            error={errors.firstName}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Last Name"}
            onChange={onChangeFormhandler}
            value={inputField.lastName}
            defaultValue={dealerID?.dealerDto?.lastName || ""}
            type={"text"}
            name={"lastName"}
            error={errors.lastName}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Email"}
            onChange={onChangeFormhandler}
            value={inputField.email}
            defaultValue={dealerID?.dealerDto?.email || ""}
            type={"email"}
            name={"email"}
            error={errors.email}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Mobile No"}
            onChange={onChangeFormhandler}
            value={inputField.mobileNo}
            defaultValue={dealerID?.dealerDto?.mobileNo || ""}
            type={"text"}
            name={"mobileNo"}
            error={errors.mobileNo}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Shop Name"}
            onChange={onChangeFormhandler}
            value={inputField.shopName}
            defaultValue={dealerID?.dealerDto?.shopName || ""}
            type={"text"}
            name={"shopName"}
            error={errors.shopName}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Address"}
            onChange={onChangeFormhandler}
            value={inputField.address}
            defaultValue={dealerID?.dealerDto?.address || ""}
            type={"text"}
            name={"address"}
            error={errors.address}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"City"}
            onChange={onChangeFormhandler}
            value={inputField.city}
            defaultValue={dealerID?.dealerDto?.city || ""}
            type={"text"}
            name={"city"}
            error={errors.city}
          />
        </div>
        <div className="mt-5">
          <Inputs
            required
            label={"Area"}
            onChange={onChangeFormhandler}
            value={inputField.area}
            defaultValue={dealerID?.dealerDto?.area || ""}
            type={"text"}
            name={"area"}
            error={errors.area}
          />
        </div>
        <div className="mt-5 ml-2 space-x-4">
          <Button
            type="submit"
            className="py-2 px-2 bg-indigo-600 text-white"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate1(-1)}
            type="button"
            className="py-2 px-2 bg-gray-800 text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AdminDealerEdit;
