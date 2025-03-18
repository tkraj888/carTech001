import { useState, useEffect } from "react";
import Inputs from "../../forms/Inputs";
import { Textarea, Input } from "@material-tailwind/react";
import { useCarRegisterMutation } from "../../services/carAPI";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import {useGetOnlyBrandsQuery,useGetVariantsQuery, useGetSubVariantsQuery} from "../../services/brandAPI";

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

export default function AddDealerCar() {
  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [modelOptions, setModelOptions] = useState([]);
  const [variantOptions, setVariantOptions] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const { data: variantData } = useGetVariantsQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  const { data: subVariantData } = useGetSubVariantsQuery(
    { brand: selectedBrand, variant: selectedModel },
    {
      skip: !selectedBrand || !selectedModel,
    }
  );

  const [carRegister] = useCarRegisterMutation();
  const [formData, setFormData] = useState({
    //features
    acFeature: false,
    musicFeature: false,
    powerWindowFeature: false,
    rearParkingCameraFeature: false,

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
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      carStatus: "ACTIVE",
      dealer_id: id,
      date: formattedDate,
    };

    const res = await carRegister(data);
    if (res?.data?.status === "success") {
      toast.success("Car Added");
      setTimeout(() => {
        navigate(`/dealer/${id}/uploadimage`);
      }, 2000);
    }
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    setFormData({
      ...formData,
      brand,
      model: '',
      cVariant: '',
    });
  };

  const handleModelChange = (event) => {
    const model = event.target.value;
    setSelectedModel(model);
    setFormData({
      ...formData,
      model,
      cVariant: '',
    });
  };

  const handleVariantChange = (event) => {
    const cVariant = event.target.value;
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
      registration: "",
    });
  };

  const handleChange = (event) => {
    const value = event.target.value === "true";
    setFormData((prevFormData) => ({
      ...prevFormData,
      carInsurance: value,
    }));
    setShowCalendar(value);
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
      const models = variantData.list.map((item) => item.variant) || [];
      setModelOptions(models);
    }
  }, [variantData]);

  useEffect(() => {
    if (subVariantData) {
      const variants = subVariantData.list.map((item) => item.subVariant) || [];
      setVariantOptions(variants);
    }
  }, [subVariantData]);

  return (
    <>
      <ToastContainer />
      <div className="md:flex justify-center m-6 md:m-0">
        <div>
          <form onSubmit={handleSubmit} className="w-full md:w-[50rem]">
            <div className="flex justify-center">
              <p className="text-3xl font-semibold m-4">Add Dealer Car</p>
            </div>
            <div className="md:flex gap-2">
            <div className="mt-5 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  value={selectedBrand}
                  onChange={handleBrandChange}
                >
                  <option value="">Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 w-full">
                <select
                  required
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  value={formData.model}
                  onChange={handleModelChange}
                  disabled={!selectedBrand}
                >
                  <option value="">Models</option>
                  {modelOptions.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:flex">
            <div className="mt-5 w-full">
                <select
                  className="w-full border-2 border-gray-400 p-2 rounded-md"
                  name="cVariant"
                  value={formData.cVariant}
                  onChange={handleVariantChange}
                  disabled={!modelOptions.length}
                >
                  <option value="">Car Variant</option>
                  {variantOptions.map((cVariant) => (
                    <option key={cVariant} value={cVariant}>
                      {cVariant}
                    </option>
                  ))}
                </select>
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
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
            <div className="md:flex">
              <div className="mt-5 w-full">
                <Input
                  label="Price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      price: event.target.value,
                    })
                  }
                />
              </div>

              <div className="mt-5 md:ml-2 w-full">
                <select
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
                  <option>Year</option>
                  {[...Array(new Date().getFullYear() - 2004)].map((_, index) => {
                    const year = 2005 + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="md:flex">
              <div className="mt-5 w-full">
                <select
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
                  <option>Color</option>
                  {[
                    "Red",
                    "Blue",
                    "Yellow",
                    "Pink",
                    "Purple",
                    "White",
                    "Black",
                    "Orange",
                    "Green",
                    "Brown",
                    "Gold",
                    "Aqua",
                  ].map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 md:ml-2 w-full">
                <select
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
                  {["1st", "2nd", "3rd", "4th", "5th"].map((serial) => (
                    <option key={serial} value={serial}>
                      {serial}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:flex">
            <div className="mt-5 w-full">
              <Inputs
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
                <div className="mt-3">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
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
              )}
            </div>
            </div>

            <div className="md:flex">
            <div className="mt-5 w-full">
              <Input
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
                <option>Fuel Type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>CNG</option>
                <option>Petrol+CNG</option>
              </select>
            </div>
            </div>

            <div className="md:flex">
            <div className="mt-5 w-full">
              <select
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

            <div className="mt-5 ml-2 w-full">
              <select
                className="w-full border-2 border-gray-400 p-2 rounded-md"
                label="Registration"
                name="registration"
                value={formData.registration}
                onChange={(event) =>
                  setFormData({ ...formData, registration: event.target.value })
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
                value={formData.musicFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    musicFeature: event.target.value,
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
                value={formData.powerWindowFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    powerWindowFeature: event.target.value,
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
                value={formData.acFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    acFeature: event.target.value,
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
                value={formData.rearParkingCameraFeature}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    rearParkingCameraFeature: event.target.value,
                  })
                }
              />{" "}
              Rear Parking Camera
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
