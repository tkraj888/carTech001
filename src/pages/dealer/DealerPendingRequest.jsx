import { useParams } from "react-router-dom";
import { useGetPendingrequestQuery } from "../../services/carAPI";
import { useState } from "react";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";

export default function DealerPendingRequest() {
  const { CarId } = useParams();

  // console.log(CarId);
  
  const [currentpage, setCurrentPage] = useState(0);
  
  const totalPages = 8;
  const { data, error } = useGetPendingrequestQuery({CarId,currentpage});
  // console.log(totalPages);
  // console.log(error);
  // console.log(data);
  const nextpage = () => {
    if (totalPages == 1) {
      return;
    } else if (currentpage + 1 < totalPages) {
      setCurrentPage(currentpage + 1);
    }
  };

  const previous = () => {
    if (currentpage === 0) {
      return;
    } else {
      setCurrentPage(currentpage - 1);
    }
  };

 
  return (
    <div className="flex justify-center min-h-screen items-center">
        {error?.status === 404 ? (
   
        <p className="text-3xl font-semibold ">No Pending Request</p>
      
    ) : (
      data?.object?.map((item, index) => (
        <div key={index}>
          <Card className="mt-6 w-96">
          <p className="font-semibold  ml-10 mt-5 text-3xl">Pending Request</p>
            <CardBody>

            <div className="max-w-xs mx-auto">
      <div className="bg-gray-200 p-4 rounded-md">
        <div className="grid grid-cols-2 ">
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>Pending Booking ID:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.pendingBookingId}
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>Date:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.date}
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>Price:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.price}
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>Dealer ID:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.dealerId}
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>Car ID:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.carId}
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>User ID:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.userId}
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>Status:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.status}
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            <strong>Asking Price:</strong>
          </div>
          <div className="py-2 px-4 border border-gray-400 rounded-md">
            {item.askingPrice}
          </div>
        </div>
      </div>
    </div>
            </CardBody>
            <CardFooter className="pt-0">

            <Button onClick={previous} disabled={currentpage === 0}>
                Previous
              </Button>

              <Button
                onClick={nextpage}
                disabled={currentpage + 1 === totalPages}
                //   className={currentpage + 1 === totalPages ? "cursor-move" : "cursor-pointer"}
                className="ml-36"
              >
                Next
              </Button>

              
            </CardFooter>
          </Card>
        </div>
      ))
    )}
      
      <div></div>
    </div>
  );
}
