/* eslint-disable no-unused-vars */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { motion } from "framer-motion"
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import {
  useGetallInspectorQuery,useInspectorByIdQuery
} from "../../services/inspectorapi";
import {
  useGetUserRequestDataQuery,
  useListbySalePersonIdQuery,
  useListCarStatusQuery,
  useUserSaleReqFormEditMutation,
  useUserSaleReqFormUpdateMutation,
} from "../../services/userAPI";
import TableComponent from "../../components/table/TableComponent";
import { useState } from "react";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";



import { jwtDecode } from "jwt-decode";
import { FiLoader } from "react-icons/fi";

export default function AdminUserReq() {
  const token = Cookies.get("token");

  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }
  const salesPersonId = token ? jwtDecodes?.salesPersonId : null;
  const salesUserId = token ? jwtDecodes?.userId : null;
  const {status} = useParams();
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedInspectors, setSelectedInspectors] = useState({});
  const { data: userdata, isLoading: isUserDataLoading, error: userError } = useGetUserRequestDataQuery({ page: pageNo, size: pageSize });
  const { data: acceptData, isLoading: isAcceptDataLoading, error: acceptError } = useListbySalePersonIdQuery({salesPersonId: salesUserId,  page: pageNo, size: pageSize });
  const { data : pendingData , isLoading: isPendingLoading, error : pendingError } = useListCarStatusQuery("pending");
  const { data: inspectorData, isLoading: isInspectorDataLoading, error: inspectorError } = useGetallInspectorQuery({ pageNo, pageSize });
  const [ userReqUpdate ] = useUserSaleReqFormUpdateMutation();
  const navigate = useNavigate();
  if (userError?.status === 401) {
    return navigate("/signin");
  }

  const nextHandler = () => {
    if (userdata?.list?.length >= pageSize) {
      setPageNo((prevPage) => prevPage + 1);
    }
  };

  const prevHandler = () => {
    if (pageNo > 0) {
      setPageNo((prevPage) => prevPage - 1);
    }
  };

  // Filter userdata based on salesPersonId being null
  let filteredData = [];
  if(status === "active"){
     filteredData = acceptData?.list;
  }else{
    filteredData = pendingData?.list;
  }
  const columns = [
    {
      Header: "Sr. No",
      accessor: "serialNumber",
      Cell: (cell) => {
        const serialNumber = pageNo * pageSize + cell.row.index + 1;
        return serialNumber;
      },
    },
    {
      Header: "CarOwnerName",
      accessor: "carOwnerName",
    },
    {
      Header: "Address",
      accessor: "address1",
    },
    {
      Header: "Brand",
      accessor: "brand",
    },
    {
      Header: "Variant",
      accessor: "model",
    },
    {
      Header: "Status",
      accessor: "status",  
      Cell: (cell) => {
        const Status = cell.row.values.status;
        return (
          <div>
            {Status === "pending" ? (
             <div className="relative cursor-pointer group">
             <motion.p
               whileHover={{ scale: 1.3, originX: 0.5 }}
               className="text-yellow-800 uppercase "
             >
               {Status}
             </motion.p>
             <div className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-yellow-800 transition-all duration-300 group-hover:w-[50%] group-hover:-translate-x-1/2"></div>
           </div>
           ) : (
              <div>
                <motion.p whileHover={{ scale: 1.3, originX: 0.5 }}>
                  <p className="text-green-500 uppercase cursor-pointer group">
                    {Status}
                  </p>
                </motion.p>
                <div className="absolute left-1/2 bottom-0 w-0 h-0.5 text-green-500 transition-all duration-300 group-hover:w-[50%] group-hover:-translate-x-1/2"></div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      Header: "Contact No",
      accessor: "mobileNo",
    },
    {
      Header: "Pincode",
      accessor: "pinCode",
    },
    {
      Header: "Select Inspector",
      Cell: (cell) => {
        const { row } = cell;
        const userFormId = row.original.userFormId;
        const InspectorID = row.original.inspectorId;

        const handleInspectorChangeAndSubmit = async (e, userFormId) => {
          const inspectorId = e.target.value;
          setSelectedInspectors((prevState) => ({
            ...prevState,
            [userFormId]: inspectorId,
          }));

          const updatedData = {
            inspectorId: inspectorId,
            salesPersonId: salesUserId,
          };

          try {
            const response = await userReqUpdate({ updatedData, userFormId });
       
            toast.success("Inspector Updated Successfully!", {
              autoClose: 1000, 
            });
          } catch (err) {
            // console.error("Failed to update the form:", err);
            toast.error("Please Try Again", {
              autoClose: 1000, 
            });
          }
        };

        return (
          <select
            value={InspectorID || ""}
            onChange={(e) => handleInspectorChangeAndSubmit(e, userFormId)}
            className={InspectorID ? " text-green-600 " : "text-red-600"}
          >
            <option value="" disabled className="font-bold">
              Select Inspector
            </option>
            {inspectorData?.list.map((inspector) => (
              <option
                className="font-bold"
                key={inspector.userId}
                value={inspector.userId}
              >
                {`${inspector.firstName} ${inspector.lastName}`}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      Header: "Edit",
      accessor: "Actions",
      Cell: (cell) => {
        const userFormId = cell.row.original.userFormId;
        return (
          <div className="flex gap-2 justify-center items-center">
            <Link to={`/Seller/UserRequest/Edit/${userFormId}`}>
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
        );
      },
    },
  ];

  if (isUserDataLoading || isInspectorDataLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-gray-800 h-16 w-16" />
      </div>
    );
  }

  // if (userError?.status === 404) {
  //   return (
  //     <div className="flex flex-col justify-center items-center mt-10">
  //       <img className="w-40" src={emptyImage} alt="No data" />
  //       <p className="text-2xl md:text-3xl font-semibold">No Data Available</p>
  //     </div>
  //   );
  // }

  return (
    <Card className="h-full w-full">

      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <Typography variant="h5" color="blue-gray" className="text-center lg:text-start">
              User Request List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-center lg:text-start">
              See Information About All User Requests
            </Typography>
            <span className="mt-1 hidden xl:block">
              <div className="flex">
                <Link to="/"> <p className="hover:text-blue-900"> Home </p> </Link> / <p> User Request </p>
              </div>
            </span>
          </div>
        </div>
      </CardHeader>
      <div className="flex justify-center space-x-4">
      <Card className="w-96">
      <Link to="/seller/request/active">
        <CardBody>
            <Typography variant="h5" color={status === "active" ? 'green' : 'blue-gray'} className="mb-2">
              My User Sell Form Request
            </Typography>
        </CardBody>
        </Link>
      </Card>
      <Card className="w-96">
        <Link to="/seller/request/pending" >
        <CardBody>
            <Typography variant="h5" color={status === "pending" ? 'green' : 'blue-gray'} className="mb-2">
              Pending Request
            </Typography>
        </CardBody>
        </Link>
      </Card>
    </div>


      <CardBody className="md:overflow-auto overflow-scroll px-1">
        <TableComponent columns={columns} data={filteredData || []} />
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="medium" color="blue-gray" className="font-normal">
          Page {pageNo + 1}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={prevHandler} disabled={pageNo <= 0}>
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={nextHandler}
            disabled={userdata?.list?.length < pageSize}
          >
            Next
          </Button>
        </div>
      </CardFooter>
      <ToastContainer />
    </Card>
  );
}
