/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Chip,
  CardHeader,
} from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import { Link, useParams } from "react-router-dom";
import { useConfirmBookingMutation } from "../../services/carAPI";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { CarouselCustomArrows } from "../../ui/CarouselCustomArrows";

const DealerCarPendingRequest = ({ item, refetch }) => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const navigate = useNavigate();

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;

  const [ConfirmBooking] = useConfirmBookingMutation();

  const handleConfirmBook = async (event) => {
    event.preventDefault();
    const formdata = {
      date: item?.date,
      price: item?.askingPrice,
      carId: item?.carId,
      userId: item?.userId,
      dealerId: id,
    };
    try {
      // Sending the necessary data to the API
      const response = await ConfirmBooking(formdata);
      toast.success("Car added");
      setOpen(!open);
      refetch();
      setTimeout(() => {
        navigate(`/dealer/${id}/booking/confirm`);
      }, 1000);
      // console.log("Booking confirmed:", response);
    } catch (error) {
      toast.error("Car not added");
      setOpen(!open);
    }
  };
  const carid = item?.carId;
  const year = item?.year;

  return (
    <div className="w-full flex justify-center">
      <ToastContainer />
      <form onSubmit={handleConfirmBook}>
        <Dialog open={open} handler={handleOpen}>
          <DialogBody className="flex justify-center">
            <p className="font-semibold text-xl">
              Are You Sure You Want to Sell the Car?
            </p>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>No</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleConfirmBook}
            >
              <span>Yes</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <div className="shadow-xl rounded-lg">
          <CardUi>
            <div className="md:p-3 md:min-w-[38rem] md:w-[20rem] md:my-2 md:flex md:gap-2">
              <div className="md:w-1/2">
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
              <div className="w-full">
                <div className="flex justify-between m-3 md:m-0 p-2">
                  <Chip
                    variant="outlined"
                    value={`${item?.date}`}
                    className="rounded-full font-[latto] text-sm"
                  />
                  <Chip
                    color="amber"
                    value={`${item?.status}`}
                    className="font-[latto] text-sm"
                  />
                </div>
                <div className="w-full flex flex-col justify-center">
                  <div className="pl-4 mt-2 flex flex-col justify-center">
                    <div>
                      <div className="text-lg mt-1 font-[latto] font-medium text-black">
                        <span className="font-bold font-[latto]">Car Price:</span> ₹
                        {item?.price}
                      </div>
                      <div className="mt-1 font-[latto] text-lg font-medium text-black">
                        <span className="font-bold">Asking Price:</span> ₹
                        {item?.askingPrice}
                      </div>
                    </div>
                    <div>
                      <div className="mt-1 font-[latto] text-lg font-bold text-black">
                        Contact Details of the User
                      </div>
                      <div className="mt-1 font-[latto] text-lg font-medium text-black">
                        <span className="font-bold">User Name:</span>{" "}
                        {item?.username}
                      </div>
                      <div className="mt-1 font-[latto] text-lg font-medium text-black">
                        <span className="font-bold">Contact No:</span>{" "}
                        {item?.mobileNumber}
                      </div>
                      <div className="flex gap-2 p-2 md:p-0 md:pt-2 ">
                        <div>
                          <Link to={`/carlist/cardetails/${item?.carId}`}>
                            <Button
                              color="blue"
                              className="flex items-center text-xs font-[latto]"
                            >
                              <span>Car Details</span>
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
                                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                              </svg>
                            </Button>
                          </Link>
                        </div>
                        <div>
                          <Button
                            color="green"
                            className="flex items-center font-[latto]"
                            onClick={handleOpen}
                          >
                            <span>Confirm Request</span>
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
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardUi>
        </div>
      </form>
    </div>
  );
};

export default DealerCarPendingRequest;
