/* eslint-disable react/prop-types */
import {  Card, CardBody, Typography, CardHeader } from "@material-tailwind/react";
import { CarouselCustomArrows } from "../CarouselCustomArrows";
import { Link } from "react-router-dom";
import { useState } from "react";

export function CardDefault2({ data }) {
  const [isHovered, setIsHovered] = useState(false);
 
  const carid = data?.carId;

  const combinedText = `${data.brand} ${data.model}`;
  const truncatedText = combinedText.length > 25 ? combinedText.substring(0, 22 ) + '...' : combinedText;

  
  return (
    <Card className="mt-1 md:m-0 items-center hover:border hover:border-3 hover:shadow-2xl hover:scale-100">
      <CardHeader className="h-full mt-1">
        <Link to={`/carlist/cardetails/${carid}`}>
          <CarouselCustomArrows carId={data.carId} />
        </Link>
      </CardHeader>
      <CardBody className="mb-5">
        <Link to={`/carlist/cardetails/${data.carId}`}>
          <Typography>{data.year}</Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? data.brand + " " + data.model : truncatedText}
          </Typography>
          <p className="text-xs font-medium uppercase flex-wrap ">
            <span className="bg-gray-200 p-[5px] mr-2 rounded-sm text-black">
              {data.kmDriven} KM
            </span>
            <span className="bg-gray-200 p-[5px] mr-2 rounded-sm text-black">
              {data.fuelType}
            </span>
            <span className="bg-gray-200 p-[5px] mr-2 rounded-sm text-black">
              {data.transmission}
            </span>
          </p>
          <Typography
            variant="h6"
            className="mt-2 font-bold text-xl text-black"
          >
            ₹ {data.price}
          </Typography>

          {/* <Link to={`/carlist/cardetails/${data.carId}`}>
          {" "}
          <Button className="mt-2 mb-4 p-[8px] bg-indigo-500 rounded-lg text-white">View Car</Button>
        </Link> */}
          <hr />
          <p className="text-sm">Free Test Drive Today at {data.area}</p>
        </Link>
      </CardBody>
    </Card>
  );
}
