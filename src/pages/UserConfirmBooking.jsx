import { Button } from "@material-tailwind/react";
import { useGetAllUserConfirmQuery } from "../services/carAPI";
import CardUi from "../ui/CardUi";
// import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FiLoader } from 'react-icons/fi'; 
// import CardUi from "../ui/CardUi";
// import Chip from "@material-tailwind/react";
const UserConfirmBooking = () => {
  const { data, isLoading, error } = useGetAllUserConfirmQuery();
  isLoading;
  error;
  // console.log(data?.bookingDto);
  // console.log(isLoading);
  // console.log(error);
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }
  return ( 
    <div className="space-y-4 mt-12">
    
      <div className="w-full flex justify-center">
        <CardUi className=" mt-12 ">
          <div className="min-w-[20rem] flex gap-12 justify-center">
          <div>
            <p className="text-lg ">date:<span className="font-semibold">{data?.bookingDto?.date}</span> </p>
            <p className="mb-4 text-lg ">price:<span className="font-semibold">{data?.bookingDto?.price}</span></p>
            </div>
            <Link to={`/carlist/cardetails/${data?.bookingDto?.carId}`}>
              <Button className="flex items-center gap-2">Car details <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>
</Button>
            </Link>
          </div>
        </CardUi>
      </div>

      {/* <CardUi>
        <div className="min-w-[30rem]">
          <div className="flex justify-between">
            <Chip
              variant="outlined"
              value={`${item?.date}`}
              className="rounded-full font-[latto] text-sm"
            ></Chip>
            <Chip
              color="amber"
              value={`${item?.status}`}
              className="font-[latto] text-sm"
            ></Chip>
          </div>
          <div className="w-full flex justify-center">
            <div className="mt-5 flex flex-col justify-center">
              <div className="text-lg mt-3 font-[latto] font-medium text-black">
                Car Price:₹{item?.price}
              </div>
              <div className=" mt-3 font-[latto] text-lg font-medium text-black">
                Asking Price:₹{item?.askingPrice}
              </div>

              <Link to={`/carlist/cardetails/${item?.carId}`}>
                <Button className="flex gap-2 items-center mt-3 font-[latto]">
                  <span>Car Details </span>
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
      </CardUi> */}
    </div>
  );
};

export default UserConfirmBooking;
