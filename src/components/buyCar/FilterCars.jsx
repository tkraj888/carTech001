/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { Button, Typography } from "@material-tailwind/react";
import { FaFilter } from "react-icons/fa";
import Slider from "@mui/material/Slider";
import {
  useGetOnlyBrandsQuery,
  useGetVariantsQuery,
} from "../../services/brandAPI";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
const FilterCars = ({ setUrlState }) => {
  const { data: brandData } = useGetOnlyBrandsQuery();
  const brands = brandData?.list.map((item) => item.brand) || [];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [value, setValue] = useState([0, 6000000]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [underTwoLakh, setUnderTwoLakh] = useState(false); // New state for the checkbox
  const [twoLakhFiveLakh, setTwoLakhFiveLakh] = useState(false); // New state for the checkbox
  const [fiveToEightLakh, setFiveToEightLakh] = useState(false); // New state for the checkbox  const [twoLakhFiveLakh, setTwoLakhFiveLakh] = useState(false); // New state for the checkbox
  const [eightToTenLakh, setEightToTenLakh] = useState(false); // New state for the checkbox
  const [aboveTenLakh, setAboveTenLakh] = useState(false); // New state for the checkbox

  const { data: variantData } = useGetVariantsQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  useEffect(() => {
    if (variantData) {
      const models = [...new Set(variantData.list.map((item) => item.variant))]; // Use Set to remove duplicates
      setModelOptions(models);
    }
  }, [variantData]);

  const handleBrandChange = (event, newValue) => {
    const brand = newValue;
    setSelectedBrand(brand);
    setFilterForm({
      ...filterForm,
      brand,
      model: "", // Reset model when brand changes
    });
  };

  const handleModelChange = (event, newValue) => {
    const model = newValue;
    setFilterForm({
      ...filterForm,
      model,
    });
  };

  const [filterForm, setFilterForm] = useState({
    area: "",
    year: "",
    brand: "",
    model: "",
    fuelType: "",
    transmission: "",
    ownership: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterForm({ ...filterForm, [name]: value });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const minPrice = value[0]; // Minimum price from the slider
    const maxPrice = value[1]; // Maximum price from the slider
    const url = {
      Area: filterForm.area,
      Year: filterForm.year,
      Brand: filterForm.brand.toUpperCase(),
      Model: filterForm.model,
      FuleType: filterForm.fuelType,
      Transmission: filterForm.transmission,
      MinPrice: minPrice,
      MaxPrice: maxPrice,
    };
    setUrlState(url);
  };

  const resetForm = () => {
    setValue([0, 6000000]); // Reset slider values to default
    setSelectedBrand(""); // Reset brand selection
    setModelOptions([]); // Reset model options
    setFilterForm({
      area: "", // Reset area
      year: "", // Reset year
      brand: "", // Reset brand
      model: "", // Reset model
      fuelType: "", // Reset fuel type
      transmission: "", // Reset transmission
    });
    setUnderTwoLakh(false); // Reset the checkbox
    setTwoLakhFiveLakh(false);
    setFiveToEightLakh(false);
    setEightToTenLakh(false);
    setAboveTenLakh(false);

    setUrlState({
      area: "",
      year: "",
      brand: "",
      model: "",
      fuelType: "",
      transmission: "",
      MinPrice: 0, // Reset MinPrice
      MaxPrice: 6000000, // Reset MaxPrice
    });
  };

  let formattedAmountMin = new Intl.NumberFormat("en-IN").format(value[0]);
  let formattedAmountMax = new Intl.NumberFormat("en-IN").format(value[1]);

  const AreaData = [
    { area: "Viman Nagar" },
    { area: "Koregaon Park" },
    { area: "Aundh" },
    { area: "Kothrud" },
    { area: "Hadapsar" },
    { area: "Shivajinagar" },
    { area: "Kalyani Nagar" },
    { area: "Pimpri-Chinchwad" },
    { area: "Magarpatta" },
    { area: "Wadgaon Sheri" },
    { area: "Katraj" },
    { area: "Model Colony" },
    { area: "Pune Cantonment" },
    { area: "Senapati Bapat Road" },
    { area: "Bhosari" },
    { area: "Chakan" },
    { area: "Bavdhan" },
    { area: "Hinjewadi" },
    { area: "Baner" },
    { area: "Kharadi" },
    { area: "Wagholi" },
  ];

  const Year = [
    { year: 2000 },
    { year: 2001 },
    { year: 2002 },
    { year: 2003 },
    { year: 2004 },
    { year: 2005 },
    { year: 2006 },
    { year: 2007 },
    { year: 2008 },
    { year: 2009 },
    { year: 2010 },
    { year: 2011 },
    { year: 2012 },
    { year: 2013 },
    { year: 2014 },
    { year: 2015 },
    { year: 2016 },
    { year: 2017 },
    { year: 2018 },
    { year: 2019 },
    { year: 2020 },
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
  ];

  const FuleType = [
    { fuelType: "Petrol" },
    { fuelType: "Diesel" },
    { fuelType: "Electric" },
    { fuelType: "CNG" },
    { fuelType: "Petrol+CNG" },
  ];

  const Transmission = [
    { transmission: "Automatic" },
    { transmission: "Manual" },
  ];

  const handleSliderChange = (event, newValue) => {
    let [min, max] = newValue;

    // Ensure the min slider value takes steps of 50000 until 1000000
    if (min < 1000000) {
      min = Math.floor(min / 50000) * 50000;
    } else {
      min = Math.floor(min / 500000) * 500000;
    }

    // Ensure the max slider value follows its logic
    if (max < 1000000) {
      max = Math.floor(max / 50000) * 50000;
    } else {
      max = Math.floor(max / 500000) * 500000;
    }

    // Apply constraints
    if (min > max) {
      min = max; // Ensure min does not exceed max
    }

    // Update state
    setValue([min, max]);
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
  };
  const calculateStep = (value) => {
    return value < 7000000 ? 50000 : 500000;
  };

  const handleMinPriceChange = (e) => {
    const min = parseInt(e.target.value.replace(/,/g, ""));
    if (
      !isNaN(min) &&
      min >= 0 &&
      (maxPrice === "" || min <= parseInt(maxPrice.replace(/,/g, "")))
    ) {
      setMinPrice(e.target.value);
      setValue([min, value[1] !== null ? value[1] : 6000000]);
    } else if (min > parseInt(maxPrice.replace(/,/g, ""))) {
      setMinPrice(maxPrice);
      setValue([
        parseInt(maxPrice.replace(/,/g, "")),
        parseInt(maxPrice.replace(/,/g, "")),
      ]);
    } else {
      setMinPrice("");
    }
  };

  // Handle manual input for max price
  const handleMaxPriceChange = (e) => {
    const max = parseInt(e.target.value.replace(/,/g, ""));
    if (
      !isNaN(max) &&
      max <= 6000000 &&
      (minPrice === "" || max >= parseInt(minPrice.replace(/,/g, "")))
    ) {
      setMaxPrice(e.target.value);
      setValue([value[0] !== null ? value[0] : 0, max]);
    } else if (max < parseInt(minPrice.replace(/,/g, ""))) {
      setMaxPrice(minPrice);
      setValue([
        parseInt(minPrice.replace(/,/g, "")),
        parseInt(minPrice.replace(/,/g, "")),
      ]);
    } else {
      setMaxPrice("");
    }
  };
  const handleCheckboxChange = () => {
    setUnderTwoLakh(!underTwoLakh);
    if (!underTwoLakh) {
      setValue([0, 200001]); // Set the slider to under 2 Lakh if checkbox is checked
    } else {
      setValue([0, 6000000]); // Reset the slider when checkbox is unchecked
    }
  };
  const handleCheckboxChange1 = () => {
    setTwoLakhFiveLakh(!twoLakhFiveLakh);
    if (!twoLakhFiveLakh) {
      setValue([200000, 500001]); // Set the slider to under 2  - 5 Lakh if checkbox is checked
    } else {
      setValue([0, 6000000]); // Reset the slider when checkbox is unchecked
    }
  };
  const handleCheckboxChange2 = () => {
    setFiveToEightLakh(!fiveToEightLakh);
    if (!fiveToEightLakh) {
      setValue([500000, 800001]); // Set the slider to under 2  - 5 Lakh if checkbox is checked
    } else {
      setValue([0, 6000000]); // Reset the slider when checkbox is unchecked
    }
  };
  const handleCheckboxChange3 = () => {
    setEightToTenLakh(!eightToTenLakh);
    if (!eightToTenLakh) {
      setValue([800000, 1000001]); // Set the slider to under 2  - 5 Lakh if checkbox is checked
    } else {
      setValue([0, 6000000]); // Reset the slider when checkbox is unchecked
    }
  };
  const handleCheckboxChange4 = () => {
    setAboveTenLakh(!aboveTenLakh);
    if (!aboveTenLakh) {
      setValue([1000000, 6000000]); // Set the slider to under 2  - 5 Lakh if checkbox is checked
    } else {
      setValue([0, 6000000]); // Reset the slider when checkbox is unchecked
    }
  };

  return (
    <div className="border-2 shadow-lg rounded-lg m-2">
      <div className="flex justify-end mr-5 ">
        <button
          type="button"
          className="md:hidden -mt-10 text-black font-bold flex hover:rounded-2xl hover:shadow-2xl "
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="mt-1 mr-1">
            <FaFilter />
          </span>
          Filter
        </button>
      </div>

      <Card
        className={`p-4 ${
          showFilters ? "block" : "hidden bg-gray-100"
        } md:block`}
      >
        <div className="space-y-4">
          <form onSubmit={submitHandle}>
            <div>
              <p className="font-bold mb-5 text-xl text-indigo-400">Filters</p>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-8 font-bold text-black font-[latto] text-lg"
              >
                Price Range
              </Typography>

              <div className="flex justify-center items-center">
                <div style={{ width: "300px" }}></div>
              </div>
              <div className="flex flex-col gap-3 justify-between">
                <div className="flex justify-between">
                  <div className="flex">
                    <span className="text-black p-2 font-[latto]">
                      ₹{formattedAmountMin}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-black p-2 font-[latto]">
                      ₹{formattedAmountMax}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <div className="flex text-center font-bold font-[latto] text-black">
                  ₹0
                </div>
                <div className="w-full flex items-center px-2 mx-1">
                  <Slider
                    className="w-full"
                    sx={{
                      "& .MuiSlider-thumb": {
                        color: "#6366F1",
                      },
                      "& .MuiSlider-track": {
                        color: "#6366F1",
                      },
                      "& .MuiSlider-rail": {
                        color: "#E5E7EB",
                      },
                    }}
                    value={value}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={6000000}
                    step={calculateStep(value[1])}
                    disableSwap
                  />
                </div>
                <div className="flex text-center font-bold font-[latto] text-black">
                  ₹60L
                </div>
              </div>
              <div className="font-[latto] font-bold text-lg text-black">
                What is your price range?
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-start">
                  <div className="flex justify-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={underTwoLakh}
                          onChange={handleCheckboxChange}
                          color="primary"
                        />
                      }
                      label={
                        <Typography
                          style={{
                            fontFamily: "latto",
                            fontSize: "17px",
                            fontWeight: "normal",
                            color: "black",
                          }}
                        >
                          Under ₹2 Lakh
                        </Typography>
                      }
                    />
                  </div>
                  <div className="flex justify-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={twoLakhFiveLakh}
                          onChange={handleCheckboxChange1}
                          color="primary"
                        />
                      }
                      label={
                        <Typography
                          style={{
                            fontFamily: "latto",
                            fontSize: "17px",
                            fontWeight: "normal",
                            color: "black",
                          }}
                        >
                          ₹2 - ₹5 Lakh
                        </Typography>
                      }
                    />
                  </div>
                  <div className="flex justify-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={fiveToEightLakh}
                          onChange={handleCheckboxChange2}
                          color="primary"
                        />
                      }
                      label={
                        <Typography
                          style={{
                            fontFamily: "latto",
                            fontSize: "17px",
                            fontWeight: "normal",
                            color: "black",
                          }}
                        >
                          ₹5 - ₹8 Lakh
                        </Typography>
                      }
                    />
                  </div>
                  <div className="flex justify-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={eightToTenLakh}
                          onChange={handleCheckboxChange3}
                          color="primary"
                        />
                      }
                      label={
                        <Typography
                          style={{
                            fontFamily: "latto",
                            fontSize: "17px",
                            fontWeight: "normal",
                            color: "black",
                          }}
                        >
                          ₹8 - ₹10 Lakh
                        </Typography>
                      }
                    />
                  </div>
                  <div className="flex justify-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={aboveTenLakh}
                          onChange={handleCheckboxChange4}
                          color="primary"
                        />
                      }
                      label={
                        <Typography
                          style={{
                            fontFamily: "latto",
                            fontSize: "17px",
                            fontWeight: "normal",
                            color: "black",
                          }}
                        >
                          Above ₹10 Lakh
                        </Typography>
                      }
                    />
                  </div>
                </div>
              </div>
              <hr className="border-black border-1 w-full" />
              <Autocomplete
                id="area-autocomplete"
                freeSolo
                options={AreaData}
                getOptionLabel={(option) => option.area}
                sx={{ width: "100%", background: "White" }}
                value={
                  filterForm.area ? { area: filterForm.area } : { area: "" }
                }
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    area: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    area: newValue ? newValue.area : "",
                  }));
                }}
                renderInput={(params) => <TextField {...params} label="Area" />}
              />

              <Autocomplete
                id="year-autocomplete"
                freeSolo
                options={Year}
                getOptionLabel={(option) => option.year.toString()}
                sx={{ width: "Full", background: "White" }}
                value={
                  filterForm.year ? { year: filterForm.year } : { year: "" }
                } // Bind to state
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    year: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    year: newValue ? newValue.year : "",
                  }));
                }}
                renderInput={(params) => <TextField {...params} label="Year" />}
              />

              <Autocomplete
                id="brand-autocomplete"
                freeSolo
                options={brands}
                getOptionLabel={(option) => option}
                sx={{ width: "Full", background: "White" }}
                value={filterForm.brand}
                onChange={handleBrandChange}
                renderInput={(params) => (
                  <TextField {...params} label="Brands" />
                )}
              />

              <Autocomplete
                id="model-autocomplete"
                freeSolo
                options={modelOptions}
                getOptionLabel={(option) => option}
                sx={{ width: "Full", background: "White" }}
                value={filterForm.model}
                onChange={handleModelChange}
                renderInput={(params) => (
                  <TextField {...params} label="Models" />
                )}
              />

              <Autocomplete
                id="fueltype-autocomplete"
                freeSolo
                options={FuleType}
                getOptionLabel={(option) => option.fuelType}
                sx={{ width: "Full", background: "White" }}
                value={
                  filterForm.fuelType
                    ? { fuelType: filterForm.fuelType }
                    : { fuelType: "" }
                } // Bind to state
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    fuelType: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    fuelType: newValue ? newValue.fuelType : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Fuel Type" />
                )}
              />

              <Autocomplete
                id="transmission-autocomplete"
                freeSolo
                options={Transmission}
                getOptionLabel={(option) => option.transmission}
                sx={{ width: "Full", background: "White" }}
                value={
                  filterForm.transmission
                    ? { transmission: filterForm.transmission }
                    : { transmission: "" }
                } // Bind to state
                onInputChange={(event, newInputValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    transmission: newInputValue,
                  }));
                }}
                onChange={(event, newValue) => {
                  setFilterForm((prevForm) => ({
                    ...prevForm,
                    transmission: newValue ? newValue.transmission : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Transmission" />
                )}
              />
            </div>
            <div className="flex gap-5 mt-5 md:flex-col lg:flex">
              <Button type="submit" className="bg-indigo-400">
                Search
              </Button>
              <Button onClick={resetForm} className="bg-indigo-400">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default FilterCars;
