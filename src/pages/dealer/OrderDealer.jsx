/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useCancelStatusSetMutation,
  useGetAllDealerCompleteBookingQuery,
} from "../../services/dealerAPI";
import CardUi from "../../ui/CardUi";
import emptyfolder from "/cars/emptyfolder.png";

import {
  Button,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { FiLoader } from 'react-icons/fi'; 
import { Link } from "react-router-dom";
import { useState } from "react";
import { CarouselCustomArrows } from "../../ui/CarouselCustomArrows";
import { toast, ToastContainer } from "react-toastify";
const OrderDealer = () => {
  const { id } = useParams();


  const [pageNo, setPageNo] = useState(0);
  const [revertId, setRevertId] = useState("");

  const { data,isLoading, error, refetch } =
    useGetAllDealerCompleteBookingQuery({
      pageNo,
      id,
    });

  const [cancelStatusSet] = useCancelStatusSetMutation();
  useEffect(()=>{
    refetch();
  },[id])

  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        // console.log("You are on the last page.");
      } else {
        return prePageNo + 1;
      }
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = (revertID) => {
    setOpen(!open);
    setRevertId(revertID);
  };

  const handleRevertConfirmation = async () => {
    try {
      const res = await cancelStatusSet(revertId);
      toast.success(res?.data?.status);
      handleOpen(false);
      refetch();
    } catch (error) {
      // console.log("Error :", error);
    }
  };
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );}
  if (!data) {
    return <div>
      <div className="flex justify-center  mt-14">
      <img
          className="w-40"
          src={emptyfolder}
          alt="no data"
        />
        </div>
        <p className="flex justify-center text-2xl md:text-3xl font-semibold">No Data Available</p>
    </div>
  }

  const renderData = data?.bookings?.map((item, index) => {
    const carid = item?.carId;
   
    return (
      <div className="md:mx-10 mx-5 mt-3 mb-3" key={index}>
        <CardUi>
          <div className="p-2 md:w-full md:px-5 md:py-3 md:flex md:gap-8">
            <div className="md:w-1/3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <Link to={`/carlist/cardetails/${carid}`}>
                  <CarouselCustomArrows carId={carid} />
                </Link>
              </CardHeader>
            </div>
            <div>
              <p className="mt-4 md:mt-0 text-lg">
                <span className="font-[latto] text-black font-bold">Date:</span>{" "}
                {item?.date}
              </p>
              <p className="mt-2 text-lg">
                <span className="font-[latto] text-black font-bold">
                  Price:{" "}
                </span>
                {item?.price}
              </p>
              <div>
                <div className="font-[latto] mt-2 text-lg font-bold text-black">
                  Contact Details of the User
                </div>
                <div className="font-[latto] mt-1 text-lg font-medium text-black">
                  <span className="font-bold text-lg">User Name: </span>
                  {item?.firstName}
                </div>
                <div className="font-[latto] text-lg font-medium text-black">
                  <span className="font-bold text-lg">Contact No:</span>{" "}
                  {item?.mobileNo}
                </div>
              </div>
              <div className="flex gap-2 align-middle items-center">
                <Link to={`/carlist/cardetails/${item?.carId}`}>
                  <Button
                    fullWidth
                    className="flex items-center text-xs mt-5 bg-blue-400 w-full"
                  >
                    Car details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </Link>
                {item?.status === "cancel" ? (
                  <Button className="flex items-center text-xs gap-2 mt-5 bg-red-300">
                    Canceled Booking
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    className="flex items-center text-xs gap-2 mt-5 bg-red-700"
                    onClick={() => handleOpen(item?.id)}
                  >
                    Cancel Booking
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardUi>
      </div>
    );
  });
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-y-4 lg:grid lg:grid-cols-2 lg:gap-y-4">
        {renderData}
      </div>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          Page {pageNo + 1}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={pageNo <= 0}
            onClick={() => setPageNo((a) => a - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={nextHandler}
            disabled={data?.bookings.length < 10}
          >
            Next
          </Button>
        </div>
      </CardFooter>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Do you really want to Revert the Car?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleRevertConfirmation}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default OrderDealer;
