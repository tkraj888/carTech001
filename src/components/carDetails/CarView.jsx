/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */

import CarView1 from "./CarView1";
import KnowYourCar from "./KnowYourCar";
import TopFeatures from "./TopFeatures";

const CarView = ({
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
      <CarView1 carId={carId} />
      <KnowYourCar
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
      />

      {/* <InspectionReport/> */}
      {
           ( abs || childSafetyLocks || sunroof || airbag || buttonStart || acFeature || musicFeature || powerWindowFeature || rearParkingCameraFeature) ?
      <TopFeatures
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
      :null }
    </div>
  );
};

export default CarView;
