/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useGetInspectionReportQuery } from '../../services/inspectorapi';

const InteriorSection = () => {
  const [formData, setFormData] = React.useState({
    LeatherSeat: "",
    Odometer: "",
    Dashboard: "",
    CabinFloor: "",
  });
  const [uploadedImages, setUploadedImages] = useState({
    LeatherSeats: null,
    Odometers: null,
    CabinFloors: null,
    Dashboards: null,
  });

  const { beadingCarId } = useParams();
  
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "Interior" });
  
  
useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "LeatherSeat":
          setFormData((prev) => ({ ...prev, LeatherSeat: item.comment }));
          setUploadedImages((prev) => ({ ...prev, LeatherSeats: item.documentLink }));
          break;
        case "Odometer":
          setFormData((prev) => ({ ...prev, Odometer: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Odometers: item.documentLink }));
          break;
        case "CabinFloor":
          setFormData((prev) => ({ ...prev, CabinFloor: item.comment }));
          setUploadedImages((prev) => ({ ...prev, CabinFloors: item.documentLink }));
          break;
        case "Dashboard":
          setFormData((prev) => ({ ...prev, Dashboard: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Dashboards: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);
  return (
    <div className='p-4'>
      <Typography variant="h4" className='text-black font-bold pb-5'>
        Interior
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5} >
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Leather Seat : {formData.LeatherSeat}</Typography>
          {uploadedImages.LeatherSeats && (
            <img
              src={uploadedImages.LeatherSeats}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Odometer : {formData.Odometer}</Typography>
        {uploadedImages.Odometers && (
            <img
              src={uploadedImages.Odometers}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Dashboard : {formData.Dashboard}</Typography>
        {uploadedImages.CabinFloors && (
            <img
              src={uploadedImages.CabinFloors}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
             
            />
          )}
        </Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Cabin Floor : {formData.CabinFloor}</Typography>

        {uploadedImages.Dashboards && (
            <img
              src={uploadedImages.Dashboards}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
             
            />
          )}
        </Grid>
     </Grid>
        </div>
      {/* <div className="flex justify-between mt-10 px-8">
      <button className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24">
        Previous
      </button>
      <button className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
      >
        Next
      </button>
    </div> */}
    </div>
  );
};

export default InteriorSection;
