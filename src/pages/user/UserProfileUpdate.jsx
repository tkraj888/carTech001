/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom";
import Inputs from "../../forms/Inputs";
import {
  useUserupdateMutation,
  useGetUserByIdQuery,
} from "../../services/userAPI";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import {
  FiLoader,
  FiUpload,
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const EditField = ({ label, name, value, onChange, icon }) => (
  <div className="w-full">
    <label htmlFor={name} className="block text-sm text-profile-text mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-profile-purple">
        {icon}
      </div>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-4 bg-white rounded-lg shadow-sm border border-gray-200 focus:border-profile-purple focus:ring-1 focus:ring-profile-purple outline-none"
      />
    </div>
  </div>
);

EditField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

const EditProfile = () => { 
  const { userProfileId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetUserByIdQuery(userProfileId);
  const [Userupdate] = useUserupdateMutation();

  const [inputField, setInputField] = useState({
    address: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
  });

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (data) {
      setInputField({
        userProfileId: data.id || 0,
        address: data.address || "",
        city: data.city || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        mobileNo: data.mobile_no || "",
      });
    }
  }, [data]);

  const onChangeFormhandler = (e) => {
    const { name, value } = e.target;
    setInputField((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const userupdate = {
      id: userProfileId,
      mobile_no: inputField.mobileNo,
      address: inputField.address,
      email: inputField.email,
      city: inputField.city,
      firstName: inputField.firstName,
      lastName: inputField.lastName,
    };

    try {
      const res = await Userupdate({ userupdate, userProfileId }).unwrap();

      if (res.code === "Successful") {
        toast.success("Changes successful", {});

        if (userupdate.email !== data.email) {
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }
      } else {
        toast.error("Failed to update User", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Error updating User", {
        autoClose: 2000,
      });
      console.log("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 flex justify-center w-full md:w-[50%] mt-10">
      <form className="w-full border border-gray-500 px-2 py-2 rounded-md mt-2 mb-2" onSubmit={onSubmitHandler}>
        <div className="mt-3">
          <p className="text-3xl font-semibold">Edit User Details</p>
        </div>
        <div className="mt-5">
          <Inputs
            label={"First Name"}
            onChange={onChangeFormhandler}
            value={inputField.firstName}
            type={"text"}
            name={"firstName"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Last Name"}
            onChange={onChangeFormhandler}
            value={inputField.lastName}
            type={"text"}
            name={"lastName"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Email"}
            onChange={onChangeFormhandler}
            value={inputField.email}
            type={"email"}
            name={"email"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"MobileNo"}
            onChange={onChangeFormhandler}
            value={inputField.mobileNo}
            type={"number"}
            name={"mobileNo"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"Address"}
            onChange={onChangeFormhandler}
            value={inputField.address}
            type={"text"}
            name={"address"}
            required
          />
        </div>
        <div className="mt-5">
          <Inputs
            label={"City"}
            onChange={onChangeFormhandler}
            value={inputField.city}
            type={"text"}
            name={"city"}
            required
          />
        </div>
        <div className="mt-5 ml-2">
          <Button
            type="submit"
            className="py-2 px-2 bg-indigo-600 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProfile; 