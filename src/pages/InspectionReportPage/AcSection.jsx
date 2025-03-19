/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useGetInspectionReportQuery } from '../../services/inspectorapi';



const AcSection = () => {
  const [formData, setFormData] = React.useState({
    ACCooling: [],
    Heater: [],
    ClimateControlAC: [],
    AcVent: [],
    
  });
  const [uploadedImages, setUploadedImages] = useState({
    ACCoolings: null,
    Heaters: null,
    ClimateControlACs: null,
    AcVents: null,
  });
  const { beadingCarId } = useParams();
  
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "AC" });
 
  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "ACCooling":
          setFormData((prev) => ({ ...prev, ACCooling: item.comment }));
          setUploadedImages((prev) => ({ ...prev, ACCoolings: item.documentLink }));
          break;
        case "Heater":
          setFormData((prev) => ({ ...prev, Heater: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Heaters: item.documentLink }));
          break;
        case "ClimateControlAC":
          setFormData((prev) => ({ ...prev, ClimateControlAC: item.comment }));
          setUploadedImages((prev) => ({ ...prev, ClimateControlACs: item.documentLink }));
          break;
        case "AcVent":
          setFormData((prev) => ({ ...prev, AcVent: item.comment }));
          setUploadedImages((prev) => ({ ...prev, AcVents: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);

  return (
    <div className='p-4'>
      <Typography variant="h4" className='text-black font-bold pb-5'>
      AC 
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5} >
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">AC Cooling : {formData.ACCooling}</Typography>

          {uploadedImages.ACCoolings && (
            <img
              src={uploadedImages.ACCoolings}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Heater : {formData.Heater}</Typography>

        {uploadedImages.Heaters && (
            <img
              src={uploadedImages.Heaters}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Climate Control AC : {formData.ClimateControlAC}</Typography>
        {uploadedImages.ClimateControlACs && (
            <img
              src={uploadedImages.ClimateControlACs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            
            />
          )}
        </Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Ac Vent : {formData.AcVent}</Typography>

        {uploadedImages.AcVents && (
            <img
              src={uploadedImages.AcVents}
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

export default AcSection;
