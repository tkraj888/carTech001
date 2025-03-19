/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";    
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useInspectorupdateMutation, useInspectorByIdQuery } from "../../services/inspectorapi";
import { FiLoader } from 'react-icons/fi'; 

export default function InspectorStatusDialogBox({ userId, inspectorProfileId, status }) {
  
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(status);
  const { data, isLoading, isError, error } = useInspectorByIdQuery({ userId });
  const [StatusData ,setStatusData] = useState(status);
  const [InspctorStatus, { isLoading: isUpdating, error: updateError }] = useInspectorupdateMutation();
  const handleOpen = () => setOpen(!open);
  const handleSelectChange = (event) => {
    const newIsActive = event.target.value === "true";
    setIsActive(newIsActive);
  };

  const getButtonColor = () => {
    return StatusData ? "green" : "red";
  };

  const getStatusText = () => {
    return StatusData ? "Active" : "Disabled";
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    const inspectordata = {
      status: isActive ? true : false
    };
    try {
      const res = await InspctorStatus({ id: inspectorProfileId, inspectordata }).unwrap();
      setStatusData(StatusData);
      setOpen(false); 
    } catch (error) {
      // console.error("Error updating Inspector status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center p-8">
        <FiLoader className="animate-spin text-blue-gray-800 h-16 w-16" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Button onClick={handleOpen} color={getButtonColor()}>
        {getStatusText()}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Select Status</DialogHeader>
        <form onSubmit={handleConfirm}>
          <DialogBody className="flex justify-center">
            <select
              className="border border-gray-400 p-4 rounded-md"
              value={isActive}
              onChange={handleSelectChange}
            >
              <option value="">Select</option>
              <option value="true">ACTIVE</option>
              <option value="false">DISABLE</option>
            </select>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit" disabled={isUpdating}>
              <span>Confirm</span>
            </Button>
            {updateError && <p className="text-red-500">Error: {updateError.data?.message || updateError.error}</p>} 
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
