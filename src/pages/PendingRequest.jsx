/* eslint-disable no-unused-vars */
import { useState } from "react";
import UserCardPendingRequest from "../components/userRequest/UserCardPendingRequest";
import { useUserAllCarRequestQuery } from "../services/carAPI";
import { useParams } from "react-router-dom";
import { Button, CardFooter, Typography } from "@material-tailwind/react";
import { FiLoader } from "react-icons/fi";
const PendingRequest = () => {
  const { userid } = useParams();
  const [pageNo, setPageNo] = useState(0);

  const emptyImage = "..\\..\\cars\\emptyfolder.png";

  const { data, isLoading, error } = useUserAllCarRequestQuery({
    pageNo,
    userid,
  });
  const nextHandler = () => {
    setPageNo((prePageNo) => {
      if (error?.status === 404) {
        // console.log("You are on the last page.");
      } else {
        return prePageNo + 1;
      }
    });
  };
  const renderData = data?.list.map((item, index) => {
    return (
      <div key={index} className="mt-5">
        <UserCardPendingRequest item={item} />
      </div>
    );
  });
  if (!data) {
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

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 mb-5 md:grid md:grid-cols-1 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-3 gap-2 md:auto-cols-auto md:auto-rows-auto">
        {renderData}
      </div>

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
            disabled={data?.list.length < 10}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default PendingRequest;
