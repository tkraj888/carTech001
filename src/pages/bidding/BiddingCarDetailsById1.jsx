/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

// import CarView from "../../components/carDetails/CarView";
// import PriceCard from "../../components/carDetails/PriceCard";
import { useParams } from "react-router-dom";
import {
  useGetbeadingCarByIdQuery,
  useGetByBidCarIdQuery,
} from "../../services/biddingAPI";
import { useNavigate } from "react-router-dom";
import BiddingCarView from "./BiddingCarView";
import BiddingPriceCard from "./BiddingPriceCard";

import { FiLoader } from 'react-icons/fi'; 
import {  useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function BiddingCarDetailsById1() {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [topThreeBids, setTopThreeBids] = useState([]);
  const { beadingCarId, bidCarId } = useParams();
  const { data, isLoading, error } = useGetbeadingCarByIdQuery(beadingCarId);
  const { data : timingData , isLoading : timeIsLoding , error: timeError , refetch } = useGetByBidCarIdQuery(beadingCarId) 
  const closeTime = timingData?.object?.closingTime;
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  if (error?.status === 401) {
    navigate("/signin");
    return null;
  }
  
  const {
    buttonStart,
    abs,
    sunroof,
    airbag,
    childSafetyLocks,
    acFeature,
    musicFeature,
    powerWindowFeature,
    rearParkingCameraFeature,
    price,
    brand,
    fuelType,
    kmDriven,
    ownerSerial,
    year,
    registration,
    transmission,
    carInsurance,
    insurancedate,
    carInsuranceType,
    insuranceType,
    biddingTimerStatus
  } = data;

  const handleMessage = (msg, action) => {
    if (action == "error") {
      toast.error(msg);
    } else {
      toast.success(msg);
    }
  }

//  useEffect(()=>{

//  })

  return (
    <div className="md:grid md:grid-flow-row-dense md:grid-cols-3 gap-4 container mx-auto">
      <div className="p-4 md:col-span-2 no-scrollbar">
        <ToastContainer />
        <BiddingCarView
          beadingCarId={beadingCarId}
          fuelType={fuelType}
          registration={registration}
          ownerSerial={ownerSerial}
          transmission={transmission}
          year={year}
          carInsurance={carInsurance}
          insurancedate={insurancedate}
          insuranceType={insuranceType}
          carInsuranceType={carInsuranceType}
          kmDriven={kmDriven}
          acFeature={acFeature}
          musicFeature={musicFeature}
          powerWindowFeature={powerWindowFeature}
          rearParkingCameraFeature={rearParkingCameraFeature}
          childSafetyLocks={childSafetyLocks}
          abs={abs}
          buttonStart={buttonStart}
          sunroof={sunroof}
          airbag={airbag}
        />
      </div>
      <div className="col-span-1 md:w-auto sticky top-0">
        <BiddingPriceCard
          beadingCarId={beadingCarId}
          bidCarId={bidCarId}
          handleMessage={handleMessage}
          closeTime={closeTime}
          refeachData = {refetch}
          biddingTimerStatus={biddingTimerStatus}
        />
      </div>
    </div>
  );
}
