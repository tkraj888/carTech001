import  { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

export default function SetTimer() {
  const [formData, setFormData] = useState({
    basePrice: "",
    durationMinutes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create object
    const dataObject = {
      basePrice: parseFloat(formData.basePrice),
      durationMinutes: parseInt(formData.durationMinutes),
    };
    dataObject;
    // console.log(dataObject);
    setFormData({
      basePrice: "",
      durationMinutes: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="number"
              label="Base Price"
              name="basePrice"
              className="mt-1"
              value={formData.basePrice}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <Input
              type="number"
              label="Duration (Minutes)"
              name="durationMinutes"
              className="mt-1"
              value={formData.durationMinutes}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
