/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { DialogBody, Tooltip } from "@material-tailwind/react";
import StatusDialogeBox2 from "../../ui/StatusDialogeBox2";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Dialog,
  DialogFooter,
} from "@material-tailwind/react";
import TableComponent from "../../components/table/TableComponent";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AddSalesForm } from "../../components/admin/AddSalesForm";
import {
  useDeleteSellerMutation,
  useGetAllSellerQuery,
} from "../../services/salesAPI";
import StatusDialogeBox from "../../ui/StatusDialogeBox";
import SallerStatusActive from "./SallerStatusActive";
import { FiLoader } from 'react-icons/fi'; 
export default function SalesList() {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const emptyImage = "..\\..\\cars\\emptyfolder.png";

  const { data, isLoading, error ,refetch } = useGetAllSellerQuery({pageNo, pageSize});
  
  const [deleteSeller] = useDeleteSellerMutation();
  const [open, setOpen] = useState(false);
  const [deleteid, setDeleteid] = useState();

  const handleOpen = (id) => {
    setOpen(!open);
    setDeleteid(id);
  };

  const handleOpen1 = (id) => {
    deleteSellerHandler(deleteid);
    setOpen(!open);
  };

  const navigate = useNavigate();
  if (error?.status === 401) {
    return navigate("/signin");
  }

  const deleteSellerHandler = async (id) => {
    const res = await deleteSeller(id);
   
  };

  const nextHandler = () => {
    if (!error && data?.list?.length === pageSize) {
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
      Header: "ID",
      accessor: "salesPersonId",
    },
    {
      Header: "Name",
      accessor: (row) => `${row.firstName} ${row.lastName}`, // Combine firstName and lastName for sorting/filtering purposes
    },
    {
      Header: "Location",
      accessor: "area",
    },
    {
      Header: "Phone",
      accessor: "mobileNo",
    },
    // {
    //   Header: "Address",
    //   accessor: "address",
    // },
    {
      Header: "City",
      accessor: "city",
    },

    {
      Header: "user id",
      accessor: "userId",
    },

    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Dealers",
      accessor: "totalAddedDealers",
      Cell: (cell) => {
        return (
          <div>
              <Link to={`/admin/salesDealers/${cell.row.values.userId}`}>
               {cell.row.values.totalAddedDealers}
              </Link>
          </div>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (cell) => {
        return (
          <div>
            <div className="flex gap-2 justify-center items-center">
              <SallerStatusActive
                salesPersonId={cell.row.values.salesPersonId}
                status={cell.row.values.status}
              />
            </div>
          </div>
        );
      },
    },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: (cell) => {
        
        return (
          <div>
            <div className="flex gap-2 justify-center items-center  ">
              <Link to={`/admin/seller/info/${cell.row.values.userId}`}>
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

              <Link
                to={`/admin/seller/edit/${cell.row.values.userId}/${cell.row.values.salesPersonId}`}
              >
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
              {/* <div
                onClick={() => handleOpen(cell.row.values.dealer_id)}
              >
                <Tooltip content="Delete" >
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
                </Tooltip>
              </div> */}
            </div>
          </div>
        );
      },
    },
  ];

  let sellerApiData;
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  } else {
    sellerApiData = data?.list;
  }
 
  return (
    <>
      {error?.status === 404 ? (
        <div>
          <div className="flex shrink-0 gap-2 sm:flex-row justify-end mr-5 mt-5">
            <AddSalesForm refetch={refetch} />
          </div>
           <div className="flex justify-center mt-10">
           <img
          className="w-40"
          src={emptyImage}
          alt="no data"
        />
         </div>
          <p className="flex justify-center text-2xl md:text-3xl font-semibold">No Data Available</p>
          
        </div>
      ) : (
        <div>
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
              <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <div>
                  <Typography variant="h5" color="blue-gray" className="text-center lg:text-start">
                    Sales Person List
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    See Information About All Sales Person
                  </Typography>
                  <Typography className="hidden xl:block">
        <div className="flex">
      <Link to={"/"}>
              <p className="hover:text-blue-900"> Home </p> 
              </Link>
               /
              <p >Seller</p>
              
              </div>
      </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <AddSalesForm refetch={refetch} />
                </div>
              </div>
            </CardHeader>
            <CardBody className="md:overflow-auto overflow-scroll px-1">
              <TableComponent columns={columns} data={sellerApiData} />
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="medium"
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
                  onClick={prevHandler}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={nextHandler}
                  disabled={data?.list?.length < pageSize}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
