/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import { useState } from "react";
import { useFilterCarQuery } from "../../services/carAPI";
// import GridCarList from "../buyCar/GridCarList";
import BiddingCarView1 from "./BiddingCarView1";
import BiddingKnowYourCar from "./BiddingKnowYourCar";
import BiddingInspectionReport from "./BiddingInspectionReport";
import { Button } from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import TopFeatures from "../../components/carDetails/TopFeatures";

const BiddingCarView = ({
  fuelType,
  registration,
  ownerSerial,
  transmission,
  year,
  carInsurance,
  carInsuranceType,
  insurancedate,
  insuranceType,
  kmDriven,
  beadingCarId,
  data,
  musicFeature,
  acFeature,
  powerWindowFeature,
  rearParkingCameraFeature,
  abs,
  childSafetyLocks,
  buttonStart,
  airbag,
  sunroof,
}) => {
  
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;
  
  return (
    <div>
      <BiddingCarView1 beadingCarId={beadingCarId} data={data} />
      <BiddingKnowYourCar
        fuelType={fuelType}
        registration={registration}
        ownerSerial={ownerSerial}
        transmission={transmission}
        year={year}
        carInsurance={carInsurance}
        kmDriven={kmDriven}
        carInsuranceType={carInsuranceType}
        insuranceType={insuranceType}
        insurancedate={insurancedate}
      />
      {/* <BiddingInspectionReport /> */}

      
          {
           ( abs || childSafetyLocks || sunroof || airbag || buttonStart || acFeature || musicFeature || powerWindowFeature || rearParkingCameraFeature) ?
           <TopFeatures
           abs={abs}
           childSafetyLocks={childSafetyLocks}
           sunroof={sunroof}
           airbag={airbag}
           buttonStart={buttonStart}
           acFeature={acFeature}
           musicFeature={musicFeature}
           powerWindowFeature={powerWindowFeature}
           rearParkingCameraFeature={rearParkingCameraFeature}
           /> : null
          }
    </div>
  );
};

export default BiddingCarView;
