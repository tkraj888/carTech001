/* eslint-disable react/prop-types */
import { Button, CardHeader, Chip } from "@material-tailwind/react";
import CardUi from "../../ui/CardUi";
import { Link } from "react-router-dom";
import { CarouselCustomArrows } from "../../ui/CarouselCustomArrows";

const UserCardPendingRequest = ({ item }) => {
  const carid = item?.carId;

  // Function to format date as "11 Aug 2024"
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-GB', { month: 'short' }); // Use 'short' for abbreviated month
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <div className="w-96px items-center flex justify-center mx-8">
      <div className="shadow-xl rounded-lg">
        <CardUi>
          <div className="md:min-w-[20rem] lg:min-w-[26rem] min-w-[20rem]">
            <div className="flex-col md:flex md:flex-row md:w-full">
              <div className="w-full p-4">
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
              <div className="w-full flex justify-center">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between gap-5 md:gap-1">
                    <div>
                      <Chip
                      
                        variant="outlined"
                        value={formatDate(item?.date)}
                        className="rounded-md font-[latto] -ml-2 md:text-sm text-xs  md:h-8  h-7 "
                      />
                    </div>
                    <div>
                      <Chip
                        color="amber"
                        value={`${item?.status}`}
                        className="font-[latto] md:text-sm text-xs md:mr-2  "
                      />
                    </div>
                  </div>
                  <div className="text-sm md:text-lg mt-3 font-[latto] font-medium text-black">
                    <span className="font-bold">Car Price:</span> ₹{item?.price}
                  </div>
                  <div className="mt-3 font-[latto] text-sm md:text-lg font-medium text-black">
                    <span className="font-bold">Asking Price:</span> ₹{item?.askingPrice}
                  </div>

                  <Link to={`/carlist/cardetails/${item?.carId}`}>
                    <Button className="flex gap-2 bg-indigo-500 items-center mt-3 mb-3 md:mb-0 font-[latto]">
                      <span className="text-xs">Car Details </span>
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
                </div>
              </div>
            </div>
          </div>
        </CardUi>
      </div>
    </div>
  );
};

export default UserCardPendingRequest;
