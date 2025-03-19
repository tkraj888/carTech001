import { useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
 
} from "@material-tailwind/react";
import { FiLoader } from 'react-icons/fi'; 
import { useEffect, useState } from "react";
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import { useBiddingAllCardQuery } from "../../services/biddingAPI";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["ID", "Brand", "Model", "Location", "Price", "Status", "Actions"];

export default function ListTable() {
  const { data, error, isLoading } = useBiddingAllCardQuery();
  const activeCarsData = data?.filter(car => car?.carStatus === "ACTIVE");
  const pendingCarsData = data?.filter(car => car?.carStatus === "pending");
  const sellCarsData = data?.filter(car => car?.carStatus === "sell");
  const [totalCars, setTotalCars] = useState(data?.length || "-");
  const [activeCars, setActiveCars] = useState(activeCarsData?.length || "-");
  const [pendingCars, setPendingCars] = useState(pendingCarsData?.length || "-");
  const [inspectionDone, setInspectionDone] = useState(activeCarsData?.length || "-");
  const [sellCars, setSellCars] = useState(sellCarsData?.length || "-");
  const [pageNo, setPageNo] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setTotalCars(data?.length);
      setActiveCars(activeCarsData?.length);
      setPendingCars(pendingCarsData?.length);
      setInspectionDone(activeCarsData?.length);
      setSellCars(sellCarsData?.length);
      setFilteredData(data);
    }
  }, [data, activeCarsData, pendingCarsData, sellCarsData]);

  useEffect(() => {
    if (error?.status === 401) {
      navigate("/signin");
    }
  }, [error, navigate]);



  const rowsPerPage = 10;
  const paginatedData = filteredData.slice(pageNo * rowsPerPage, (pageNo + 1) * rowsPerPage);

  const handleNextPage = () => {
    if ((pageNo + 1) * rowsPerPage < filteredData.length) {
      setPageNo(pageNo + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
    <>
      <h1 className="mt-2 text-xl ml-2 mb-5 font-bold">Car Listing</h1>
      <div className="flex flex-wrap justify-center divide-x-4 mx-5">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-green-500 rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5">
          <div className="text-4xl font-bold text-white">{totalCars}</div>
          <div className="mt-2 font-medium">Total Cars</div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-orange-500 rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5">
          <div className="text-4xl font-bold text-white">{`${activeCars}/${totalCars}`}</div>
          <div className="mt-2 font-medium">Active Cars</div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-red-400 rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5">
          <div className="text-4xl font-bold text-white">{`${pendingCars}/${totalCars}`}</div>
          <div className="mt-2 font-medium">Pending Cars</div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-blue-300 rounded-2xl shadow-xl mb-5 sm:mb-2 sm:mr-5">
          <div className="text-4xl font-bold text-white">{`${inspectionDone}/${totalCars}`}</div>
          <div className="mt-2 font-medium">Inspection Done Cars</div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-green-500 rounded-2xl shadow-xl sm:mb-2 sm:mr-5">
          <div className="text-4xl font-bold text-white">{sellCars}</div>
          <div className="mt-2 font-medium">Sell Cars</div>
        </div>
      </div>
      <Card className="h-full w-full">
      
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex justify-center gap-2 font-normal leading-none opacity-70"
                    >
                      {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((car, index) => {
                const isLast = index === paginatedData.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={car.beadingCarId}>
                    <td className={classes}>{car.beadingCarId}</td>
                    <td className={classes}>{car.brand}</td>
                    <td className={classes}>{car.model}</td>
                    <td className={classes}>{car.area}</td>
                    <td className={classes}>{car.price}</td>
                    <td className={classes}>
                    {
        car.carStatus == "pending" ? (
            <Link to={`/inspector/carverify/${car.beadingCarId}`} className="button-link">
          <Button variant="gradient" color="blue">
              Verify
          </Button>
            </Link>
        ) : (
            <Link to={`/inspector/carverify/${car.beadingCarId}`} className="button">
          <Button variant="gradient" color="green">
              Done
          </Button>
            </Link>
        )
      },
                    </td>
                    <td className={classes}>
                      <Tooltip content="Actions">
                        
                        <div className="flex gap-2  justify-center items-center">

                        <Link to={`/biddinglist/cardetails/${car.beadingCarId}`}>
                        <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  color="blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                  />
                </svg>
                </Link>
                <Link to={`/bidding/${car.beadingCarId}/editcar`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  color="green"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                </Link>
                </div>
                        
                      </Tooltip>
                    
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handlePrevPage}
            disabled={pageNo === 0}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.ceil(filteredData.length / rowsPerPage) }, (_, index) => (
              <IconButton
                key={index}
                variant={pageNo === index ? "contained" : "outlined"}
                color="blue-gray"
                size="sm"
                onClick={() => setPageNo(index)}
              >
                {index + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handleNextPage}
            disabled={(pageNo + 1) * rowsPerPage >= filteredData.length}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
      
    </>
  );
}