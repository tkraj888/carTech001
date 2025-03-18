import { useNavigate } from "react-router-dom";
import { DialogBody} from "@material-tailwind/react";
// import StatusDialogeBox2 from "../../ui/StatusDialogeBox2";
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
import {
  useDeleteDealerMutation,
  useGetAllDealerQuery,
} from "../../services/dealerAPI";
import TableComponent from "../../components/table/TableComponent";
import { useState } from "react";
import { AddDealerForm } from "../../components/admin/AddDealerForm";
// import { Link } from "react-router-dom";
import { FiLoader } from 'react-icons/fi'; 
export default function CarListTable() {
    const [pageNo, setPageNo] = useState(0);
  // console.log(pageNo);
  const { data, isLoading, error } = useGetAllDealerQuery(pageNo);
// console.log(data)
  const [deleteDealer] = useDeleteDealerMutation();
  const [open, setOpen] = useState(false);
  const [deleteid ,setDeleteid] = useState()
 
  const handleOpen = (id) => {
    setOpen(!open);
    setDeleteid(id);
  };
 
  const handleOpen1 = () => {
    deleteDealerHandler(deleteid)
    setOpen(!open)
  };
 
  const navigate = useNavigate();
  if (error?.status === 401) {
    return navigate("/signin");
  }
 
  const deleteDealerHandler = async (id) => {
    const res = await deleteDealer(id);
    res;
    // console.log(res);
  };
  const nextHandler = () => {
    setPageNo((prevPageNo) => {
      // Check if the error status is 404
      if (error?.status === 404) {
        // console.log("click");
        // console.log(prevPageNo);
        // Display message or perform any action indicating that it's the last page
        // console.log("You are on the last page.");
        return prevPageNo; // Keep pageNo unchanged
      } else {
        // Increment pageNo
        return prevPageNo + 1;
      }
    });
  };
 
  const columns = [
    {
      Header: "ID",
      accessor: "dealer_id",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
 
    {
      Header: "Last Name ",
      accessor: "lastName",
    },
    {
      Header: "Location",
      accessor: "area",
    },
    {
      Header: "Phone",
      accessor: "mobileNo",
    },
 
    {
      Header: "user id",
      accessor: "userId",
      disableSortBy: true,
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   Cell: (cell) => {
    //     const a = cell.row.values.status
    //     console.log(a)
    //     return (
    //       <div>
    //         <div className="flex gap-2 justify-center items-center">
    //           <StatusDialogeBox2 dealer_id={cell.row.values.dealer_id} status={cell.row.values.status} />
    //         </div>
    //       </div>
    //     );
    //   },
    // },
 
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: (cell) => {
        cell;
        // console.log(cell.row.values.dealer_id);
        return (
          <div>
            <div className="flex gap-2 justify-center items-center  ">
              {/* <Link to={`/admin/dealer/info/${cell.row.values.dealer_id}`}> */}
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
              {/* </Link> */}
 
              {/* <Link
                to={`/admin/dealer/edit/${cell.row.values.userId}/${cell.row.values.dealer_id}`}
              > */}
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
              {/* </Link> */}
             
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
//  console.log(dealerApiData)
  return (
    <>
    {/* <h1 className="mt-2 text-xl text-center">Car List</h1>
    */}
 

{dealerApiData.status===404 ? (
        <div>
           <p className="text-3xl font-semibold ">No Data Available</p>
           <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
           <AddDealerForm />
            </div>
            </div>
            ):
            ( <div>
            <Card className="h-full w-full">
      <Dialog open={open} handler={handleOpen}>
      <DialogBody className="flex justify-center" >
        <p className="font-semibold text-xl">Are you sure want to delete?</p>
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
              Car List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
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
      </Card></div>)}
      
 
    </>
  )
}