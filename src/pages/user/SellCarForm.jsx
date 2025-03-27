/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Button,
  CardBody,
  Typography,
  Dialog,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";

import { useParams } from "react-router";
import { useUserSellFormMutation } from "../../services/userAPI";
import { ToastContainer, toast } from "react-toastify";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";


import {
  useGetOnlyBrandsQuery,
  useGetVariantsQuery,
  useGetSubVariantsQuery,
} from "../../services/brandAPI";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function SellCarForm() {
  const navigate = useNavigate();
  const [UserSellForm] = useUserSellFormMutation();
  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const userid = token ? jwtDecodes?.userId : null;
  // Form state
  const [formData, setFormData] = useState({
    carOwnerName: "",
    brand: "",
    model: "",
    variant: "",
    mobileNo: "",
    regNo: "",
    address1: "",
    address2: "",
    pinCode: "",
    rc: "",
    inspectionDate:"",
    status:true,
    userId:userid
  });


  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];
  // console.log(brands);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);

  const { data: variantData } = useGetVariantsQuery(selectedBrand, {
    skip: !selectedBrand,
  });
  // console.log(variantData);
  const { data: subVariantData } = useGetSubVariantsQuery(
    { brand: selectedBrand, variant: selectedModel },
    {
      skip: !selectedBrand || !selectedModel,
    }
  );

  const [errors, setErrors] = useState({
    mobileNo: "",
     pinCode: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeDate = (e) => {
    const { name,value} = e.target;
    const selDate = dayjs(value).format('YYYY-MM-DDTHH:mm');
    setFormData((prevData) => ({
      ...prevData,
      [name]: selDate,
    }));
  }

  const handleBrandChange = (event, newValue) => {
    const brand = newValue;
    setSelectedBrand(brand);
    setFormData({
      ...formData,
      brand,
      model: "",
      cVariant: "",
    });
  };

  const handleModelChange = (event, newValue) => {
    const model = newValue;
    setSelectedModel(model);
    setFormData({
      ...formData,
      model,
      cVariant: "",
    });
  };

  const handleVariantChange = (event, newValue) => {
    const variant = newValue;
    // console.log(cVariant);
    setFormData({
      ...formData,
      variant,
    });
  };
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

  // Validate mobile number
  const validateMobileNo = (mobileNo) => {
    const mobileNoRegex = /^\d{10}$/;
    return mobileNoRegex.test(mobileNo);
  };

    // Validate pin code
  const validatePinCode = (pinCode) => {
    const pinCodeRegex = /^\d{6}$/;
    return pinCodeRegex.test(pinCode);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

     const mobileNoError = validateMobileNo(formData.mobileNo)
      ? ""
      : "Invalid mobile number";
    const pinCodeError = validatePinCode(formData.pinCode)
      ? ""
      : "Invalid pin code (must be 6 digits)";
    
    setErrors({ mobileNo: mobileNoError, pinCode: pinCodeError });

    if (mobileNoError || pinCodeError) {
      return; 
    }

    try {
      const convertDate = dayjs(formData.inspectionDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      const data = {
        ...formData,
        inspectionDate : convertDate
      }
      const res = await UserSellForm({formData : data , });
      if (res.data.status === "success") {
        toast.success(res.data.message);
        setTimeout(() => { navigate("/sellcarlist");} ,1500)
      } else {
        toast.error("Something is wrong");
      }
    } catch (error) {
       console.log(error);
    }

    // Reset form after submission
    setFormData({
      carOwnerName: "",
      brand: "",
      model: "",
      variant: "",
      mobileNo: "",
      regNo: "",
      address1: "",
      address2: "",
      pinCode: "",
      rc: "",
      date: "",
      inspectionDate: "",
      status:false,
    });
  };

  return (
    <>
     <ToastContainer />
    
      <div className="md:flex justify-center m-6 md:m-0">
        <div className="flex flex-col gap-2 items-center">
          <Typography
            variant="h4"
            color="blue-gray"
            className="flex justify-center mt-2"
          >
            Sell Car
          </Typography>
          <div className="w-full overflow-y-auto style={{ maxHeight: '400px' }}">
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[45rem]"
            >
                <div className="gap-2 mt-1">
              <Input
                label="Car Owner Name"
                name="carOwnerName"
                value={formData.carOwnerName}
                onChange={handleChange}
                required
              />
              </div>
              <div className="w-full mt-3">
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
</div>
              <div className="md:flex gap-2">
                <div className="w-full mt-3">
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={brands}
                    getOptionLabel={(option) => option}
                    onChange={handleBrandChange}
                    renderInput={(params) => (
                      <TextField
                        required
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "40px",
                            padding: "0 14px",
                            paddingBottom: "8px",
                            top: 0,
                          },
                          "& .MuiInputBase-input": {
                            height: "100%",
                            padding: "0",
                          },
                        }}
                        {...params}
                        label="Brands"
                        InputLabelProps={{
                          style: {
                            fontSize: "0.75rem",
                            // paddingTop : '20px',
                            //  background : 'black'
                          }, // Adjust the font size here
                        }}
                      />
                    )}
                  />
                </div>
                <div className="w-full mt-3">
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={modelOptions}
                    getOptionLabel={(option) => option}
                    onChange={handleModelChange}
                    renderInput={(params) => (
                      <TextField
                        required
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "40px",
                            padding: "0 14px",
                            paddingBottom: "8px",
                            top: 0,
                          },
                          "& .MuiInputBase-input": {
                            height: "100%",
                            padding: "0",
                          },
                        }}
                        {...params}
                        label="Model"
                        InputLabelProps={{
                          style: {
                            fontSize: "0.75rem",
                            
                          }, 
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="md:flex gap-2 mt-3">
                <div className="w-full ">
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={variantOptions}
                    getOptionLabel={(option) => option}
                    onChange={handleVariantChange}
                    renderInput={(params) => (
                      <TextField
                        required
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "40px",
                            padding: "0 14px",
                            paddingBottom: "8px",
                            top: 0,
                          },
                          "& .MuiInputBase-input": {
                            height: "100%",
                            padding: "0",
                          },
                        }}
                        {...params}
                        label="Varient"
                        InputLabelProps={{
                          style: {
                            fontSize: "0.75rem",
                            // paddingTop : '20px',
                            //  background : 'black'
                          }, // Adjust the font size here
                        }}
                      />
                    )}
                  />
                </div>

                <Input
                  label="Registration Number"
                  name="regNo"
                  value={formData.regNo}
                  onChange={handleChange}
                  required
                />
              </div>
             
<div className="w-full mt-3">
              <Input
                label="Pincode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
               error={errors.pinCode}
                required
              />
              {errors.pinCode && (
                <Typography color="red">{errors.pinCode}</Typography>
              )}
              </div>

              <div className="w-full mt-3">
              <Input
                label="Address Line 1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                required
              />
                            </div>
                            <div className="w-full mt-3">
              <Input
                label="Address Line 2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
                                          </div>

                                          <div className="w-full mt-3">

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

              <div className="w-full mt-3">

<Input
  label="Inspection Time"
  name="inspectionDate"
  value={formData.inspectionDate}
  onChange={handleChangeDate}
  type="datetime-local"
/>
</div>
                                         
              <Button color="indigo" type="submit" className="mt-2 mb-2">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
