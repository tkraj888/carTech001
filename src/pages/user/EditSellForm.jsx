/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
// import { useNavigate } from "react-router-dom";
import {
  useGetOnlyBrandsQuery,
  useGetVariantsQuery,
  useGetSubVariantsQuery,
} from "../../services/brandAPI";
// import { useUserSellFormMutation, useUserSellByIdQuery } from "../../services/userAPI";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserRequestDataByIdQuery, useUserSaleReqFormEditMutation } from "../../services/userAPI";
import { FiLoader } from 'react-icons/fi'; 
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { toast, ToastContainer } from "react-toastify";
dayjs.extend(duration);

const EditSellForm = () => {
  const { userFormId } = useParams();
//   const userId = userid;

  // Form state
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
    inspectionDate: "",
  });

  const { data, isLoading, isError, error } = useGetUserRequestDataByIdQuery( userFormId );
  const navigate = useNavigate();
  const [UserSaleReqFormEdit] = useUserSaleReqFormEditMutation();
  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);

  const { data: variantData } = useGetVariantsQuery(selectedBrand, {
    skip: !selectedBrand,
  });
  const { data: subVariantData } = useGetSubVariantsQuery(
    { brand: selectedBrand, variant: selectedModel },
    {
      skip: !selectedBrand || !selectedModel,
    }
  );

  useEffect(() => {
    if (data && data.object) {
      const { object: response } = data;
      setFormData({
        carOwnerName: response.carOwnerName || "",
        brand: response.brand || "",
        model: response.model || "",
        variant: response.variant || "",
        regNo: response.regNo || "",
        address1: response.address1 || "",
        address2: response.address2 || "",
        pinCode: response.pinCode || "",
        rc: response.rc || "",
        inspectionDate: dayjs( response.inspectionDate ).format('YYYY-MM-DDTHH:mm') || "",
      });
      setSelectedBrand(response.brand);
      setSelectedModel(response.model);
    }
  }, [data]);

  useEffect(() => {
    if (variantData) {
      const models = [...new Set(variantData.list.map((item) => item.variant))];
      setModelOptions(models);
    }
  }, [variantData]);

  useEffect(() => {
    if (subVariantData) {
      const variants = [
        ...new Set(subVariantData.list.map((item) => item.subVariant)),
      ];
      setVariantOptions(variants);
    }
  }, [subVariantData]);

  const handleBrandChange = (event, newValue) => {
    const brand = newValue;
    setSelectedBrand(brand);
    setFormData({
      ...formData,
      brand,
      model: "",
      variant: "",
    });
  };

  const handleModelChange = (event, newValue) => {
    const model = newValue;
    setSelectedModel(model);
    setFormData({
      ...formData,
      model,
      variant: "",
    });
  };

  const handleVariantChange = (event, newValue) => {
    const variant = newValue;
    setFormData({
      ...formData,
      variant,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ["carOwnerName", "brand", "model", "regNo", "address1", "pinCode", "rc"];
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
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const convertDate = dayjs(formData.inspectionDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      const data = {
        ...formData,
        inspectionDate : convertDate
      }
      const res = await UserSaleReqFormEdit( { updatedData: data,userFormId} );
      console.log(res?.data)
      if (res?.data?.status === " success") {
        toast.success(res.data.message);
        setTimeout(()=>{navigate(-1);},[1000])
         // Go back after successful submission
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
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

        <div className="mt-5">
          <Autocomplete
            id="brand-select"
            options={brands}
            value={selectedBrand}
            onChange={handleBrandChange}
            renderInput={(params) => (
              <TextField {...params} label="Brand" required />
            )}
          />
        </div>

        <div className="mt-5">
          <Autocomplete
            id="model-select"
            options={modelOptions}
            value={selectedModel}
            onChange={handleModelChange}
            renderInput={(params) => (
              <TextField {...params} label="Model" required />
            )}
          />
        </div>

        <div className="mt-5">
          <Autocomplete
            id="variant-select"
            options={variantOptions}
            value={formData.variant}
            onChange={handleVariantChange}
            renderInput={(params) => (
              <TextField {...params} label="Variant" required />
            )}
          />
        </div>

        <div className="mt-5">
          <Input
            label="Registration Number"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            required
          />
        </div>

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
          <Select
            label="RC"
            name="rc"
            value={formData.rc}
            onChange={(e) => setFormData({ ...formData, rc: e })}
            required
          >
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </div>

        {/* <div className="mt-5">
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div> */}

        <div className="mt-5">
          <Input
            label="Inspection Time"
            name="inspectionDate"
            type="datetime-local"
            value={formData.inspectionDate}
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

export default EditSellForm;
