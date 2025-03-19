/* eslint-disable react/prop-types */

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Inputs from "../forms/Inputs";
import { useBookingRequestMutation } from "../services/carAPI";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
export default function DialogBox({ price, dealer_id, carId ,handleBuyCar}) {
  // console.log(carId);
  const navigate = useNavigate()
  const [bookingRequest] = useBookingRequestMutation();
  const [open, setOpen] = React.useState(false);
  // console.log(dealer_id);
  const [inputForm, setInoutForm] = useState("");
  const cookie = Cookies.get("token");
  // console.log(cookie)
  const handleOpen = () =>{
if(cookie){
    setOpen(!open);

}else{
navigate('/signin')
}
   
  } 
  const date = new Date(); // Create a new Date object with the current date
  const year = date.getFullYear(); // Get the year (e.g., 2024)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so add 1), pad with leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Get the day of the month, pad with leading zero if needed
  // console.log(price);
  const formattedDate = `${year}-${month}-${day}`;
  // console.log(formattedDate); // Concatenate the parts with hyphens
  const userId = localStorage.getItem("userInfo");
 
  const stringifyuserId =userId? JSON.parse(userId):null;
  const numUserId = Number(stringifyuserId?.userId);
  const numCarId =userId? Number(carId):null;
  // console.log(numUserId);

  
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
   
      date: formattedDate,
      price: price,
      askingPrice: inputForm,
      status: "PENDING",
      carId: numCarId,
      dealerId: dealer_id,
      userId: numUserId,
    };
    // console.log(formData)
    
    const res = await bookingRequest(formData);
    // console.log(res);
    if (res?.data) {
      handleBuyCar("Request sent successfully!","success")
      setInoutForm("");
    }
    if (res.error) {
      handleBuyCar(res.error.data.message,"error")
    }
  };
  return (
    <>
      <Button color="indigo" onClick={handleOpen} variant="gradient">
        Buy Car
      </Button>
      <Dialog open={open} handler={handleOpen} size="xs">
        <p className="pl-5 pt-2 text-lg font-semibold">Car Price:₹{price}</p>
        <p className="pl-5">Your Price</p>
        <DialogBody>
          <Inputs
            label={"Enter your car price"}
            type={"number"}
            value={inputForm}
            onChange={(e) => setInoutForm(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span onClick={submitHandler}>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
