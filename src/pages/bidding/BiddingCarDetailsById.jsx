
import CarView from "../../components/carDetails/CarView";
import PriceCard from "../../components/carDetails/PriceCard";
import { useParams } from "react-router-dom";
import { useBiddingCarByIdQuery } from "../../services/biddingAPI";
// import { redirectToSignIn } from "../services/apiSlice";
import { useNavigate } from "react-router-dom";
import { FiLoader } from 'react-icons/fi'; 
export default function BiddingCarDetailsById() {

    const navigate = useNavigate();
    const { beadingCarId } = useParams();
 
    const { data, isLoading, isError, error } = useBiddingCarByIdQuery(beadingCarId);
    isError;
  
    if (isLoading) {
      return (
        <div className="w-screen h-screen flex justify-center items-center p-8">
          <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
        </div>
      );
    }
   
  //  console.log(carId);
    // console.log(isLoading);
    // console.log(isError);
    // console.log(error);
    // console.log(error);
    if (error?.status === 401) {
      
  
      navigate("/signin");
      return null
    }
  
    const {
        price,
        brand,
        fuelType,
        kmDriven,
        ownerSerial,
        year,
        model,
        registration,
        area,
        transmission,
        carInsurance,
        city,
        color,
        bodyType,
        dealer_id,
      } = data; // Provide a fallback value of an empty object if data?.object is undefined
      
      // Now you can safely access properties without triggering an error
      
   

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-3 gap-4 container mx-auto ">
    <div className="p-4 md:col-span-2 max-h-screen overflow-scroll no-scrollbar ">
      <CarView
        fuelType={fuelType}
        registration={registration}
        ownerSerial={ownerSerial}
        transmission={transmission}
        year={year}
        carInsurance={carInsurance}
        kmDriven={kmDriven}
        beadingCarId={beadingCarId}
      />
    </div>
    <div className="p-4 sticky top-0">
      <PriceCard
        price={price}
        brand={brand}
        fuelType={fuelType}
        kmDriven={kmDriven}
        ownerSerial={ownerSerial}
        year={year}
        model={model}
        registration={registration}
        area={area}
        city={city}
        color={color}
        bodyType={bodyType}
        dealer_id = {dealer_id}
        // carId = {carId}
      />
    </div>
  </div>
  )
}
