/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { CardHeader, DialogBody } from "@material-tailwind/react";
import 'tailwindcss/tailwind.css';
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Dialog,
  DialogFooter,
  
  
} from "@material-tailwind/react";
import { FiLoader } from 'react-icons/fi'; 





import {
  useDeleteDealerMutation,
} from "../../services/dealerAPI";
import TableComponent from "../../components/table/TableComponent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBiddingCarByDealerIdQuery } from "../../services/biddingAPI";
import Cookies from "js-cookie";
import ApexCharts from 'react-apexcharts';
import { jwtDecode } from "jwt-decode";

export default function CarListing() {
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const UserId = token ? jwtDecodes?.userId : null;

  const { data, error, isLoading } = useBiddingCarByDealerIdQuery(UserId);
  const activeCarsData = data?.filter(car => car?.carStatus === "ACTIVE");
  const pendingCarsData = data?.filter(car => car?.carStatus === "pending");
  const sellCarsData = data?.filter(car => car?.carStatus === "SOLD");

  const [totalCars, setTotalCars] = useState(data?.length || "-");
  const [activeCars, setActiveCars] = useState(activeCarsData?.length || "-");
  const [pendingCars, setPendingCars] = useState(pendingCarsData?.length || "-");
  const [inspectionDone, setInspectionDone] = useState(activeCarsData?.length || "-");
  const [sellCars, setSellCars] = useState(sellCarsData?.length || "-");

  const [filteredCars, setFilteredCars] = useState(data || []);
  const [pageNo, setPageNo] = useState(0);
  const [deleteDealer] = useDeleteDealerMutation();
  const [open, setOpen] = useState(false);
  const [deleteid, setDeleteid] = useState();

  const itemsPerPage = 10;

  const handleOpen = (id) => {
    setOpen(!open);
    setDeleteid(id);
  };

  const handleOpen1 = () => {
    deleteDealerHandler(deleteid);
    setOpen(!open);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (error?.status === 401) {
      navigate("/signin");
    }
  }, [error, navigate]);

  const deleteDealerHandler = async (id) => {
    const res = await deleteDealer(id);
    // console.log(res);
  };

  const nextHandler = () => {
    setPageNo((prevPageNo) => {
      if (error?.status === 404) {
        return prevPageNo; // Keep pageNo unchanged
      } else {
        return prevPageNo + 1;
      }
    });
  };
   // For calculating Percentage
 const PertotalCars = Math.ceil((totalCars/totalCars)*100)
//  console.log("active",PertotalCars)

 const perActive = Math.ceil((activeCarsData/totalCars)*100)
//  console.log("active",perActive)

 const perPending = Math.ceil((pendingCars/totalCars)*100)
//  console.log("active",perPending)

 const perSold = Math.ceil((sellCars/totalCars)*100)
//  console.log("active",perSold)

 const perInspection = Math.ceil((activeCarsData/totalCars)*100)
//  console.log("active",perInspection)
  

  const columns = [
    {
      Header: "Sr. No",
      accessor: "serialNumber",
      Cell: (cell) => {
        const { pageSize } = cell.state; // Assuming you're using React Table's useTable hook
        const serialNumber = pageNo * pageSize + cell.row.index + 1;
        return serialNumber;
      }
    },
    {
      Header: "Code",
      accessor: "uniqueBeadingCarId",
    },
    {
      Header: "Id",
      accessor: "beadingCarId",
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
      Header: "Location",
      accessor: "area",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Status",
      accessor: "carStatus",
      Cell: (cell) => {
        return  cell.row.values.carStatus == "pending" ? (
            <Link to={`/inspector/carverify/${cell.row.values.beadingCarId}`} className="button-link">
          <Button variant="gradient" color="blue">
              Verify
          </Button>
            </Link>
        ) : (
            <Link to={`/inspector/carverify/${cell.row.values.beadingCarId}`} className="button">
          <Button variant="gradient" color="green">
              Done
          </Button>
            </Link>
        );
      },
    },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: (cell) => {
        return (
          <div>
            <div className="flex gap-2 justify-center items-center">
              <Link to={`/biddinglist/cardetails/${cell.row.values.beadingCarId}`}>
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
              <Link to={`/bidding/${cell.row.values.beadingCarId}/bideditcar`}>
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
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (data) {
      setTotalCars(data?.length);
      setActiveCars(activeCarsData?.length);
      setPendingCars(pendingCarsData?.length);
      setInspectionDone(activeCarsData?.length);
      setSellCars(sellCarsData?.length);
      setFilteredCars(data); // Initialize with all cars data
    }
  }, [data]);

  const handleFilterCars = (status) => {
    if (status === "ACTIVE") {
      setFilteredCars(activeCarsData);
    } else if (status === "PENDING") {
      setFilteredCars(pendingCarsData);
    } else if (status === "SOLD") {
      setFilteredCars(sellCarsData);
    } else {
      setFilteredCars(data);
    }
  };

  const startIndex = pageNo * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredCars ? filteredCars.slice(startIndex, endIndex) : [];

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
    <>
      {/* <h1 className="mt-2 text-xl ml-2 mb-5 font-bold">Car Listing</h1> */}
      <div className=" flex flex-wrap justify-center mx-5 mb-8 lg:mt-6  lg:grid lg:grid-cols-5 md:grid md:grid-cols-3">
        <div 
          onClick={() => handleFilterCars("ALL")}
          className="p-5"
        >
          {/* <div className="text-4xl font-bold text-white">{totalCars}</div>
          <div className="mt-2 font-medium">Total Cars</div> */}
          <Card className="w-full">
        <CardBody className=" justify-center items-center">
          <ApexCharts
            options={{
              chart: { type: 'radialBar',  height: window.innerWidth < 640 ? 250 : 200,},
              plotOptions: {
                radialBar: {
                  hollow: {     size: window.innerWidth < 640 ? '50%' : '40%', },
                  dataLabels: { 
                    name: {
                      show: false // Hide the series name
                    },
                    value: {
                      show: true ,// Ensure the percentage is shown
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7,
            
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
            series={[PertotalCars || 0 ]}
            type="radialBar"
            height={window.innerWidth < 640 ? 250 : 200}
           
          />
          <Typography className="flex justify-center items-center font-bold  ">
          Total Cars
</Typography>
<Typography className="flex justify-center items-center font-bold">
{totalCars}
</Typography>
         </CardBody>
         </Card>
        </div>
        <div 
          onClick={() => handleFilterCars("ACTIVE")}
          className="p-5"
        >
{/* 
          <div className="text-4xl font-bold text-white">{`${activeCars}/${totalCars}`}</div>
          <div className="mt-2 font-medium">Active Cars</div> */}
          <Card className="w-full ">
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
                      fontSize: '16px', // Adjust font size if needed
                      color: '#000', // Set text color
                      offsetY:+7,
                      show: true // Ensure the percentage is shown
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
          Active Cars
</Typography>

<Typography className="flex justify-center items-center font-bold">
{activeCars}
</Typography>
         </CardBody>
         </Card>
        </div>
        <div 
          onClick={() => handleFilterCars("PENDING")}
          className="p-5"
        >
          {/* <div className="text-4xl font-bold text-white">{`${pendingCars}/${totalCars}`}</div>
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
                      show: true ,// Ensure the percentage is shown
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7// Center the text vertically
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
            series={[perPending || 0 ]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold">
          Pending Cars
</Typography>
<Typography className="flex justify-center items-center font-bold">
{pendingCars}
</Typography>
         </CardBody>
         </Card>
        </div>
        <div 
          onClick={() => handleFilterCars("ACTIVE")}
          className="p-5"
        >
          {/* <div className="text-4xl font-bold text-white">{`${inspectionDone}/${totalCars}`}</div>
          <div className="mt-2 font-medium">Inspection Done Cars</div> */}
          {/* <Card className="w-full">
        <CardBody className=" justify-center items-center">
          <ApexCharts
            options={{
              chart: { type: 'radialBar', height: 200 },
              plotOptions: {
                radialBar: {
                  hollow: { size: '70%' },
                  dataLabels: { 
                    name: {
                      show: false // Hide the series name
                    },
                    value: {
                      show: true // Ensure the percentage is shown
                    }
                  }
                }
              },
              labels: [], // Clear any additional labels if needed
              tooltip: {
                enabled: false // Keep the tooltip enabled if you want to show percentage on hover
              }
            }}
            series={[perInspection]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold text-base">
          Inspection Done Cars
</Typography>
         </CardBody>
         </Card> */}

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
       
              },   colors: ['#28A745'],
              labels: [], // Clear any additional labels if needed
              tooltip: {
                enabled: false // Keep the tooltip enabled if you want to show percentage on hover
              }
            }}
            series={[perInspection || 0 ]}
            type="radialBar"
            height={200}
            
          />
          <Typography className="flex justify-center items-center font-bold  whitespace-nowrap" >
          Inspection Done Cars
</Typography>
<Typography className="flex justify-center items-center font-bold">
{inspectionDone}
</Typography>
         </CardBody>
         </Card>

         
        </div>
        <div 
          onClick={() => handleFilterCars("SOLD")}
          className="p-5"
        >
          {/* <div className="text-4xl font-bold text-white">{sellCars}</div>
          <div className="mt-2 font-medium">Sell Cars</div> */}
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
                      fontSize: '16px', // Adjust font size if needed
            color: '#000', // Set text color
            offsetY:+7,
                      show: true // Ensure the percentage is shown
                    }
                  }
                }
              },
              colors: ['#87CEEB'],
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
</Typography>
<Typography className="flex justify-center items-center font-bold">
{sellCars}
</Typography>
         </CardBody>
         </Card>
        </div>
      </div>
      <div className="mt-8">
        {error?.status === 404 ? (
          <div>
            <p className="text-3xl font-semibold ml-6">No Data Available</p>
            <div className="flex ml-6 mt-2 shrink-0 flex-col gap-2 sm:flex-row">
              
                <Link to={`/inspector/car/add`}>
                  <Button color="indigo">Add Bid Car</Button>
                </Link>
              </div>
          </div>
        ) : (
          <div>
            <Card className="h-full w-full">
              <Dialog open={open} handler={handleOpen}>
                <DialogBody className="flex justify-center">
                  <p className="font-semibold text-xl">Are you sure you want to delete?</p>
                </DialogBody>
                <DialogFooter className="flex justify-center">
                  <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={handleOpen1}>
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
              <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className=" flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                  Bidding Car List
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                  See Information About All Bidding Cars
                  </Typography>
                </div>
                <Link to={`/inspector/car/add`}>
                  <Button color="indigo">Add Bid Car</Button>
                </Link>
              </div>
            </CardHeader>
              <CardBody className="overflow-scroll px-0">
                <TableComponent columns={columns} data={paginatedData} />
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-normal"
                >
                  Page {pageNo + 1}
                </Typography>
                <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={pageNo <= 0}
                  onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
                >
                  Previous
                </Button>
              
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setPageNo((prev) => (filteredCars?.length > endIndex ? prev + 1 : prev))}
                  disabled={filteredCars?.length <= endIndex}
                >
                  Next
                </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
