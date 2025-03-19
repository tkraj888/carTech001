/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDealerStatusMutation } from "../services/dealerAPI";

export default function StatusDialogeBox2({ dealer_id, status }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  // Initialize isActive state based on the passed status prop
  const [isActive, setIsActive] = React.useState(status);

  const [dealerStatus, { isLoading, error }] = useDealerStatusMutation();

  const handleSelectChange = (event) => {
    const newIsActive = event.target.value === "true";
    setIsActive(newIsActive);
  };

  const getButtonColor = () => {
    return isActive ? "green" : "red";
  };

  const getStatusText = () => {
    return isActive ? "ACTIVE" : "DISABLE";
  };

  const handleConfirm = async () => {
    try {
      // Ensure dealerId is logged before calling mutation
      // console.log("Updating dealer with ID:", dealer_id, "to status:", isActive);

      // Call the mutation with the updated status
      const res = await dealerStatus({ dealer_id, status: isActive });
      // console.log(res);
      res;
      // Update the dealerId state

      // console.log("Dealer status updated successfully!");
      setOpen(false); // Close the dialog

    } catch (error) {
      // Handle errors appropriately (e.g., display an error message)
      // console.error("Error updating dealer status:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color={getButtonColor()}>
        {getStatusText()}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Select Status</DialogHeader>
        <DialogBody className="flex justify-center">
          <select
            className="border border-gray-400 p-4 rounded-md"
            value={isActive ? "true" : "false"}
            onChange={handleSelectChange}
          >
            <option value="" disabled>Select</option>
            <option value="true">ACTIVE</option>
            <option value="false">DISABLE</option>
          </select>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm} disabled={isLoading}>
            <span>Confirm</span>
          </Button>
          {error && <p className="text-red-500">Error: {error.message}</p>}
        </DialogFooter>
      </Dialog>
    </>
  );
}
