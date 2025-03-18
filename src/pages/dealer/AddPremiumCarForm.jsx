/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Inputs from "../../forms/Inputs";
import { Textarea, Input } from "@material-tailwind/react";
import { useCarRegisterPremiumMutation } from "../../services/carAPI";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetOnlyBrandsQuery,
  useGetVariantsQuery,
  useGetSubVariantsQuery,
} from "../../services/brandAPI";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const cityOptions = {
  Pune: ["MH-12"],
  PimpriChichwad: ["MH-14"],
  Mumbai: ["MH-01", "MH-02", "MH-03", "MH-47"],
  Amravati: ["MH-27"],
  Yavatmal: ["MH-29"],
  Chandrapur: ["MH-34"],
  Kolhapur: ["MH-09"],
  Solapur: ["MH-13", "MH-45"],
  Nanded: ["MH-26"],
  Latur: ["MH-24"],
  Satara: ["MH-11"],
  Sangli: ["MH-10"],
  Nashik: ["MH-15", "MH-51"],
  Beed: ["MH-32"],
  Jalna: ["MH-21"],
  Nagpur: ["MH-31", "MH-49  "],
  Gondia: ["MH-35"],
  Gadchiroli: ["MH-33"],
  Bhandara: ["MH-36"],
  Washim: ["MH-37"],
  Jalgaon: ["MH-19"],
  Akola: ["MH-30"],
  Buldhana: ["MH-28"],
  Dhule: ["MH-18"],
  Nandurbar: ["MH-39"],
  Thane: ["MH-04", "MH-05", "MH-48"],
  Raigad: ["MH-06"],
  Ratnagiri: ["MH-08"],
  Sindhudurg: ["MH-07"],
  Ahmednagar: ["MH-16"],
  Dharashiv: ["MH-25"],
  SambhajiNagar: ["MH-20"],
};

export default function AddPremiumCarForm() {
  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];
  // console.log(brands);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

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
  const { carType } = useParams();
  const [carRegister] = useCarRegisterPremiumMutation({carType});
  //  const [mult, setMult] = React.useState([]);
  const [formData, setFormData] = useState({
    //features
    acFeature: false,
    musicFeature: false,
    powerWindowFeature: false,
    rearParkingCameraFeature: false,
    buttonStart: false,
    abs: false,
    sunroof: false,
    airbag: false,
    childSafetyLocks: false,

    // fields
    brand: "",
    bodyType: "",
    price: "",
    model: "",
    year: "",
    transmission: "",
    color: "",
    city: "",
    fuelType: "",
    kmDriven: "",
    carInsurance: "",
    registration: "",
    description: "",
    title: "",
    area: "",
    carStatus: "Active",
    ownerSerial: "",
    dealer_id: "",
    cVariant: "",
    insurancedate: "",
    insuranceType: "",
    carInsuranceType: "",
  });
  const [error, setError] = useState(false);
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const date = new Date(); // Create a new Date object with the current date
  const year = date.getFullYear(); // Get the year (e.g., 2024)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so add 1), pad with leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Get the day of the month, pad with leading zero if needed

  const formattedDate = `${year}-${month}-${day}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate price before proceeding
    if (formData.price < 1500000) {
      setError(true);
      toast.error("Price must be greater than 1,500,000");
      return; // Stop submission if validation fails
    } else {
      setError(false); // Reset error if the validation passes
    }
    // console.log(formData);
    // Prepare the form data to send to the backend
    const data = {
      buttonStart: formData.buttonStart,

      abs: formData.abs,

      sunroof: formData.sunroof,

      airbag: formData.airbag,

      childSafetyLocks: formData.childSafetyLocks,

      acFeature: formData.acFeature,

      musicFeature: formData.musicFeature,

      area: formData.area,

      brand: formData.brand,

      carInsurance: formData.carInsurance,

      carStatus: "ACTIVE",

      color: formData.color,

      description: formData.description,

      fuelType: formData.fuelType,

      kmDriven: formData.kmDriven,

      model: formData.model,

      ownerSerial: formData.ownerSerial,

      powerWindowFeature: formData.powerWindowFeature,

      city: formData.city,

      price: formData.price,

      rearParkingCameraFeature: formData.rearParkingCameraFeature,

      registration: formData.registration,

      transmission: formData.transmission,

      title: formData.title,

      variant: formData.cVariant,

      carInsuranceDate: formData.insurancedate,

      year: formData.year,

      dealer_id: id,

      date: formattedDate,
      carInsuranceType: formData.carInsuranceType,
    };
    // console.log(data);
    const res = await carRegister(data, { carType: "premium" });
    // console.log(res);
    if (res?.data?.status === "success") {
      toast.success("Car Added");
      setTimeout(() => {
        navigate(`/dealer/${id}/uploadimage/${res?.data?.message}`); // Corrected URL string with backticks (`) for interpolation
      }, 2000);
    }
  };

  const handleBrandChange = (event, newValue) => {
    const brand = newValue;
    // console.log(brand);
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
    const cVariant = newValue;
    // console.log(cVariant);
    setFormData({
      ...formData,
      cVariant,
    });
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setFormData({
      ...formData,
      city: selectedCity,
      registration: "", // Reset registration when city changes
    });
  };

  const handleChangeType = (event) => {
    const value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      carInsuranceType: value,
    }));
  };

  // Car Insurance ValidDate
  const handleChange = (event) => {
    const value = event.target.value === "true";
    setFormData((prevFormData) => ({
      ...prevFormData,
      carInsurance: value,
    }));
    setShowCalendar(value);
  };
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      price: value,
    });

    // Validate price
    if (value && value < 1500000) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      insurancedate: value,
    }));
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

  return (
    <>
      <ToastContainer />
      <div className="md:flex justify-center m-6 md:m-0">
        <div>
          <form onSubmit={handleSubmit} className="w-full md:w-[45rem]">
            <div className="flex justify-center">
              <p className="text-3xl font-semibold m-4">Add Premium Car</p>
            </div>
            {/* first part */}
            <div className="md:flex gap-2">
              <div className="mt-5 w-full">
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

              <div className="mt-5 w-full">
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
            </div>

            {/* second part */}
            <div className="md:flex">
              <div className="mt-5 w-full">
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
                      label="SubVarient"
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

              <div className="mt-5 md:ml-2 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  name="transmission"
                  value={formData.transmission}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      transmission: event.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Transmission
                  </option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
            <div className="md:flex">
              <div className="mt-5 w-full">
                <Input
                  required
                  label="Price"
                  type="number"
                  name="price"
                  value={formData.price}
                  error={error} // Highlight input with error style
                  onChange={handlePriceChange}
                  helperText={
                    error ? "Value should be greater than 1,500,000" : ""
                  }
                />
              </div>

              <div className="mt-5 md:ml-2 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  label={"year"}
                  type={"number"}
                  name={"year"}
                  value={formData.year}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      year: event.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Year
                  </option>
                  <option>2015</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                </select>
              </div>
            </div>

            {/* fourth part */}
            <div className="md:flex">
              <div className="mt-5 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  label={"Color"}
                  type={"text"}
                  name={"color"}
                  value={formData.color}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      color: event.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Color
                  </option>
                  <option>Red</option>
                  <option>Blue</option>
                  <option>Yellow</option>
                  <option>Pink</option>
                  <option>Purple</option>
                  <option>White</option>
                  <option>Black</option>
                  <option>Orange</option>
                  <option>Green</option>
                  <option>Brown</option>
                  <option>Gold</option>
                  <option>Aqua</option>
                </select>
              </div>

              <div className="mt-5 md:ml-2 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  name="ownerSerial"
                  value={formData.ownerSerial}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      ownerSerial: event.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select Owner Serial
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            {/* fifth part */}
            <div className="md:flex">
              <div className="mt-5 w-full">
                <Inputs
                  required
                  label={"Area"}
                  type={"text"}
                  name={"area"}
                  value={formData.area}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      area: event.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-5 md:ml-2 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  name="carInsurance"
                  value={formData.carInsurance}
                  onChange={handleChange}
                >
                  <option value="">Car Insurance</option>
                  <option value="true">Yes</option>

                  <option value="false">No</option>
                </select>
                {showCalendar && (
                  <>
                    <div className="mt-3">
                      <label
                        className="block text-gray-700 text-sm font-bold "
                        htmlFor="date"
                      >
                        Select Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={formData.insurancedate}
                        onChange={handleDateChange}
                        className="w-full border-2 border-gray-400 p-2 rounded-md"
                      />
                    </div>
                    <label
                      className="block text-gray-700 text-sm font-bold mt-2"
                      htmlFor="date"
                    >
                      Insurance Type
                    </label>
                    <select
                      required
                      className="w-full border-2 border-gray-400 p-2 rounded-md"
                      name="carInsurance"
                      value={formData.carInsuranceType}
                      onChange={handleChangeType}
                    >
                      <option value="" disabled>
                        Insurance Type
                      </option>
                      <option value="Comprehensive">Comprehensive</option>
                      <option value="Zero Dept">Zero Depreciation </option>
                      <option value="Third Party">Third Party</option>
                    </select>
                  </>
                )}
              </div>
            </div>

            {/* sixth part */}
            <div className="md:flex">
              <div className="mt-5 w-full">
                <Input
                  required
                  label="Km Driven"
                  type="number"
                  name="kmDriven"
                  value={formData.kmDriven}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      kmDriven: event.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-5 md:ml-2 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      fuelType: event.target.value,
                    });
                  }}
                >
                  <option value="" disabled>
                    Fuel Type
                  </option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>CNG</option>
                  <option>Petrol+CNG</option>
                </select>
              </div>
            </div>

            {/* eight part */}

            <div className="md:flex">
              <div className="mt-5 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                >
                  <option value="">Select City</option>
                  {Object.keys(cityOptions).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 md:ml-2 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  label="Registration"
                  name="registration"
                  value={formData.registration}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      registration: event.target.value,
                    })
                  }
                  disabled={!formData.city}
                >
                  <option value="">Select Registration</option>
                  {formData.city &&
                    cityOptions[formData.city]?.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* ninth part */}
            <div className="md:flex">
              <div className="mt-5 ml-5">
                <input
                  label="Music Feature"
                  type="checkbox"
                  name="musicFeature"
                  // value={formData.musicFeature}
                  checked={formData.musicFeature}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      musicFeature: event.target.checked,
                    })
                  }
                />{" "}
                Music
              </div>

              <div className="mt-5 ml-5">
                <input
                  label="Power Window Feature"
                  type="checkbox"
                  name="powerWindowFeature"
                  // value={formData.powerWindowFeature}
                  checked={formData.powerWindowFeature}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      powerWindowFeature: event.target.checked,
                    })
                  }
                />{" "}
                Power Windows
              </div>

              <div className="mt-5 ml-5">
                <input
                  label="Ac Feature"
                  type="checkbox"
                  name="acFeature"
                  // value={formData.acFeature}
                  checked={formData.acFeature}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      acFeature: event.target.checked,
                    })
                  }
                />{" "}
                Air Conditioning
              </div>

              <div className="mt-5 ml-5">
                <input
                  label="Rear Parking Camera Feature"
                  type="checkbox"
                  name="rearParkingCameraFeature"
                  // value={formData.rearParkingCameraFeature}
                  checked={formData.rearParkingCameraFeature}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      rearParkingCameraFeature: event.target.checked,
                    })
                  }
                />{" "}
                Rear Parking Camera
              </div>
            </div>

            {/* tenth part */}
            <div className="md:flex">
              <div className="mt-5 ml-5">
                <input
                  label="Button Start"
                  type="checkbox"
                  name="buttonStart"
                  // value={formData.musicFeature}
                  checked={formData.buttonStart}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      buttonStart: event.target.checked,
                    })
                  }
                />{" "}
                Button Start
              </div>

              <div className="mt-5 ml-5">
                <input
                  label="ABS"
                  type="checkbox"
                  name="abs"
                  // value={formData.powerWindowFeature}
                  checked={formData.abs}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      abs: event.target.checked,
                    })
                  }
                />{" "}
                ABS
              </div>

              <div className="mt-5 ml-5">
                <input
                  label="Sunroof"
                  type="checkbox"
                  name="sunroof"
                  // value={formData.acFeature}
                  checked={formData.sunroof}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      sunroof: event.target.checked,
                    })
                  }
                />{" "}
                Sunroof
              </div>

              <div className="mt-5 ml-5">
                <input
                  label="Child Safety Locks"
                  type="checkbox"
                  name="childSafetyLocks"
                  // value={formData.rearParkingCameraFeature}
                  checked={formData.childSafetyLocks}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      childSafetyLocks: event.target.checked,
                    })
                  }
                />{" "}
                Child Safety Locks
              </div>
              <div className="mt-5 ml-5">
                <input
                  label="AirBag"
                  type="checkbox"
                  name="airbag"
                  // value={formData.musicFeature}
                  checked={formData.airbag}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      airbag: event.target.checked,
                    })
                  }
                />{" "}
                AirBag
              </div>
            </div>

            {/* tenth part */}
            <div className="mt-5 mb-2">
              <h4>Title</h4>
              <div className="formrow">
                <Input
                  required
                  className="form-control"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      title: event.target.value,
                    });
                  }}
                ></Input>
              </div>
            </div>
            {/* eleventh part */}

            <div className="mt-5">
              <h4>Vehicle Description</h4>
              <div className="formrow">
                <Textarea
                  required
                  className="form-control"
                  name="description"
                  placeholder="Vehicle Description"
                  value={formData.description}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    });
                  }}
                ></Textarea>
              </div>
            </div>
            {/* twelth part */}

            <button
              type="submit"
              className="p-3 mt-3 bg-indigo-400 rounded-md w-28 text-white"
              value="Add  Car"
            >
              {" "}
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
