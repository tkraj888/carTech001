/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
 
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
 
} from "@material-tailwind/react";

import TableComponent from "../../components/table/TableComponent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLoader } from 'react-icons/fi';
import InspectorStatusDialogBox from "../adminpages/InspectorStatusDialogBox";
import {useListCarSellQuery} from "../../services/userAPI"
import { motion } from "framer-motion";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
 
export default function AdminUserReq() {
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const token = Cookies.get("token");
  let jwtDecodes;
  if(token){
    jwtDecodes = jwtDecode(token) 
  }
const userId = token ? jwtDecodes?.userId : null;
const {data,error, isLoading , refetch } = useListCarSellQuery(userId);
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  },[refetch])
  if (error?.status === 401) {
    return navigate("/signin");
  }
  const nextHandler = () => {
    setPageNo((prevPageNo) => {
      if (error?.status === 404) {
        return prevPageNo; // Keep pageNo unchanged
      } else {
        // Increment pageNo
        return prevPageNo + 1;
      }
    });
  };



 if (!data) {
  <div>NO Data</div>
 }
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
      Header: "Brand",
      accessor:"brand"
    },
    {
      Header: "Model",
      accessor:"model"
    },
    {
      Header: "Variant",
      accessor:"variant"
    },
    {
      Header: "Address ",
      accessor:"address1"
    },
    {
      accessor : "userFormId",
      isVisible : false
    },
    {
      Header: "Status",
      accessor: "status",  
      Cell: (cell) => {
        const Status = cell.row.values.status;
        const carId = cell.row.values.userFormId
        return (
          <div>
            {Status === "active" ? (
              <Link to={`/user/car/status/${carId}`}>
             <div className="relative cursor-pointer group">
             <motion.p
               whileHover={{ scale: 1.3, originX: 0.5 , }} // Set originX to 0.5 to scale from the center
               className="text-yellow-800 uppercase font-bold"
             >
               {Status}
             </motion.p>
             {/* Underline */}
             <div className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-yellow-800 transition-all duration-300 group-hover:w-[50%] group-hover:-translate-x-1/2"></div>
           </div>
           </Link>
           ) : 
              (<div>
                 <Link to={`/user/car/status/${carId}`}>
             <div className="relative cursor-pointer group">
             <motion.p
              //  whileHover={{ scale: 1.3, originX: 0.5 , }} // Set originX to 0.5 to scale from the center
               className="text-orange-400 uppercase font-bold"
             >
               {Status}
             </motion.p>
             {/* Underline */}
             <div className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-green-800 transition-all duration-300 group-hover:w-[50%] group-hover:-translate-x-1/2"></div>
           </div>
           </Link>
              </div>)}
            
          </div>
        );
      },
    },
      {
        Header: "Actions",
        accessor: "Actions",
        Cell: (cell) => {
          const userFormId = cell.row.values.userFormId
          return (
            <div>
              <div className="flex gap-2 justify-center items-center">
              <Link to={`/user/sell/edit/${userFormId}`}>
                {/* <Link to={`/editsellform/${userFormId}/${cell.row.original.inspectorProfileId}`}> */}
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
 
  
  let dealerApiData;
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  } else {
    dealerApiData = data?.list;
  }

  return (
    <>
      {error?.status === 404 ? (
        <div>
          <div className="flex shrink-0 gap-2 sm:flex-row justify-end mr-5 mt-5">
          <Link to={`/sellcarform`}>
              <Button color="indigo">Sell Car</Button>
            </Link>
          </div>
          <div className="flex justify-center mt-10">
           {/* <img
          className="w-40"
          src={emptyImage}
          alt="no data"
        /> */}
         </div>
          <p className="flex justify-center text-2xl md:text-3xl font-semibold">No Data Available</p>
         
         
        </div>
      ) : (
        <div>
          <Card className="h-full w-full">
           
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-center lg:text-start"
                  >
                   Sell Car List
                  </Typography>
                  <Typography
                    color="gray"
                    className="mt-1 font-normal text-center lg:text-start"
                  >
                    See Information About All Sell Car
                  </Typography>
                  <span className="mt-1 hidden xl:block">
                <div className="flex">
                <Link to={"/"}>
              <p className="hover:text-blue-900"> Home</p>
              </Link>
              /
 
              <p>Sell Car</p>
              </div>
              </span>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row items-center ">
                <Link to={`/sellcarform`}>
              <Button color="indigo">Sell Car</Button>
            </Link>
              </div>
              </div>
            </CardHeader>
            <CardBody className="md:overflow-auto overflow-scroll px-1">
              <TableComponent columns={columns} data={dealerApiData} />
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
                  onClick={() => setPageNo((a) => a - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={nextHandler}
                  disabled={data?.list?.length < 10}
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
{
  /* <AddDealerForm /> */
}