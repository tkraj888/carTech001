/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useBiddingAllCardQuery, useGetByDealerIdQuery } from "../../services/biddingAPI";
import TableComponent from "../../components/table/TableComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import ApexCharts from 'react-apexcharts';
import { useEffect, useState } from "react";
import { FiLoader } from 'react-icons/fi'; 
const BiddingDealerCars = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const UserID = jwtDecodes?.userId;
  const dealerId = jwtDecodes?.dealerId;
  const userRole = token ? jwtDecodes?.authorities[0] : null;
  const [pageNo, setPageNo] = useState(0);
  const [filteredData, setFilteredData] = useState(null);


  const dataQuery = (userRole === "DEALER")
    ? useGetByDealerIdQuery(dealerId)
    : useBiddingAllCardQuery();

  const { data, isLoading, error } = dataQuery;
  const [totalCars, setTotalCars] = useState(data?.length || "-");
  const activeCarCount = data?.filter((car) => car.carStatus === "ACTIVE").length;
  const pendingCarCount = data?.filter((car) => car.carStatus === "pending").length;
  const soldCarCount = data?.filter((car) => car?.carStatus === "SOLD").length;

  const [activeCars, setActiveCars] = useState(activeCarCount || "-");
  const [pendingCars, setPendingCars] = useState(pendingCarCount || "-");
  const [soldCars, setSoldCars] = useState(soldCarCount || "-");


  const itemsPerPage = 10;
  useEffect(() => {
    if (data) {
      setTotalCars(data?.length);
      setActiveCars(data?.filter((car) => car.carStatus === "ACTIVE").length);
      setPendingCars(data?.filter((car) => car.carStatus === "pending").length);
      setSoldCars(data?.filter((car) => car.carStatus === "SOLD").length);
      setFilteredData(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  // if (error?.status == 401) {
  //   navigate("/signin");
  // }

  // For calculating Percentage
  const PertotalCars = Math.ceil((totalCars/totalCars)*100)
  // console.log("active",PertotalCars)

  const perActive = Math.ceil((activeCars/totalCars)*100)
  // console.log("active",perActive)

  const perPending = Math.floor((pendingCars/totalCars)*100)
  // console.log("active",perPending)

  const perSold = Math.ceil((soldCars/totalCars)*100)
  // console.log("active",perSold)

  const perInspection = Math.ceil((activeCars/totalCars)*100)
  // console.log("active",perInspection)


  const handleCardClick = (status) => {
    if (status === "ALL") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((car) => car?.carStatus === status));
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
      Header : "Code",
      accessor : "uniqueBeadingCarId",

    },
    {
      accessor: 'biddingTimerId',
      // show: true,
      isVisible: false
    },
    {
      accessor: 'biddingTimerStatus',
      // show: true,
      isVisible: false
    },
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
    ...(userRole === "ADMIN" || userRole === "SALESPERSON"
      ? [
        {
          Header: "Update Inspection Form",
          accessor: "carStatus",
          Cell: (cell) => {
            return userRole === "DEALER" ? (
              <Link
                to={`/dealer/finalreport/${cell.row.values.beadingCarId}`}
                className="button-link"
              >
                <Button variant="gradient" color="blue">
                  View Report
                </Button>
              </Link>
            ) : cell.row.values.carStatus === "pending" ? (
              <Link to={userRole === "ADMIN" ? `/admin/carverify/${cell.row.values.beadingCarId}` : `/sale/carverify/${cell.row.values.beadingCarId}`}>
                <Button variant="gradient" color="yellow">
                  Pending
                </Button>
              </Link>
            ) : (
              <>
              <Link to={userRole === "ADMIN" ? `/admin/inspection/report/${cell.row.values.beadingCarId}` : `/sale/inspection/report/${cell.row.values.beadingCarId}`}>
                <Button variant="gradient" color="blue" className="mb-2 lg:mb-0">
                  View
                </Button>
              </Link>&nbsp;
              <Link to={userRole === "ADMIN" ? `/admin/carverify/${cell.row.values.beadingCarId}` : `/sale/carverify/${cell.row.values.beadingCarId}`}>
              <Button variant="gradient" color="green">
                Update
              </Button>
            </Link>
            </>
            );
          },
        },
      ]
      : []),
      ...(userRole === "ADMIN" || userRole === "SALESPERSON"
        ? [
    {
      Header: "Action",
      accessor: "",
      Cell: (cell) => {
        return (
          <div>
            <div className="flex gap-2 justify-center items-center">
              <Link
                to={
                  cell.row.values.biddingTimerId
                    ? `/biddinglist/cardetails/${cell.row.values.beadingCarId}/${cell.row.values.biddingTimerId}`
                    : `/biddinglist/cardetails/${cell.row.values.beadingCarId}`
                }
              >
                <Button className="bg-[#045e4f]">
                  {userRole === "DEALER"
                    ? "Place Bid"
                    : (userRole === "ADMIN" || userRole === "SALESPERSON")
                      ? (( cell.row.values.biddingTimerStatus === "PENDING") 
                        ? "Update Bid Time" :cell.row.values.biddingTimerStatus === 'CLOSED' ? 'View Bid Car'
                        : "Set Bid Time")
                      : ""
                  }
                </Button>
              </Link>
            </div>

          </div>
        );
      },
    }, ] : []),
    ...(userRole === "DEALER"
      ? [
  {
    Header: "Action",
    accessor: "",
    Cell: (cell) => {
      return (
        <div>
          <div className="flex gap-2 justify-center items-center">
          <Link to={`/biddinglist/cardetails/${cell.row.values.beadingCarId}/success`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
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
  }, ] : []),
  ];

  const startIndex = pageNo * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData ? filteredData.slice(startIndex, endIndex) : [];

  return (
    <>
     <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Bidding Car List
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    See Information About All Bidding Cars
                  </Typography>
                </div>
              </div>
            </CardHeader>
       <Typography className="hidden xl:block lg:ml-4 lg:mt-2">
        <div className="flex">
      <Link to={"/"}>
              <p className="hover:text-blue-900"> Home </p> 
              </Link>
               /
             
              <p >BiddingCar</p>
          
              
              </div>
      </Typography>
      {/* <h1 className="mt-2 text-xl ml-2 mb-5 font-bold">Car Listing</h1> */}
      <div className="flex flex-wrap justify-center mx-5 mb-8 lg:mt-6  lg:grid lg:grid-cols-5 md:grid md:grid-cols-3 ">
        <div
          className="p-5"
          onClick={() => handleCardClick("ALL")}
        >
          {/* <div className="text-4xl font-bold text-white">{totalCars}</div>
          <div className="mt-2 font-medium">Total Cars</div> */}
          <Card className="w-full">
        <CardBody className=" justify-center items-center">
          <ApexCharts
            options={{
              chart: { type: 'radialBar', height: 200 },
              plotOptions: {
                radialBar: {
                  hollow: { size: '40%' },
                  dataLabels: { 
                    name: {
                      show: false // Hide the series name
                    },
                    value: {
                      show: true, // Ensure the percentage is shown
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7
                    }
                  }
                }
              },
              colors: ['#007BFF'],
              labels: [], // Clear any additional labels if needed
              tooltip: {
                enabled: false // Keep the tooltip enabled if you want to show percentage on hover
              }
            }}
            series={[PertotalCars || 0]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold">
           Total  Cars
</Typography>
<Typography className="flex justify-center items-center font-bold">
{totalCars}
</Typography>
         </CardBody>
         </Card>
        </div>
        <div
          className="p-5"
          onClick={() => handleCardClick("ACTIVE")}
        >
          {/* <div className="text-4xl font-bold text-white">
            {activeCars}/{totalCars}
           
          </div>
          <div className="mt-2 font-medium">Active Cars</div> */}
          <Card className="w-full">
        <CardBody className=" justify-center items-center">
          <ApexCharts
            options={{
              chart: { type: 'radialBar', height: 200 },
              plotOptions: {
                radialBar: {
                  hollow: { size: '40%' },
                  dataLabels: { 
                    name: {
                      show: false // Hide the series name
                    },
                    value: {
                      show: true, // Ensure the percentage is shown
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7
                    }
                  }
                }
              },
              colors: ['#28A745'],
              labels: [], // Clear any additional labels if needed
              tooltip: {
                enabled: false // Keep the tooltip enabled if you want to show percentage on hover
              }
            }}
            series={[perActive || 0]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold">
           Active  Cars
</Typography>
<Typography className="flex justify-center items-center font-bold">
{activeCars}
</Typography>
         </CardBody>
         </Card>
        </div>
        <div
          className="p-5"
          onClick={() => handleCardClick("pending")}
        >
          {/* <div className="text-4xl font-bold text-white">
            {pendingCars}/{totalCars}
           
          </div>
          <div className="mt-2 font-medium">Pending Cars</div> */}
          <Card className="w-full">
        <CardBody className=" justify-center items-center">
          <ApexCharts
            options={{
              chart: { type: 'radialBar', height: 200 },
              plotOptions: {
                radialBar: {
                  hollow: { size: '40%' },
                  dataLabels: { 
                    name: {
                      show: false // Hide the series name
                    },
                    value: {
                      show: true, // Ensure the percentage is shown
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7
                    }
                  }
                }
              },
              colors: ['#FFC107'],
              labels: [], // Clear any additional labels if needed
              tooltip: {
                enabled: false // Keep the tooltip enabled if you want to show percentage on hover
              }
            }}
            series={[perPending || 0]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold whitespace-nowrap">
          Inspection Pending Cars
</Typography><Typography className="flex justify-center items-center font-bold">
{pendingCars}
</Typography>
         </CardBody>
         </Card>
        </div>
        <div
          className="p-5"
          onClick={() => handleCardClick("ACTIVE")}
        >
          {/* <div className="text-4xl font-bold text-white">
            {activeCars}/{totalCars}
            
          </div>
          <div className="mt-2 font-medium">Inspection Done Cars</div> */}
          <Card className="w-full">
        <CardBody className=" justify-center items-center">
          <ApexCharts
            options={{
              chart: { type: 'radialBar', height: 200 },
              plotOptions: {
                radialBar: {
                  hollow: { size: '40%' },
                  dataLabels: { 
                    name: {
                      show: false // Hide the series name
                    },
                    value: {
                      show: true, // Ensure the percentage is shown
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7
                    }
                  }
                }
              },
              colors: ['#28A745'],
              labels: [], // Clear any additional labels if needed
              tooltip: {
                enabled: false // Keep the tooltip enabled if you want to show percentage on hover
              }
            }}
            series={[perInspection || 0]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold whitespace-nowrap">
          Inspection Done Cars
</Typography><Typography className="flex justify-center items-center font-bold">
{activeCars}
</Typography>
         </CardBody>
         </Card>
        </div>
        <div
          className="p-5"
          onClick={() => handleCardClick("SOLD")}
        >
          {/* <div className="text-4xl font-bold text-white">
          
            {soldCars}/{totalCars}
          </div> */}
          <Card className="w-full">
        <CardBody className=" justify-center items-center">
          <ApexCharts
            options={{
              chart: { type: 'radialBar', height: 200 },
              plotOptions: {
                radialBar: {
                  hollow: { size: '40%' },
                  dataLabels: { 
                    name: {
                      show: false // Hide the series name
                    },
                    value: {
                      show: true, // Ensure the percentage is shown
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7
                    }
                  }
                }
              },
              colors: ['#FF0000'],
              labels: [], // Clear any additional labels if needed
              tooltip: {
                enabled: false // Keep the tooltip enabled if you want to show percentage on hover
              }
            }}
            series={[perSold || 0 ]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold">
          Sold Cars
</Typography><Typography className="flex justify-center items-center font-bold">
{soldCars}
</Typography>
         </CardBody>
         </Card>
          {/* <div className="mt-2 font-medium">Sold Cars</div> */}
        </div>
      </div>

      <div>
        {error?.status === 404 ? (
          <div>
            {/* <p className="text-3xl font-semibold mx-4">{error?.data?.message}</p> */}
            <p className="text-2xl font-semibold mx-4">No Data Available</p>
          </div>
        ) : (
          <Card className="h-full w-full">
           
            <CardBody className="md:overflow-auto overflow-scroll px-1">
              <TableComponent columns={columns} data={paginatedData} />
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Page {pageNo + 1}
              </Typography>

              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  color="blue-gray"
                  size="sm"
                  onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
                  disabled={pageNo === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  color="blue-gray"
                  size="sm"
                  onClick={() => setPageNo((prev) => prev + 1)}
                  disabled={endIndex >= filteredData?.length}
                >
                  Next
                </Button>
              </div>

            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
};

export default BiddingDealerCars;
