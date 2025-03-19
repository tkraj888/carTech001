/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Inputs from "../../forms/Inputs"; // Assuming this is a custom input component
import { useEditBrandDataMutation } from "../../services/brandAPI";

const EditCarForm = ({ initialData, brandDataId ,onSave}) => {
  const [open, setOpen] = useState(false);
  const [inputField, setInputField] = useState(
    initialData || { brand: "", model: "", variant: "" }
  );
  const [editBrandData] = useEditBrandDataMutation();
  
  useEffect(() => {
    if (initialData) {
      setInputField(initialData);
    }
  }, [initialData]);

  const handleOpen = () => setOpen(!open);

  const onChangeFormhandler = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputField);

    try {
      const res = await editBrandData({
        id: brandDataId,
        inputField: inputField,
      }).unwrap();
      onSave(res)
    } catch (error) {
      // console.log(error);
    }
    handleOpen();
  };

  return (
    <>
      <Button onClick={handleOpen} color="green">
        Edit
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Car Details</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Inputs
            label="Brand"
            onChange={onChangeFormhandler}
            value={inputField.brand}
            name="brand"
            type="text"
          />
          <Inputs
            label="Model"
            onChange={onChangeFormhandler}
            value={inputField.variant}
            name="variant"
            type="text"
          />
          <Inputs
            label="Variant"
            onChange={onChangeFormhandler}
            value={inputField.subVariant}
            name="subVariant"
            type="text"
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
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default EditCarForm;
