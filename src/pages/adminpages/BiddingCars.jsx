import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
  } from "@material-tailwind/react";
  import { useBiddingAllCardQuery } from "../../services/biddingAPI";
  import { FiLoader } from 'react-icons/fi'; 
  import TableComponent from "../../components/table/TableComponent";
  import { Link, useParams } from "react-router-dom";
  import { MdPendingActions } from "react-icons/md";
  import StatusDialogeBox from "../../ui/StatusDialogeBox";
  import BiddingDailogeBox from "../../ui/BiddingDialogeBox";
  // import PlaceBid from "./PlaceBid";
  import PlaceBid from "../dealer/PlaceBid";
  import BiddingSetTime from "../../ui/BiddingSetTime";
  import { jwtDecode } from "jwt-decode";
  import Cookies from "js-cookie";

  const BiddingCars = () => {
    const { id } = useParams();
  
    const token = Cookies.get("token");
    let jwtDecodes;
    if (token) {
      jwtDecodes = jwtDecode(token);
    }
  
    const UserID = jwtDecodes?.userId;
    const {data , isLoading ,error } = useBiddingAllCardQuery();
    // const { data, isLoading, error } = useBiddingCarByDealerIdQuery(UserID);
  
    if (isLoading) {
      return (
        <div className="w-screen h-screen flex justify-center items-center p-8">
          <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
        </div>
      );
    }
    // const userId = data[0].userId; // Access userId from the first object
    // console.log('User ID:', userId);
    const columns = [
      {
        Header: "ID",
        accessor: "beadingCarId",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
  
      {
        Header: "Model ",
        accessor: "model",
      },
      {
        Header: "Fuel Type",
        accessor: "fuelType",
      },
      {
        Header: "Year",
        accessor: "year",
      },
  
      {
        Header: "Price",
        accessor: "price",
        disableSortBy: true,
      },
  
      {
        Header: "Status",
        accessor: "carStatus",
        Cell: (cell) => {
          
          return (
            <div>
              <div className="flex gap-2 justify-center items-center  ">
                <StatusDialogeBox status={cell.row.values.carStatus} />
              </div>
            </div>
          );
        },
      },
      {
        Header: "Set Time",
        accessor: "",
        Cell: (cell) => {
         
          return (
            <div>
              <div className="flex gap-2 justify-center items-center  ">
                <BiddingSetTime
                  userid={UserID}
                  biddingcarid={cell.row.values.beadingCarId}
                />
              </div>
            </div>
          );
        },
      },
  
      {
        Header: "Start Bidiing",
        accessor: "",
        Cell: (cell) => {
          
          return (
            <div>
              <div className="flex gap-2 justify-center items-center  ">
                <BiddingDailogeBox
                  userid={UserID}
                  biddingcarid={cell.row.values.beadingCarId}
                />
              </div>
            </div>
          );
        },
      },
  
      {
        Header: "Place Bid",
        accessor: "",
        Cell: (cell) => {
          cell;
          // console.log(cell.row.values.carStatus);
          return (
            <div>
              <div className="flex gap-2 justify-center items-center  ">
                <PlaceBid userid={UserID} id={id} />
              </div>
            </div>
          );
        },
      },
  
      {
        Header: "Edit",
        accessor: "Edit",
        // eslint-disable-next-line no-unused-vars
        Cell: (cell) => {
          
          return (
            <div>
              <div className="flex gap-2 justify-center items-center  ">
                <Link to={`/car/${cell.row.values.beadingCarId}/pendingreq`}>
                  <div className="w- h-">
                    <MdPendingActions color="#b09b12" className="h-6 w-6" />
                  </div>
                </Link>
  
                <Link
                  to={`/biddinglist/cardetails/${cell.row.values.beadingCarId}`}
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
  
                <Link to={`/bidding/${cell.row.values.dealer_id}/editcar`}>
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
                <div
                // onClick={() => deleteDealerHandler(cell.row.values.dealer_id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    color="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        },
      },
    ];
    let dealerApiData;
    if (isLoading) {
      return (
        <div className="w-screen h-screen flex justify-center items-center p-8">
          <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
        </div>
      );
    } else {
      dealerApiData = data;
    }
  
    return (
      <>
        {error?.status === 404 ? (
          <div>
            <p className="text-3xl font-semibold ">No Data Available</p>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link to={`/bidding/${UserID}/addcar`}>
                <Button>Add Car</Button>
              </Link>
            </div>
          </div>
        ) : (
          <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className=" flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Bidding Car list
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    See information about all cars
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Link to={`/bidding/${UserID}/addcar`}>
                    <Button>Add Car</Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <TableComponent columns={columns} data={dealerApiData} />
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="medium"
                color="blue-gray"
                className="font-normal"
              >
                {/* Page {pageNo + 1} */}
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  // disabled={pageNo <= 0}
                  // onClick={() => setPageNo((a) => a - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  // onClick={nextHandler}
                  // disabled={data?.list?.length < 10}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </>
    );
  };

  export default BiddingCars;