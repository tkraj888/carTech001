/* eslint-disable react/prop-types */
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { CarouselCustomArrows } from "./CarouselCustomArrows";
import { Link, useNavigate } from "react-router-dom";
import { useGetCarByIdQuery } from "../services/carAPI";
// import { FiLoader } from 'react-icons/fi'; 
function FavCard({favoriteCarData}) {
  const navigate = useNavigate();
  const { carId } = favoriteCarData;
  const { data: cardata ,isLoading ,error } = useGetCarByIdQuery(carId);
  
  if (isLoading) {
    return (
      <>
      {/* // <div className="w-screen h-screen flex justify-center items-center p-8">
      //   <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      // </div> */}
      </>
    );
  }

  const car = cardata?.object;

  if (!car) {
    return <></>;
  }
  
 
  if (error?.status === 401) {
    navigate("/signin");
    return null
  }

  return (
    <div className="flex flex-wrap justify-center mb-6 m-2">
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none">
          <Link to={`/carlist/cardetails/${car.carId}`}>
            <CarouselCustomArrows carId={car.carId} />
          </Link>
        </CardHeader>
        <CardBody className="mb-5">
          <Typography>{car.year}</Typography>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {car.brand} {car.model}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {car.title}
          </Typography>
          <p className="text-sm uppercase mb-3 flex flex-wrap gap-2">
            <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black">
              {car.kmDriven} KM
            </span>
            <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black">
              {car.fuelType}
            </span>
            <span className="bg-gray-200 p-[5px] rounded-sm mr-2 text-black">
              {car.transmission}
            </span>
          </p>
          <Typography variant="h6" className="font-bold text-black text-xl">
            ₹ {car.price}
          </Typography>
          <Link to={`/carlist/cardetails/${car.carId}`}>
            <button className="mt-2 mb-4 p-[7px] bg-indigo-500 rounded-lg text-white">
              View Car
            </button>
          </Link>
          <hr />
          <p className="text-sm">Free Test Drive Today at {car.area}</p>
        </CardBody>
      </Card> 
    </div>
  )
}

export default FavCard;