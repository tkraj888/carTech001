/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import {
  useAllDealerFinalBidQuery,
  useLazyBiddingCarByIdQuery,
} from "../../services/biddingAPI";
import {
  CardFooter,
  Typography,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import TableComponent from "../../components/table/TableComponent";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLazyGetDealerByUserIdQuery } from "../../services/dealerAPI";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
const WinnerSection = () => {
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const emptyImage = "..\\..\\cars\\emptyfolder.png";

  const UserID = jwtDecodes?.userId;
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const {
    data: didData,
    isLoading,
    error,
  } = useAllDealerFinalBidQuery({ UserID, pageNo, pageSize });
  const [loading, setLoading] = useState(false);

  let [trigger] = useLazyBiddingCarByIdQuery();
  let [triggerGetDealer] = useLazyGetDealerByUserIdQuery();
  const [liveCarsWinData, setLiveCarsWinData] = useState([]);
console.log(didData)
  useEffect(() => {
    const fetchServiceProducts = async () => {
      if (didData) {
        const liveCarsData = [];

        for (let i = 0; i < didData.finalBids.length; i++) {
          const carId = didData.finalBids[i]?.beadingCarId;
          const id = didData.finalBids[i]?.sellerDealerId;
          if (carId) {
            const { data: carData, error: carError } = await trigger(carId);
            if (carError) {
              // console.error("Error fetching car data:", carError);
              continue;
            }

            const { data: dealerName, error: dealerError } =
              await triggerGetDealer(id);
            if (dealerError) {
              // console.error("Error fetching dealer data:", dealerError);
              continue;
            }

            const combinedData = {
              ...carData,
              // ...dealerName,
              ...didData.finalBids[i],
            };

            liveCarsData.push(combinedData);
          }
        }

        setLiveCarsWinData(liveCarsData);
        setLoading(true);
      } else {
        setLoading(true);
      }
    };

    fetchServiceProducts();
  }, [didData, trigger, triggerGetDealer]);
  const nextHandler = () => {
    if (!error) {
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  const prevHandler = () => {
    if (pageNo > 0) {
      setPageNo((prevPageNo) => prevPageNo - 1);
    }
  };

  const columns = [
    {
      Header: "Sr. No",
      accessor: "serialNumber",
      Cell: (cell) => {
        const { pageSize } = cell.state; // Assuming you're using React Table's useTable hook
        const serialNumber = pageNo * pageSize + cell.row.index + 1;
        return serialNumber;
      },
    },
    {
      Header: "Code",
      accessor: "uniqueBeadingCarId",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Top Bidding Amount ",
      accessor: "price",
    },
    {
      Header: "bidCarId",
      accessor: "bidCarId",
      show: true,
    },
    {
      Header: "biddingCarId",
      accessor: "beadingCarId",
      show: true,
    },
    {
      Header: "Action",
      Cell: (cell) => {
        return (
          <div>
            <div className="flex gap-2 justify-center items-center">
              <Link
                to={`/biddinglist/cardetails/${cell.row.values.beadingCarId}/success/${cell.row.values.bidCarId}`}
              >
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
            </div>
          </div>
        );
      },
    },
  ];

  if (isLoading || !loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }
  if (error?.status === 404) {
    return (
      <div>
        <div className="flex justify-center mt-14">
          <img className="w-40" src={emptyImage} alt="no data" />
        </div>
        <p className="flex justify-center text-2xl md:text-3xl font-semibold">
          No Data Available
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full justify-left mb-10 mt-5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-center lg:text-start"
              >
                Winning Bidding Car List &nbsp;
                <span className="text-grey-400">
                  ({didData?.finalBids?.length})
                </span>
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal text-center lg:text-start"
              >
                See information about all winning bidding cars
              </Typography>
            </div>
          </div>
        </CardHeader>
      </div>
      <div className="md:overflow-auto overflow-scroll">
        {liveCarsWinData && (
          <TableComponent columns={columns} data={liveCarsWinData} />
        )}
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
            onClick={prevHandler}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={nextHandler}
            disabled={liveCarsWinData.length < pageSize}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default WinnerSection;
