/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { useGetUserRequestDataByIdQuery, useUserSaleReqFormEditMutation } from "../../services/userAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalerUserSaleReqEdit = () => {
  const { userFormId } = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    carOwnerName: "",
    brand: "",
    model: "",
    variant: "",
    regNo: "",
    address1: "",
    address2: "",
    pinCode: "",
    rc: "",
    date: "",
    datetime: "",
    mobileNo: ""
  });

  // Fetch data from API using userFormId
  const { data, isLoading, isError, error } = useGetUserRequestDataByIdQuery(userFormId);
  const [userReqEdit, { isLoading: isEditing }] = useUserSaleReqFormEditMutation();
  const navigate = useNavigate();

  // Populate formData with API response when data is available
  useEffect(() => {
    if (data && data.object) {
      const fetchedData = data.object;

      // Ensure the inspectionDate is in the correct format for datetime-local
      const inspectionDate = fetchedData.inspectionDate
        ? fetchedData.inspectionDate.split(".")[0] // Remove milliseconds if present
        : "";

      setFormData({
        carOwnerName: fetchedData.carOwnerName || "",
        brand: fetchedData.brand || "",
        model: fetchedData.model || "",
        variant: fetchedData.variant || "",
        regNo: fetchedData.regNo || "",
        address1: fetchedData.address1 || "",
        address2: fetchedData.address2 || "",
        pinCode: fetchedData.pinCode || "",
        rc: fetchedData.rc || "",
        date: inspectionDate ? inspectionDate.split("T")[0] : "", // Date part
        datetime: inspectionDate, // Full datetime for datetime-local input
        mobileNo: fetchedData.mobileNo || ""
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNo") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prevVal) => ({
          ...prevVal,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevVal) => ({
        ...prevVal,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value ? `${name} is required` : "",
    }));
  };

  const validateForm = () => {
    const requiredFields = ["regNo", "address1", "pinCode", "rc"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields.", {
        autoClose: 2000, // 2 seconds
      });
      return;
    }

    const updatedData = {
      userFormId,
      carOwnerName: formData.carOwnerName,
      brand: formData.brand,
      model: formData.model,
      variant: formData.variant,
      regNo: formData.regNo,
      address1: formData.address1,
      address2: formData.address2,
      pinCode: formData.pinCode,
      rc: formData.rc,
      inspectionDate: formData.datetime, // Full datetime value
      mobileNo: formData.mobileNo,
      // Add any other fields you want to send
    };

    try {
      const res = await userReqEdit({ userFormId, updatedData }).unwrap();

      if (res.status === 'success') {
        toast.success("Changes successful", {
          autoClose: 2000, // 2 seconds
        });
        setTimeout(() => {
          navigate(-1); // Navigate back after 1 second
        }, 1000);
      } else {
        toast.error("Failed to update inspector", {
          autoClose: 2000, // 2 seconds
        });
      }
    } catch (error) {
      toast.error("Error updating inspector", {
        autoClose: 2000, // 2 seconds
      });
      // Optionally log the error
      console.error("Error:", error);
    }
  };

  if (isLoading || isEditing) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 flex justify-center w-full md:w-[50%] mt-10">
      <form className="w-full border border-gray-500 px-2 py-2 rounded-md mt-2 mb-2" onSubmit={handleSubmit}>
        <div className="mt-5">
          <p className="text-3xl font-semibold">Edit Sell Car Form</p>
        </div>

        <div className="mt-5">
          <Input
            label="Car Owner Name"
            name="carOwnerName"
            value={formData.carOwnerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Uncomment and use if needed */}
        {/* <div className="mt-5">
          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <Input
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <Input
            label="Variant"
            name="variant"
            value={formData.variant}
            onChange={handleChange}
          />
        </div> */}

        {/* <div className="mt-5">
          <Input
            label="Registration Number"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            required
          />
        </div> */}

        <div className="mt-5">
          <Input
            label="Address Line 1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-5">
          <Input
            label="Address Line 2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <Input
            label="Pincode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-5">
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-5">
          <Input
            label="Inspection Time"
            name="datetime"
            type="datetime-local"
            value={formData.datetime}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <Input
            label="Mobile Number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5 ml-2 space-x-4">
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

export default SalerUserSaleReqEdit;
