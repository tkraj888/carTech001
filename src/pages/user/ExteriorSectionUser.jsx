
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {   Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useGetInspectionReportQuery } from '../../services/inspectorapi';

const ExteriorSectionUser = () => {
  const { beadingCarId } = useParams();
 
  const { data } = useGetInspectionReportQuery({ beadingCarId, docType: "Exterior" });
  

  const [formData, setFormData] = React.useState({
    BonnetHood : "",
    RightDoorFront : "",
    LeftDoorFront : "",
    LeftFender: "",
    RightFender: "",

    LeftQuarterPanel: "",
    RightQuarterPanel: "",
    Roof : "",
    DickyDoor : "",
    LeftDoorRear :"",
    RightDoorRear :"",
    LHSFrontTyre : "",
    RHSFrontTyre: "",
    LHSRearTyre:"",
    RHSRearTyre: "",
    SpareTyre: "",
    Windshield: "",
    FrontWindshield: "",
    RearWindshield: "",
    Light: "",
    FrontBumper: "",
    RearBumper: "",
    LHSHeadlight: "",
    RHSHeadlight: "",
    LHSTaillight: "",
    RHSTaillight: "",
    HeadLightSupport: "",
    RadiatorSupport: "",
    AlloyWheel: "",
    
    CowlTop: "",
    BootFloor: "",
    RightApronLEG: "",
    LeftApronLEG: "",
    RightApron:"",
    LeftApron: "",
    LeftPillar: "",
    LeftPillarA: "",
    LeftPillarB: "",
    LeftPillarC: "",
    RightPillar: "",
    RightPillarA: "",
    RightPillarB: "",
    RightPillarC: "",





  });

  const [uploadedImages, setUploadedImages] = useState({
    BonnetHoods: null,
    RightDoorFronts: null,
    LeftDoorFronts: null,
    RightFenders: null,
    LeftQuarterPanels: null,
    RightQuarterPanels: null,
    Roofs: null,
    DickyDoors: null,
    LeftDoorRears: null,
    RightDoorRears: null,
    LHSFrontTyres: null,
    RHSFrontTyres: null,
    LHSRearTyres: null,
    RHSRearTyres: null,
    SpareTyres: null,
    Windshields: null,
    FrontWindshields: null,
    RearWindshields: null,
    Lights: null,
    FrontBumpers: null,
    RearBumpers: null,
    LHSHeadlights: null,
    RHSHeadlights: null,
    LHSTaillights: null,
    RHSTaillights: null,
    HeadLightSupports: null,
    RadiatorSupports: null,
    AlloyWheels: null,

    CowlTops : null,
    BootFloors: null,
    RightApronLEGs: null,
    LeftApronLEGs: null,
    RightAprons: null,
    LeftAprons: null,
    LeftPillars: null,
    LeftPillarAs: null,
    LeftPillarBs: null,
    LeftPillarCs: null,
    RightPillars: null,
    RightPillarAs: null,
    RightPillarBs: null,
    RightPillarCs: null,
  });
  console.log(data);

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "BonnetHood":
          setFormData((prev) => ({ ...prev, BonnetHood: item.comment }));
           setUploadedImages((prev) => ({ ...prev, BonnetHoods: item.documentLink }));
          break;
        case "RightDoorFront":
          setFormData((prev) => ({ ...prev, RightDoorFront: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightDoorFronts: item.documentLink }));
          break;
        case "LeftDoorFront":
          setFormData((prev) => ({ ...prev, LeftDoorFront: item.comment }));
           setUploadedImages((prev) => ({ ...prev, LeftDoorFronts: item.documentLink }));
          break;
        case "RightFender":
          setFormData((prev) => ({ ...prev, RightFender: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightFenders: item.documentLink }));
          break;
        case "LeftQuarterPanel":
          setFormData((prev) => ({ ...prev, LeftQuarterPanel: item.comment }));
           setUploadedImages((prev) => ({ ...prev, LeftQuarterPanels: item.documentLink }));
          break;
        case "RightQuarterPanel":
          setFormData((prev) => ({ ...prev, RightQuarterPanel: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightQuarterPanels: item.documentLink }));
          break;
        case "Roof":
          setFormData((prev) => ({ ...prev, Roof: item.comment }));
           setUploadedImages((prev) => ({ ...prev, Roofs: item.documentLink }));
          break;
        case "DickyDoor":
          setFormData((prev) => ({ ...prev, DickyDoor: item.comment }));
           setUploadedImages((prev) => ({ ...prev, DickyDoors: item.documentLink }));
          break;
        case "LeftDoorRear":
          setFormData((prev) => ({ ...prev, LeftDoorRear: item.comment }));
           setUploadedImages((prev) => ({ ...prev, LeftDoorRears: item.documentLink }));
          break;
          case "LeftFender":
            setFormData((prev) => ({ ...prev, LeftFender: item.comment }));
             setUploadedImages((prev) => ({ ...prev, LeftFenders: item.documentLink }));
          break;
        case "RightDoorRear":
          setFormData((prev) => ({ ...prev, RightDoorRear: item.comment }));
           setUploadedImages((prev) => ({ ...prev, RightDoorRears: item.documentLink }));
          break;
          case "LHSFrontTyre":
            setFormData((prev) => ({ ...prev, LHSFrontTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, LHSFrontTyres: item.documentLink }));
            break;
          case "RHSFrontTyre":
            setFormData((prev) => ({ ...prev, RHSFrontTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, RHSFrontTyres: item.documentLink }));
            break;
          case "LHSRearTyre":
            setFormData((prev) => ({ ...prev, LHSRearTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, LHSRearTyres: item.documentLink }));
            break;
          case "RHSRearTyre":
            setFormData((prev) => ({ ...prev, RHSRearTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, RHSRearTyres: item.documentLink }));
            break;
          case "SpareTyre":
            setFormData((prev) => ({ ...prev, SpareTyre: item.comment }));
            setUploadedImages((prev) => ({ ...prev, SpareTyres: item.documentLink }));
            break;
            case "Windshield":
              setFormData((prev) => ({ ...prev, Windshield: item.comment }));
              setUploadedImages((prev) => ({ ...prev, Windshields: item.documentLink }));
              break;
              case "FrontWindshield":
              setFormData((prev) => ({ ...prev, FrontWindshield: item.comment }));
              setUploadedImages((prev) => ({ ...prev, FrontWindshields: item.documentLink }));
              break;
              case "RearWindshield":
              setFormData((prev) => ({ ...prev, RearWindshield: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RearWindshields: item.documentLink }));
              break;
            case "Light":
              setFormData((prev) => ({ ...prev, Light: item.comment }));
              setUploadedImages((prev) => ({ ...prev, Lights: item.documentLink }));
              break;
            case "FrontBumper":
              setFormData((prev) => ({ ...prev, FrontBumper: item.comment }));
              setUploadedImages((prev) => ({ ...prev, FrontBumpers: item.documentLink }));
              break;
            case "RearBumper":
              setFormData((prev) => ({ ...prev, RearBumper: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RearBumpers: item.documentLink }));
              break;
            case "LHSHeadlight":
              setFormData((prev) => ({ ...prev, LHSHeadlight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, LHSHeadlights: item.documentLink }));
              break;
            case "RHSHeadlight":
              setFormData((prev) => ({ ...prev, RHSHeadlight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RHSHeadlights: item.documentLink }));
              break;
            case "LHSTaillight":
              setFormData((prev) => ({ ...prev, LHSTaillight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, LHSTaillights: item.documentLink }));
              break;
            case "RHSTaillight":
              setFormData((prev) => ({ ...prev, RHSTaillight: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RHSTaillights: item.documentLink }));
              break;
              case "HeadLightSupport":
                setFormData((prev) => ({ ...prev, HeadLightSupport: item.comment }));
                setUploadedImages((prev) => ({ ...prev, HeadLightSupports: item.documentLink }));
                break;
              case "RadiatorSupport":
                setFormData((prev) => ({ ...prev, RadiatorSupport: item.comment }));
                setUploadedImages((prev) => ({ ...prev, RadiatorSupports: item.documentLink }));
                break;
              case "AlloyWheel":
                setFormData((prev) => ({ ...prev, AlloyWheel: item.comment }));
                setUploadedImages((prev) => ({ ...prev, AlloyWheels: item.documentLink }));
                break;

                case "CowlTop":
                setFormData((prev) => ({ ...prev, CowlTop: item.comment }));
                setUploadedImages((prev) => ({ ...prev, CowlTops: item.documentLink }));
                break;
                case "BootFloor":
                setFormData((prev) => ({ ...prev, BootFloor: item.comment }));
                setUploadedImages((prev) => ({ ...prev, BootFloors: item.documentLink }));
                break;
                case "RightApronLEG":
                setFormData((prev) => ({ ...prev, RightApronLEG: item.comment }));
                setUploadedImages((prev) => ({ ...prev, RightApronLEGs: item.documentLink }));
                break;
                case "LeftApronLEG":
                setFormData((prev) => ({ ...prev, LeftApronLEG: item.comment }));
                setUploadedImages((prev) => ({ ...prev, LeftApronLEGs: item.documentLink }));
                break;
                case "RightApron":
                setFormData((prev) => ({ ...prev, RightApron: item.comment }));
                setUploadedImages((prev) => ({ ...prev, RightAprons: item.documentLink }));
                break;
                case "LeftApron":
                setFormData((prev) => ({ ...prev, LeftApron: item.comment }));
                setUploadedImages((prev) => ({ ...prev, LeftAprons: item.documentLink }));
                break;
                case "LeftPillar":
                setFormData((prev) => ({ ...prev, LeftPillar: item.comment }));
                setUploadedImages((prev) => ({ ...prev, LeftPillars: item.documentLink }));
                break;
                case "LeftPillarA":
                setFormData((prev) => ({ ...prev, LeftPillarA: item.comment }));
                setUploadedImages((prev) => ({ ...prev, LeftPillarAs: item.documentLink }));
                break;
                case "LeftPillarB":
                setFormData((prev) => ({ ...prev, LeftPillarB: item.comment }));
                setUploadedImages((prev) => ({ ...prev, LeftPillarBs: item.documentLink }));
                break;
                case "LeftPillarC":
                setFormData((prev) => ({ ...prev, LeftPillarC: item.comment }));
                setUploadedImages((prev) => ({ ...prev, LeftPillarCs: item.documentLink }));
                break;
                case "RightPillar":
                setFormData((prev) => ({ ...prev, RightPillar: item.comment }));
                setUploadedImages((prev) => ({ ...prev, RightPillars: item.documentLink }));
                break;
                case "RightPillarA":
                setFormData((prev) => ({ ...prev, RightPillarA: item.comment }));
                setUploadedImages((prev) => ({ ...prev, RightPillarAs: item.documentLink }));
                break;
                case "RightPillarB":
                setFormData((prev) => ({ ...prev, RightPillarB: item.comment }));
                setUploadedImages((prev) => ({ ...prev, RightPillarBs: item.documentLink }));
                break;
                case "RightPillarC":
                setFormData((prev) => ({ ...prev, RightPillarC: item.comment }));
                setUploadedImages((prev) => ({ ...prev, RightPillarCs: item.documentLink }));
                break;

        default:
          break;
      }
    });
  }, [data]);
  return (
    <div className='p-4 flex-col '>

{/* Exterior Panel */}
     <Typography variant="h4" className='text-black font-bold pb-10'>
      <span >Exterior</span>
      </Typography>

      <Typography variant="h5" className='text-black font-bold pb-4 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Exterior Panel</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={3} >
      <Grid item xs={12} sm={6}>
  <Typography variant="body1">Bonnet Hood : {formData.BonnetHood}</Typography>
  {uploadedImages.BonnetHoods && (
    <img
      src={uploadedImages.BonnetHoods}
      alt="Uploaded"
      style={{
        maxWidth: "20%",
        marginTop: "10px",
        cursor: "pointer",
      }}
    />
  )}
</Grid>



        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Door Front : {formData.RightDoorFront}</Typography>
        {uploadedImages.RightDoorFronts && (
          <img
            src={uploadedImages.RightDoorFronts}
            alt="Uploaded"
            style={{
              maxWidth: "20%",
              marginTop: "10px",
              cursor: "pointer",
            }}
           
          />
        )}
      </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Door Front : {formData.LeftDoorFront}</Typography>
        {uploadedImages.LeftDoorFronts && (
            <img
              src={uploadedImages.LeftDoorFronts}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
             
            />
          )}</Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Fender : {formData.LeftFender}</Typography>
        {uploadedImages.LeftFenders && (
            <img
              src={uploadedImages.LeftFenders}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
            
            />
          )}</Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Fender : {formData.RightFender}</Typography>
        {uploadedImages.RightFenders && (
            <img
              src={uploadedImages.RightFenders}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Quarter Panel : {formData.LeftQuarterPanel}</Typography>
        {uploadedImages.LeftQuarterPanels && (
            <img
              src={uploadedImages.LeftQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Quarter Panel : {formData.RightQuarterPanel}</Typography>
        {uploadedImages.RightQuarterPanels && (
            <img
              src={uploadedImages.RightQuarterPanels}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Roof : {formData.Roof}</Typography>
        {uploadedImages.Roofs && (
            <img
              src={uploadedImages.Roofs}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Dicky Door : {formData.DickyDoor}</Typography>
        {uploadedImages.DickyDoors && (
            <img
              src={uploadedImages.DickyDoors}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
       
            />
          )}</Grid>

        {/* Duplicate Key */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Door Rear : {formData.LeftDoorRear}</Typography>
        {uploadedImages.LeftDoorRears && (
            <img
              src={uploadedImages.LeftDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        {/* Chassis Number Embossing */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Door Rear : {formData.RightDoorRear}</Typography>
        {uploadedImages.RightDoorRears && (
            <img
              src={uploadedImages.RightDoorRears}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              
            />
          )}</Grid>

        </Grid>
        </div>
      
      <Typography variant="h5" className='text-black font-bold pb-4 pt-5 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Tyre</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5}>
       
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">LHS Front Tyre : {formData.LHSFrontTyre}</Typography>
          {uploadedImages.LHSFrontTyres && (
            <img
              src={uploadedImages.LHSFrontTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
             
            />
          )}</Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Front Tyre : {formData.RHSFrontTyre}</Typography>
        {uploadedImages.RHSFrontTyres && (
            <img
              src={uploadedImages.RHSFrontTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">LHS Rear Tyre : {formData.LHSRearTyre}</Typography>
        {uploadedImages.LHSRearTyres && (
            <img
              src={uploadedImages.LHSRearTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Rear Tyre : {formData.RHSRearTyre}</Typography>
        {uploadedImages.RHSRearTyres && (
            <img
              src={uploadedImages.RHSRearTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Spare Tyre : {formData.SpareTyre}</Typography>
        {uploadedImages.SpareTyres && (
            <img
              src={uploadedImages.SpareTyres}
              alt="Uploaded"
              style={{
                maxWidth: '20%',
                marginTop: '10px',
                cursor: 'pointer',
              }}
            />
          )}</Grid>

      </Grid>
      </div>

<Typography variant="h5" className='text-black font-bold pb-4 pt-5 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Windshield and Lights</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5} >
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Windshield : {formData.Windshield}</Typography>
          {uploadedImages.Windshields && (
            <img
              src={uploadedImages.Windshields}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
          <Typography variant="body1">Front Windshield : {formData.FrontWindshield}</Typography>
          {uploadedImages.FrontWindshields && (
            <img
              src={uploadedImages.FrontWindshields}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
          <Typography variant="body1">Rear Windshield : {formData.RearWindshield}</Typography>
          {uploadedImages.RearWindshields && (
            <img
              src={uploadedImages.RearWindshields}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Light : {formData.Light}</Typography>
        {uploadedImages.Lights && (
            <img
              src={uploadedImages.Lights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Front Bumper : {formData.FrontBumper}</Typography>
        {uploadedImages.FrontBumpers && (
            <img
              src={uploadedImages.FrontBumpers}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Rear Bumper : {formData.RearBumper}</Typography>
        {uploadedImages.RearBumpers && (
            <img
              src={uploadedImages.RearBumpers}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">LHS Headlight : {formData.LHSHeadlight}</Typography>
        {uploadedImages.LHSHeadlights && (
            <img
              src={uploadedImages.LHSHeadlights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Headlight : {formData.RHSHeadlight}</Typography>
        {uploadedImages.RHSHeadlights && (
            <img
              src={uploadedImages.RHSHeadlights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">LHS Taillight : {formData.LHSTaillight}</Typography>
        {uploadedImages.LHSTaillights && (
            <img
              src={uploadedImages.LHSTaillights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
              
            />
          )}</Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">RHS Taillight : {formData.RHSTaillight}</Typography>
        {uploadedImages.RHSTaillights && (
            <img
              src={uploadedImages.RHSTaillights}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
             
            />
          )}</Grid>

        

        </Grid>
        </div>

<Typography variant="h5" className='text-black font-bold pb-4 pt-5 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Other Components</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5}>
       
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Head Light Support : {formData.HeadLightSupport}</Typography>
          {uploadedImages.HeadLightSupports && (
            <img
              src={uploadedImages.HeadLightSupports}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            
            />
          )}</Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Radiator Support : {formData.RadiatorSupport}</Typography>
        {uploadedImages.RadiatorSupports && (
            <img
              src={uploadedImages.RadiatorSupports}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Alloy Wheel : {formData.AlloyWheel}</Typography>
        {uploadedImages.AlloyWheels && (
            <img
              src={uploadedImages.AlloyWheels}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        

      </Grid>
      </div>

      {/* Structure */}
      <Typography variant="h5" className='text-black font-bold pb-4 pt-5 '>
      <span className='bg-indigo-200 rounded-md p-1 m-1 px-3 '>Structure</span>
      </Typography>
      <div className=' bg-white border-2 rounded-md shadow-md p-7 -mt-2'>
      <Grid container spacing={5}>
       
      <Grid item xs={12} sm={6}>
          <Typography variant="body1">Cowl Top : {formData.CowlTop}</Typography>
          {uploadedImages.CowlTops && (
            <img
              src={uploadedImages.CowlTops}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            
            />
          )}</Grid>


        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Boot Floor : {formData.BootFloor}</Typography>
        {uploadedImages.BootFloors && (
            <img
              src={uploadedImages.BootFloors}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Apron LEG : {formData.RightApronLEG}</Typography>
        {uploadedImages.RightApronLEGs && (
            <img
              src={uploadedImages.RightApronLEGs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Apron LEG : {formData.LeftApronLEG}</Typography>
        {uploadedImages.LeftApronLEGs && (
            <img
              src={uploadedImages.LeftApronLEGs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Apron : {formData.RightApron}</Typography>
        {uploadedImages.RightAprons && (
            <img
              src={uploadedImages.RightAprons}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Apron : {formData.LeftApron}</Typography>
        {uploadedImages.LeftAprons && (
            <img
              src={uploadedImages.LeftAprons}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Pillar : {formData.LeftPillar}</Typography>
        {uploadedImages.LeftPillars && (
            <img
              src={uploadedImages.LeftPillars}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Pillar A : {formData.LeftPillarA}</Typography>
        {uploadedImages.LeftPillarAs && (
            <img
              src={uploadedImages.LeftPillarAs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Pillar B : {formData.LeftPillarB}</Typography>
        {uploadedImages.LeftPillarBs && (
            <img
              src={uploadedImages.LeftPillarBs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Left Pillar C : {formData.LeftPillarC}</Typography>
        {uploadedImages.LeftPillarCs && (
            <img
              src={uploadedImages.LeftPillarCs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Pillar : {formData.RightPillar}</Typography>
        {uploadedImages.RightPillars && (
            <img
              src={uploadedImages.RightPillars}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Pillar A : {formData.RightPillarA }</Typography>
        {uploadedImages.RightPillarAs && (
            <img
              src={uploadedImages.RightPillarAs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Pillar B : {formData.RightPillarB}</Typography>
        {uploadedImages.RightPillarBs && (
            <img
              src={uploadedImages.RightPillarBs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

<Grid item xs={12} sm={6}>
        <Typography variant="body1">Right Pillar C : {formData.RightPillarC}</Typography>
        {uploadedImages.RightPillarCs && (
            <img
              src={uploadedImages.RightPillarCs}
              alt="Uploaded"
              style={{ maxWidth: '20%', marginTop: '10px', cursor: 'pointer' }}
            />
          )}</Grid>

      </Grid>
      </div>
    </div>
  );
};

export default ExteriorSectionUser;
