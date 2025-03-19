/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function StatusDialogeBox3({ initialStatus, carId, onStatusChange }) {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(initialStatus); 

  const handleOpen = () => setOpen(!open);

  const handleSubmit = () => {
    // Simulate updating the car status with static data
    const updatedCar = {
      carId: carId,
      status: selectedOption,
    };

    // console.log("Updated Car:", updatedCar);

    // Call the callback function to update the status in the parent component
    if (onStatusChange) {
      onStatusChange(updatedCar);
    }

    setOpen(!open);
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); 
  };

  const getButtonColor = () => {
    switch(selectedOption) {
      case "ACTIVE":
        return "green"; 
      case "DEACTIVATE":
        return "red"; 
      default:
        return "black";   
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color={getButtonColor()}>
        {selectedOption}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Select Status</DialogHeader>
        <DialogBody className="flex justify-center">
          <select
            className="border border-gray-400 p-4 rounded-md"
            value={selectedOption} 
            onChange={handleSelectChange} 
          >
            <option value="">Select</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="DEACTIVATE">DEACTIVATE</option>
          </select>
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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
