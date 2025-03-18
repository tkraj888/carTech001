/* eslint-disable no-unused-vars */
import { useGetAllDealerPendingBookingQuery } from "../../services/dealerAPI";
import { useParams } from "react-router-dom";
import DealerCarPendingRequest from "../../components/carDetails/DealerCarPendingRequest";
import {  useEffect, useState } from "react";
import { Button, CardFooter, Typography } from "@material-tailwind/react";
import { FiLoader } from 'react-icons/fi'; 
const DealerAllPendingRequest = () => {
  const { id } = useParams();
  const [pageNo, setPageNo] = useState(0);

  const emptyImage = "..\\..\\cars\\emptyfolder.png";

  const { data, isLoading, error ,refetch } = useGetAllDealerPendingBookingQuery({
    id,
    pageNo,
  });
  useEffect(() => {
    refetch();
  }, [pageNo, refetch]);

  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        // console.log("You are on the last page.");
      } else {
        return prePageNo + 1;
      }
    });
  };
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );}
  if (!data || error?.status === 404) {
    return <div> 
      <div className="flex justify-center mt-14">
      <img
          className="w-40"
          src={emptyImage}
          alt="no data"
        />
        </div>
        <p className="flex justify-center text-2xl md:text-3xl font-semibold">No Data Available</p>
    </div>
  }

  const renderData = data?.list.map((item, index) => {
    return (
      <div key={index} className="mt-5">
        <DealerCarPendingRequest item={item} refetch={refetch} />
      </div>
    );
  });
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }


  return (
    <>
      
      <div className="grid grid-cols-1 gap-y-4 lg:grid lg:grid-cols-1 md:grid md:grid-cols-1 xl:grid xl:grid-cols-2 mx-2 md:mx-0">
        {renderData}
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
            onClick={() => setPageNo((a) => a - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={nextHandler}
            disabled={data?.list.length < 10}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default DealerAllPendingRequest;
