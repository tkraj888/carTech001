/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */

import CarImageCarousel from "../Premium/CarImageCarousel";
import FeaturedImageGallery from "../Premium/CarImageCarousel";
import CarSummary from "../Premium/CarSummary";
import CarView1 from "./CarView1";
import KnowYourCar from "./KnowYourCar";
import TopFeatures from "./TopFeatures";

const CarViewPremium = ({
  fuelType,
  registration,
  ownerSerial,
  transmission,
  year,
  carInsurance,
  kmDriven,
  carId,
  musicFeature,
  acFeature,
  powerWindowFeature,
  rearParkingCameraFeature,
  abs,
  childSafetyLocks,
  buttonStart,
  airbag,
  sunroof,
  insurancedate,
  carInsuranceType,
  insuranceType,
}) => {
  return (
    <div>
      <CarImageCarousel carId={carId} />
      <CarSummary
        fuelType={fuelType}
        registration={registration}
        ownerSerial={ownerSerial}
        transmission={transmission}
        year={year}
        carInsurance={carInsurance}
        kmDriven={kmDriven}
        insurancedate={insurancedate}
        carInsuranceType={carInsuranceType}
        insuranceType={insuranceType}
        abs={abs}
        childSafetyLocks={childSafetyLocks}
        sunroof={sunroof}
        buttonStart={buttonStart}
        airbag={airbag}
        acFeature={acFeature}
        musicFeature={musicFeature}
        powerWindowFeature={powerWindowFeature}
        rearParkingCameraFeature={rearParkingCameraFeature}
      />
    </div>
  );
};

export default CarViewPremium;
