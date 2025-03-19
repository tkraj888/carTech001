/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useGetInspectionReportQuery } from '../../services/inspectorapi';

const EngineSection = () => {
  const [formData, setFormData] = React.useState({
    Engine: "",
    EnginMounting: "",
    EngineSound: "",
    Exhaustsmoke: "",
    Gearbox: "",
    Engineoil: "",
    Battery: "",
    Coolant: "",
    Clutch: "",
  });

  const [uploadedImages, setUploadedImages] = useState({
    Engines: null,
    EngineMountings: null,
    EngineSounds: null,
    Exhaustsmokes: null,
    Gearboxs: null,
    Engineoils: null,
    Batterys: null,
    Coolants: null,
    Clutchs: null,
  });
  const { beadingCarId } = useParams();
  
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "Engine" });
  

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "Engine":
          setFormData((prev) => ({ ...prev, Engine: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Engines: item.documentLink }));
          break;
        case "EngineMounting":
          setFormData((prev) => ({ ...prev, EngineMounting: item.comment }));
          setUploadedImages((prev) => ({ ...prev, EngineMountings: item.documentLink }));
          break;
        case "EngineSound":
          setFormData((prev) => ({ ...prev, EngineSound: item.comment }));
          setUploadedImages((prev) => ({ ...prev, EngineSounds: item.documentLink }));
          break;
        case "Exhaustsmoke":
          setFormData((prev) => ({ ...prev, Exhaustsmoke: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Exhaustsmokes: item.documentLink }));
          break;
        case "Gearbox":
          setFormData((prev) => ({ ...prev, Gearbox: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Gearboxs: item.documentLink }));
          break;
        case "Engineoil":
          setFormData((prev) => ({ ...prev, Engineoil: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Engineoils: item.documentLink }));
          break;
        case "Battery":
          setFormData((prev) => ({ ...prev, Battery: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Batterys: item.documentLink }));
          break;
        case "Coolant":
          setFormData((prev) => ({ ...prev, Coolant: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Coolants: item.documentLink }));
          break;
        case "Clutch":
          setFormData((prev) => ({ ...prev, Clutch: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Clutchs: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);

  return (
    <div className='p-4'>
      <Typography variant="h4" className='text-black font-bold pb-5'>
        Engine
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5} >
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Engine : {formData.Engine}</Typography>
          {uploadedImages.Engines && (
            <img
              src={uploadedImages.Engines}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Engin Mounting : {formData.EnginMounting}</Typography>

        {uploadedImages.EngineMountings && (
            <img
              src={uploadedImages.EngineMountings}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Engine Sound : {formData.EngineSound}</Typography>
        {uploadedImages.EngineSounds && (
            <img
              src={uploadedImages.EngineSounds}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Exhaust Smoke : {formData.Exhaustsmoke}</Typography>
        {uploadedImages.Exhaustsmokes && (
            <img
              src={uploadedImages.Exhaustsmokes}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Gearbox : {formData.Gearbox}</Typography>
        {uploadedImages.Gearboxs && (
            <img
              src={uploadedImages.Gearboxs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
             
            />
          )}
        </Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Engine Oil : {formData.Engineoil}</Typography>
        {uploadedImages.Engineoils && (
            <img
              src={uploadedImages.Engineoils}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginsTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Battery : {formData.Battery}</Typography>

        {uploadedImages.Batterys && (
            <img
              src={uploadedImages.Batterys}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Coolant : {formData.Coolant}</Typography>
        {uploadedImages.Coolants && (
            <img
              src={uploadedImages.Coolants}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Clutch : {formData.Clutch}</Typography>

        {uploadedImages.Clutchs && (
            <img
              src={uploadedImages.Clutchs}
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

export default EngineSection;
