/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useCarUpdateMutation } from "../services/carAPI";

export default function StatusDialogeBox({ status, carId ,refetchActive ,pendingRefeatch , sellRefeatch, refetchDeactive, activeCountRefetch, pendingCountRefetch, soldCountsRefetch, deactiveCountRefetch}) {
  const [open, setOpen] = React.useState(false);
  const [carUpdate] = useCarUpdateMutation(carId);
  const [selectedOption, setSelectedOption] = React.useState(status);
  const [temporaryOption, setTemporaryOption] = React.useState(status);

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    try {
      const data = {
        carStatus: temporaryOption,
      };

      const res = await carUpdate({ data, carId });
      res;
      // Handle the response as needed
      refetchActive()
      pendingRefeatch(); 
      sellRefeatch();
      refetchDeactive();
      activeCountRefetch();
      pendingCountRefetch();
      soldCountsRefetch();
      deactiveCountRefetch();
      setSelectedOption(temporaryOption);
      setOpen(!open);
    } catch (error) {
      // Handle the error as needed
    }
  };

  const handleSelectChange = (event) => {
    setTemporaryOption(event.target.value);
  };

  const getButtonColor = () => {
    switch (selectedOption) {
      case "ACTIVE":
        return "green";
      case "DEACTIVATE":
        return "red";
      case "SOLD":
        return "blue";
      case "PENDING":
        return "amber";
      default:
        return "red";
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
            value={temporaryOption}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="DEACTIVATE">DEACTIVATE</option>
            <option value="PENDING">PENDING</option>
            <option value="SOLD">SOLD</option>
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
