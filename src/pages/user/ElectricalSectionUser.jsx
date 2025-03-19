
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useGetInspectionReportQuery } from '../../services/inspectorapi';


const ElectricalSectionUser = () => {
  const [formData, setFormData] = React.useState({
    FourPowerWindows: "",
    AirBagFeatures: "",
    MusicSystem : "",
    Sunroof : "",
    ABS : "",
    InteriorParkingSensor : "",
    Electricalwiring : "",
    
  });
  const { beadingCarId } = useParams();
  
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "Eletrical" });
  
  const [images, setImages] = useState({
    FourPowerWindowss: null,
    AirBagFeaturess: null,
    MusicSystems: null,
    Sunroofs: null,
    ABSs: null,
    InteriorParkingSensors: null,
    Electricalwirings: null,
  });

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "FourPowerWindows":
          setFormData((prev) => ({ ...prev, FourPowerWindows: item.comment }));
          setImages((prev) => ({ ...prev, FourPowerWindowss: item.documentLink }));
          break;
        case "AirBagFeatures":
          setFormData((prev) => ({ ...prev, AirBagFeatures: item.comment }));
          setImages((prev) => ({ ...prev, AirBagFeaturess: item.documentLink }));
          break;
        case "MusicSystem":
          setFormData((prev) => ({ ...prev, MusicSystem: item.comment }));
          setImages((prev) => ({ ...prev, MusicSystems: item.documentLink }));
          break;
        case "Sunroof":
          setFormData((prev) => ({ ...prev, Sunroof: item.comment }));
          setImages((prev) => ({ ...prev, Sunroofs: item.documentLink }));
          break;
        case "ABS":
          setFormData((prev) => ({ ...prev, ABS: item.comment }));
          setImages((prev) => ({ ...prev, ABSs: item.documentLink }));
          break;
        case "InteriorParkingSensor":
          setFormData((prev) => ({ ...prev, InteriorParkingSensor: item.comment }));
          setImages((prev) => ({ ...prev, InteriorParkingSensors: item.documentLink }));
          break;
        case "Electricalwiring":
          setFormData((prev) => ({ ...prev, Electricalwiring: item.comment }));
          setImages((prev) => ({ ...prev, Electricalwirings: item.documentLink }));
          break;
        default:
          break;
      }
    });
  }, [data]);


  return (
    <div className='p-4'>
      <Typography variant="h4" className='text-black font-bold pb-5'>
      Electricals 
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5} >
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Four Power Windows : {formData.FourPowerWindows}</Typography>
          {images.FourPowerWindowss && (
            <img
              src={images.FourPowerWindowss}
              alt="Four Power Windows uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">AirBag Features : {formData.AirBagFeatures}</Typography>
        {images.AirBagFeaturess && (
            <img
              src={images.AirBagFeaturess}
              alt="Air Bag Features uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Music System : {formData.MusicSystem}</Typography>
        {images.MusicSystems && (
            <img
              src={images.MusicSystems}
              alt="Music System uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Sunroof : {formData.Sunroof}</Typography>
        {images.Sunroofs && (
            <img
              src={images.Sunroofs}
              alt="Sunroof uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">ABS : {formData.ABS}</Typography>
        {images.ABSs && (
            <img
              src={images.ABSs}
              alt="ABS uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Interior Parking Sensor : {formData.InteriorParkingSensor}</Typography>
        {images.InteriorParkingSensors && (
            <img
              src={images.InteriorParkingSensors}
              alt="Interior Parking Sensor uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}
        </Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Electrical Wiring : {formData.Electricalwiring}</Typography>
        {images.Electricalwirings && (
            <img
              src={images.Electricalwirings}
              alt="Electrical Wiring uploaded"
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

export default ElectricalSectionUser;
