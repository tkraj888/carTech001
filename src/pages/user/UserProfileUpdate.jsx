/* eslint-disable no-unused-vars */

import { useParams } from "react-router-dom";
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

  const { data, isLoading, isError, error } =
    useGetUserByIdQuery(userProfileId);
  const [Userupdate] = useUserupdateMutation();

  // State for the form fields (note: mobileNo key used to match API)
  const [inputField, setInputField] = useState({
    address: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
  });

  // Image state and file ref for profile picture change
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
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
        toast.success("Changes successful");
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
        toast.error("Failed to update User", { autoClose: 2000 });
      }
    } catch (err) {
      toast.error("Error updating User", { autoClose: 2000 });
      console.log("Error:", err);
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
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 flex justify-center w-full md:w-[60%] mt-10">
      <div className="w-full">
        <ToastContainer />
        {/* Header */}
        <div className="bg-gradient-profile rounded-2xl p-8 mb-8">
          <h1 className="text-2xl font-semibold text-profile-text">
            Edit Profile
          </h1>
          <p className="text-profile-label">Update your personal information</p>
        </div>

        {/* Profile image and change photo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 relative">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-profile-purple text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <FiUpload size={16} />
              <span>Change Photo</span>
            </button>
          </div>
        </div>

        {/* Edit fields grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditField
            label="First Name"
            name="firstName"
            value={inputField.firstName}
            onChange={handleInputChange}
            icon={<FiUser />}
          />
          <EditField
            label="Last Name"
            name="lastName"
            value={inputField.lastName}
            onChange={handleInputChange}
            icon={<FiUser />}
          />
          <EditField
            label="Email"
            name="email"
            value={inputField.email}
            onChange={handleInputChange}
            icon={<FiMail />}
          />
          <EditField
            label="City"
            name="city"
            value={inputField.city}
            onChange={handleInputChange}
            icon={<FiMapPin />}
          />
          <EditField
            label="Mobile Number"
            name="mobileNo"
            value={inputField.mobileNo}
            onChange={handleInputChange}
            icon={<FiPhone />}
          />
          {/* Postal Code field removed as per your requirements */}
        </div>

        {/* Address field */}
        <div className="mt-6">
          <EditField
            label="Address"
            name="address"
            value={inputField.address}
            onChange={handleInputChange}
            icon={<FiMapPin />}
          />
        </div>

        {/* Action buttons */}
        <div className="mt-8 mb-6 flex justify-center md:justify-end gap-4">
          <button
            onClick={() =>
              setTimeout(() => {
                navigate(-1);
              }, 0)
            }
            className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-profile-purple text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
