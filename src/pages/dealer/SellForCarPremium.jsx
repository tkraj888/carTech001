/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  useCarCountByCartypeQuery,
  useDealerIdByPremiumCarQuery,
} from "../../services/carAPI";
import { Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import ApexCharts from "react-apexcharts";
import TableComponent from "../../components/table/TableComponent";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Dialog,
  DialogFooter,
  DialogBody,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { useCarRemoveMutation } from "../../services/carAPI";
import { MdPendingActions } from "react-icons/md";
import StatusDialogeBox from "../../ui/StatusDialogeBox";
//import AddDealerCar from "../../components/dealer/AddDealerCar";
import { useCarUpdateMutation } from "../../services/carAPI";
import { FiLoader } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const SellForCarPremium = () => {
  const [pageNo, setPageNo] = useState(0);
  const { id } = useParams();
  const {carType} = useParams();

  const [carRemove] = useCarRemoveMutation();
  const active = "ACTIVE";
  const pending = "PENDING";
  const sell = "SOLD";
  const deactive = "DEACTIVATE";
  const [selectedStatus, setSelectedStatus] = useState("ACTIVE");

  const { data: activeCounts, refetch: activeCountRefetch } =
    useCarCountByCartypeQuery({ status: active, id: id });
  const { data: pendingCounts, refetch: pendingCountRefetch } =
    useCarCountByCartypeQuery({ status: pending, id: id });
  const { data: deactivateCounts, refetch: deactiveCountRefetch } =
    useCarCountByCartypeQuery({ status: deactive, id: id });
  const { data: soldCounts, refetch: soldCountsRefetch } =
    useCarCountByCartypeQuery({ status: sell, id: id });
  const {
    data: activeData = [],
    isLoading: isLoadingActive,
    error: errorActive,
    refetch: refetchActive,
  } = useDealerIdByPremiumCarQuery({ id, pageNo, status: active, carType });
  const {
    data: pendingData = [],
    isLoading: isLoadingPending,
    error: errorPending,
    refetch: pendingRefeatch,
  } = useDealerIdByPremiumCarQuery({ id, pageNo, status: pending });
  const {
    data: sellData = [],
    isLoading: isLoadingSell,
    error: errorSell,
    refetch: sellRefeatch,
  } = useDealerIdByPremiumCarQuery({ id, pageNo, status: sell });
  const {
    data: deactiveData = [],
    isLoading: isLoadingDeactive,
    error: errorDeactive,
    refetch: refetchDeactive,
  } = useDealerIdByPremiumCarQuery({ id, pageNo, status: deactive });

  // Example of using the data safely
  const activeItems = errorActive?.status === 404 ? [] : activeData?.list || [];
  const pendingItems =
    errorPending?.status === 404 ? [] : pendingData?.list || [];
  const sellItems = errorSell?.status === 404 ? [] : sellData?.list || [];
  const deactiveItems =
    errorDeactive?.status === 404 ? [] : deactiveData?.list || [];

  const activeCount = activeCounts?.object;
  const pendingCount = pendingCounts?.object;
  const sellCount = soldCounts?.object;
  const deactiveCount = deactivateCounts?.object;

  const data = [];
  const activeCarsData = data?.list?.filter(
    (car) => car?.carStatus === "ACTIVE"
  );

  const [totalCars, setTotalCars] = useState(activeCount || 0);
  const [activeCars, setActiveCars] = useState(activeCount || 0);
  const [pendingCars, setPendingCars] = useState(pendingCount || 0);
  const [inspectionDone, setInspectionDone] = useState(activeCount || 0);
  const [sellCars, setSellCars] = useState(sellCount || 0);
  const [deactiveCars, setdeactiveCars] = useState(deactiveCount || 0);

  const [open, setOpen] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openActivate, setOpenActivate] = useState(false);
  const [deactivateId, setDeactivateId] = useState();
  const [deleteid, setDeleteid] = useState();
  const [list, setList] = useState([]);

  const [carUpdate] = useCarUpdateMutation(deactivateId);
  const [selectedOption, setSelectedOption] = useState(false);

  const token = Cookies.get("token");

  let jwtDecodes;

  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const handleFilterCars = (data) => {
    setList(data?.list ?? []);
  };

  const statusDataMap = {
    active: data,
    pending: pendingData,
    sell: sellData,
    deactive: deactiveData,
  };

  const handleFilterByStatus = (status) => {
    const data = statusDataMap[status];
    handleFilterCars(data);
  };

  const renderTable = () => {
    switch (selectedStatus) {
      case active:
        return activeItems.length > 0 ? (
          <TableComponent columns={columns} data={activeItems} />
        ) : (
          <p>No active cars available</p>
        );
      case pending:
        return pendingItems.length > 0 ? (
          <TableComponent columns={columns} data={pendingItems} />
        ) : (
          <p>No pending cars available</p>
        );
      case sell:
        return sellItems.length > 0 ? (
          <TableComponent columns={columns} data={sellItems} />
        ) : (
          <p>No sold cars available</p>
        );
      case deactive:
        return deactiveItems.length > 0 ? (
          <TableComponent columns={columns} data={deactiveItems} />
        ) : (
          <p>No deactivated cars available</p>
        );
      default:
        return null;
    }
  };

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  const handleOpenDeactivate = (carId) => {
    setOpenDeactivate(!openDeactivate);
    setDeactivateId(carId);
  };
  const PertotalCars = Math.ceil((totalCars / totalCars) * 100);
  const perActive = data ? Math.floor((activeCars / totalCars) * 100) : 0;
  const perPending = Math.ceil((pendingCars / totalCars) * 100);
  const perSold = Math.floor((sellCars / totalCars) * 100);
  const perDeactive = deactiveData
    ? Math.floor((deactiveCars / totalCars) * 100)
    : 0;

  const handleOpenAactivate = (carId) => {
    setOpenActivate(!openActivate);
    setDeactivateId(carId);
  };

  const deactivateStatus = async () => {
    const data = {
      carStatus: "DEACTIVATE",
    };
    const res = await carUpdate({ data, carId: deactivateId });
    setSelectedOption("DEACTIVATE");
    refetchActive();
    pendingRefeatch();
    sellRefeatch();
    refetchDeactive();
    activeCountRefetch();
    pendingCountRefetch();
    soldCountsRefetch();
    deactiveCountRefetch();
    setOpenDeactivate(!openDeactivate);
  };

  const activateCarStatus = async () => {
    const data = {
      carStatus: "ACTIVE",
    };
    const res = await carUpdate({ data, carId: deactivateId });
    setSelectedOption("ACTIVE");
    refetchActive();
    pendingRefeatch();
    sellRefeatch();
    refetchDeactive();
    activeCountRefetch();
    pendingCountRefetch();
    soldCountsRefetch();
    deactiveCountRefetch();
    setOpenActivate(!openActivate);
  };

  const handleOpen = (carId) => {
    setOpen(!open);
    setDeleteid(carId);
  };

  const handleOpen1 = (carId) => {
    deleteDealerHandler(deleteid);
    setOpen(!open);
  };

  const deleteDealerHandler = async (carId) => {
    const res = await carRemove({ id, carId });
  };
  useEffect(() => {
    if (data || pendingData || sellData || deactiveData) {
      const totalCars =
        (activeCount ?? 0) +
        (pendingCount ?? 0) +
        (sellCount ?? 0) +
        (deactiveCount ?? 0);
      setTotalCars(totalCars);
      setActiveCars(activeCount || "-");
      setPendingCars(pendingCount || "-");
      setInspectionDone(activeCount || "-");
      setSellCars(sellCount || "-");
      setdeactiveCars(deactiveCount || "-");
    }
    if (data?.list?.length !== 0) {
      setList(data?.list);
    } else if (pendingData?.list?.length !== 0) {
      setList(pendingData?.list);
    } else if (activeCarsData?.list?.length !== 0) {
      setList(activeCarsData?.list);
    } else if (deactiveData?.list?.length !== 0) {
      setList(deactiveData.list);
    } else {
      // Optional: handle the case where none of the lists are available
      setList([]);
    }
  }, [data, pendingData, sellData, deactiveData]);
  const nextHandler = () => {
    setPageNo((prevPageNo) => {
      // Check if the error status is 404
      if (errorActive?.status === 404) {
        return prevPageNo; // Keep pageNo unchanged
      } else {
        // Increment pageNo
        return prevPageNo + 1;
      }
    });
  };

  // eslint-disable-next-line no-unused-vars
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
      accessor: "mainCarId",
    },

    {
      Header: "ID",
      accessor: "carId",
    },

    {
      Header: "Brand ",
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
              <StatusDialogeBox
                status={cell.row.values.carStatus}
                carId={cell.row.values.carId}
                refetchActive={refetchActive}
                pendingRefeatch={pendingRefeatch}
                sellRefeatch={sellRefeatch}
                refetchDeactive={refetchDeactive}
                activeCountRefetch={activeCountRefetch}
                pendingCountRefetch={pendingCountRefetch}
                soldCountsRefetch={soldCountsRefetch}
                deactiveCountRefetch={deactiveCountRefetch}
              />
            </div>
          </div>
        );
      },
    },

    {
      Header: "Action",
      accessor: "Edit",
      Cell: (cell) => {
        return (
          <div>
            <div className="flex gap-2 justify-center items-center  ">
              {/* <Link to={`/car/${cell.row.values.carId}/pendinguser`}>
                <div className="w- h-">
                  <MdPendingActions color="#b09b12" className="h-6 w-6" />
                </div>
              </Link> */}
              <Link to={`/carlist/cardetails/premium/${cell.row.values.carId}`}>
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
              {userRole !== "ADMIN" ? (
                <Link to={`/dealer/premium/${id}/car/edit/${cell.row.values.carId}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    color="green"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
              ) : null}
              {/* <div onClick={() => handleOpen(cell.row.values.carId)}>
                <Tooltip content="Delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    color="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </Tooltip>
              </div> */}

              {cell.row.values.carStatus == "ACTIVE" && (
                <p
                  onClick={() => handleOpenDeactivate(cell.row.values.carId)}
                  className="cursor-pointer"
                >
                  Deactivate
                </p>
              )}
              {cell.row.values.carStatus == "DEACTIVATE" && (
                <p
                  onClick={() => handleOpenAactivate(cell.row.values.carId)}
                  className="cursor-pointer"
                >
                  Activate
                </p>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  let dealersCarData;
  if (isLoadingActive) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  } else {
    dealersCarData = data?.list;
  }

  return (
    <>
      <div className="justify-center  lg:grid lg:grid-cols-5  md:grid md:grid-cols-3">
        <div className="p-5">
          <Card className="w-full">
            <CardBody className="justify-center items-center">
              <ApexCharts
                options={{
                  chart: { type: "radialBar", height: 200 },
                  plotOptions: {
                    radialBar: {
                      hollow: { size: "40%" },
                      dataLabels: {
                        name: {
                          show: false, // Hide the series name
                        },
                        value: {
                          fontSize: "16px", // Adjust font size if needed
                          color: "#000", // Set text color
                          offsetY: +7,
                          show: true, // Ensure the percentage is shown
                        },
                      },
                    },
                  },
                  colors: ["#007BFF"],
                  labels: [], // Clear any additional labels if needed
                  tooltip: {
                    enabled: false, // Disable tooltip if not needed
                  },
                }}
                series={[PertotalCars || 0]} // Default to 0% if PertotalCars is undefined or null
                type="radialBar"
                height={200}
              />
              <Typography className="flex justify-center items-center font-bold">
                Total Cars
              </Typography>
              <Typography className="flex justify-center items-center font-bold">
                {totalCars}
              </Typography>
            </CardBody>
          </Card>
        </div>

        <div
          onClick={() => {
            setSelectedStatus(active);
            setPageNo(0);
          }}
          className="p-5"
        >
          {/* <div className="text-4xl font-bold text-white">{activeCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Active Cars</div> */}
          <Card className="w-full">
            <CardBody className=" justify-center items-center">
              <ApexCharts
                options={{
                  chart: { type: "radialBar", height: 200 },
                  plotOptions: {
                    radialBar: {
                      hollow: { size: "40%" },
                      dataLabels: {
                        name: {
                          show: false, // Hide the series name
                        },
                        value: {
                          fontSize: "16px", // Adjust font size if needed
                          color: "#000", // Set text color
                          offsetY: +7,
                          show: true, // Ensure the percentage is shown
                        },
                      },
                    },
                  },
                  colors: ["#28A745"],
                  labels: [], // Clear any additional labels if needed
                  tooltip: {
                    enabled: false, // Keep the tooltip enabled if you want to show percentage on hover
                  },
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
          onClick={() => {
            setSelectedStatus(pending);
            setPageNo(0);
          }}
          className="p-5"
        >
          {/* <div className="text-4xl font-bold text-white">{pendingCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Pending Cars</div> */}

          <Card className="w-full">
            <CardBody className=" justify-center items-center">
              <ApexCharts
                options={{
                  chart: { type: "radialBar", height: 200 },
                  plotOptions: {
                    radialBar: {
                      hollow: { size: "40%" },
                      dataLabels: {
                        name: {
                          show: false, // Hide the series name
                        },
                        value: {
                          fontSize: "16px", // Adjust font size if needed
                          color: "#000", // Set text color
                          offsetY: +7,
                          show: true, // Ensure the percentage is shown
                        },
                      },
                    },
                  },
                  colors: ["#FFC107"],
                  labels: [], // Clear any additional labels if needed
                  tooltip: {
                    enabled: false, // Keep the tooltip enabled if you want to show percentage on hover
                  },
                }}
                series={[perPending || 0]}
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
        {/* <div onClick={handleFilterSellCars} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-5 text-center bg-blue-500 rounded-2xl shadow-xl sm:mb-2 mb-5 sm:mr-5 cursor-pointer">
          <div className="text-4xl font-bold text-white">{sellCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Sold Cars</div>
        </div> */}
        <div
          onClick={() => {
            setSelectedStatus(sell);
            setPageNo(0);
          }}
          className="p-5"
        >
          <Card className="w-full">
            <CardBody className=" justify-center items-center">
              <ApexCharts
                options={{
                  chart: { type: "radialBar", height: 200 },
                  plotOptions: {
                    radialBar: {
                      hollow: { size: "40%" },
                      dataLabels: {
                        name: {
                          show: false, // Hide the series name
                        },
                        value: {
                          fontSize: "16px", // Adjust font size if needed
                          color: "#000", // Set text color
                          offsetY: +7,
                          show: true, // Ensure the percentage is shown
                        },
                      },
                    },
                  },
                  colors: ["#87CEEB"],
                  labels: [], // Clear any additional labels if needed
                  tooltip: {
                    enabled: false, // Keep the tooltip enabled if you want to show percentage on hover
                  },
                }}
                series={[perSold || 0]}
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
        <div
          onClick={() => {
            setSelectedStatus(deactive);
            setPageNo(0);
          }}
          className="p-5"
        >
          {/* <div className="text-4xl font-bold text-white">{deactiveCars}/{totalCars}</div>
          <div className="mt-2 font-medium">Deactive Cars</div> */}
          <Card className="w-full">
            <CardBody className=" justify-center items-center">
              <ApexCharts
                options={{
                  chart: { type: "radialBar", height: 200 },
                  plotOptions: {
                    radialBar: {
                      hollow: { size: "40%" },
                      dataLabels: {
                        name: {
                          show: false, // Hide the series name
                        },
                        value: {
                          fontSize: "16px", // Adjust font size if needed
                          color: "#000", // Set text color
                          offsetY: +7,
                          show: true, // Ensure the percentage is shown
                        },
                      },
                    },
                  },
                  colors: ["#FF0000"],
                  labels: [], // Clear any additional labels if needed
                  tooltip: {
                    enabled: false, // Keep the tooltip enabled if you want to show percentage on hover
                  },
                }}
                series={[perDeactive || 0]}
                type="radialBar"
                height={200}
              />
              <Typography className="flex justify-center items-center font-bold">
                Deactive Cars
              </Typography>
              <Typography className="flex justify-center items-center font-bold">
                {deactiveCars}
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
      {errorActive?.status === 404 && list?.length === 0 ? (
        <div>
          <p>No Data Available</p>

          {userRole === "DEALER" ? (
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link to={`/dealer/premium/${id}/addcar`}>
                <Button color="indigo">Add Premium Car</Button>
              </Link>
            </div>
          ) : (
            <p className="hover:text-blue-900"> </p>
          )}
        </div>
      ) : (
        <div>
          {/* <p>Sell for car</p> */}
          <Card className="h-full w-full">
            <Dialog open={open} handler={handleOpen}>
              <DialogBody className="flex justify-center">
                <p className="font-semibold text-xl">
                  Are you sure want to delete?
                </p>
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
                    Car Listing
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    See Information About All Cars
                  </Typography>
                </div>

                {userRole === "DEALER" ? (
                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    <Link to={`/dealer/premium/${id}/addcar`}>
                      <Button color="indigo">Add Premium Car</Button>
                    </Link>
                  </div>
                ) : (
                  <p className="hover:text-blue-900"> </p>
                )}
              </div>

              <div className="overflow-scroll px-0">
                {isLoadingActive ||
                isLoadingPending ||
                isLoadingSell ||
                isLoadingDeactive ? (
                  <p>Loading data...</p>
                ) : (
                  renderTable()
                )}
              </div>
            </CardHeader>
            {errorActive ? (
              <p className="text-center">car is not found</p>
            ) : (
              <div></div>
            )}

            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography color="blue-gray" className="font-normal">
                Page {pageNo + 1}
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={pageNo <= 0}
                  onClick={() => setPageNo((a) => a - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={nextHandler}
                  disabled={list?.length < 10}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Dectivate Popup */}
      {openDeactivate && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-3">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to deactivate?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={deactivateStatus}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirm
              </button>
              <button
                onClick={handleOpenDeactivate}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {openActivate && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to Activate?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={activateCarStatus}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirm
              </button>
              <button
                onClick={handleOpenAactivate}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellForCarPremium;
