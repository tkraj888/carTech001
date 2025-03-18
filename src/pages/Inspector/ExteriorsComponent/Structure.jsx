/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// #Cowl Top :- status/options - Repainted, Dented, Scratched, Rusted, Repaired, Damaged,faded
// # Boot Floor :- status/options - Repainted, Dented, Scratched, Rusted, Repaired, Damaged,faded
// # Right Apron LEG :- status/options - Repainted, Dented, Scratched, Rusted, Repaired,
// Damaged,faded
// # Left Apron LEG :- status/options - Repainted, Dented, Scratched, Rusted, Repaired,
// Damaged,faded
// #Left Apron :- status/options - Repainted, Dented, Scratched, Rusted, Repaired, Damaged,faded
// #Right Apron :- status/options - Repainted, Dented, Scratched, Rusted, Repaired, Damaged,faded
// #Left Pillar :- status/options - Repainted, Dented, Scratched, Rusted, Repaired,
// Damaged,faded
// #Right Pillar :- status/options - Repainted, Dented, Scratched, Rusted, Repaired,
// Damaged,faded

import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Grid,
  Typography,
  Button,
  Modal,
  makeStyles,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import UploadImage4 from '../../../ui/UploadImageComponents/UploadImage4';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    maxWidth: '90%',
    maxHeight: '90%',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
}));

const Structure = ({ handleCameraModal, 
  userRole, 
  handleCaptureImage, 
  handleSubmitWithoutImage, 
  data, 
  formData, 
  setFormData, 
  handleFileChange, 
  uploadedImages, 
  setUploadedImages,
  captureModalOpen,
  setCaptureModalOpen,
  selectedLable,
  handleChange,handleImageClick,fileInputRef }) => {
  const classes = useStyles();


  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
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
            setUploadedImages((prev) => ({ ...prev, LeftPillarA: item.documentLink }));
            break;
            case "LeftPillarB":
            setFormData((prev) => ({ ...prev, LeftPillarB: item.comment }));
            setUploadedImages((prev) => ({ ...prev, LeftPillarB: item.documentLink }));
            break;
            case "LeftPillarC":
            setFormData((prev) => ({ ...prev, LeftPillarC: item.comment }));
            setUploadedImages((prev) => ({ ...prev, LeftPillarC: item.documentLink }));
            break;
        case "RightPillar":
          setFormData((prev) => ({ ...prev, RightPillar: item.comment }));
          setUploadedImages((prev) => ({ ...prev, RightPillars: item.documentLink }));
          break;
          case "RightPillarA":
            setFormData((prev) => ({ ...prev, RightPillarA: item.comment }));
            setUploadedImages((prev) => ({ ...prev, RightPillarA: item.documentLink }));
            break;
             case "RightPillarB":
          setFormData((prev) => ({ ...prev, RightPillarB: item.comment }));
          setUploadedImages((prev) => ({ ...prev, RightPillarB: item.documentLink }));
          break;
          case "RightPillarC":
            setFormData((prev) => ({ ...prev, RightPillarC: item.comment }));
            setUploadedImages((prev) => ({ ...prev, RightPillarC: item.documentLink }));
            break;
        default:
          break;
      }
    });
  }, [data]);
 
  const handleReset = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" })); // Reset form field value
    setUploadedImages((prev) => ({ ...prev, [fieldName + "s"]: null })); // Reset corresponding uploaded image
  };

  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  //   setOpenModal(true);
  // };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-black font-bold pb-5 pt-16">
        Structure
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Cowl Top</InputLabel>
            <Select
              required
              name="CowlTop"
              value={formData.CowlTop}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("CowlTop")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.CowlTops && (
            <img
              src={uploadedImages.CowlTops}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.CowlTops)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Boot Floor</InputLabel>
            <Select
              required
              name="BootFloor"
              value={formData.BootFloor}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("BootFloor")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.BootFloors && (
            <img
              src={uploadedImages.BootFloors}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.BootFloors)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Apron LEG</InputLabel>
            <Select
              required
              name="RightApronLEG"
              value={formData.RightApronLEG}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Replaced">Replaced</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("RightApronLEG")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightApronLEGs && (
            <img
              src={uploadedImages.RightApronLEGs}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightApronLEGs)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Apron LEG</InputLabel>
            <Select
              required
              name="LeftApronLEG"
              value={formData.LeftApronLEG}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Replaced">Replaced</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("LeftApronLEG")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftApronLEGs && (
            <img
              src={uploadedImages.LeftApronLEGs}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftApronLEGs)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Apron</InputLabel>
            <Select
              required
              name="RightApron"
              value={formData.RightApron}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Replaced">Replaced</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("RightApron")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightAprons && (
            <img
              src={uploadedImages.RightAprons}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightAprons)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Apron</InputLabel>
            <Select
              required
              name="LeftApron"
              value={formData.LeftApron}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Replaced">Replaced</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("LeftApron")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftAprons && (
            <img
              src={uploadedImages.LeftAprons}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftAprons)}
            />
          )}
        </Grid>

        {/* Left Pillar */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Pillar</InputLabel>
            <Select
              required
              name="LeftPillar"
              value={formData.LeftPillar}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("LeftPillar")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftPillars && (
            <img
              src={uploadedImages.LeftPillars}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftPillars)}
            />
          )}
        </Grid>
        {/*  
        Left Pillar A */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Pillar A</InputLabel>
            <Select
              required
              name="LeftPillarA"
              value={formData.LeftPillarA}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("LeftPillarA")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftPillarA && (
            <img
              src={uploadedImages.LeftPillarA}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftPillarA)}
            />
          )}
        </Grid>

        {/*  
        Left Pillar B */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Pillar B</InputLabel>
            <Select
              required
              name="LeftPillarB"
              value={formData.LeftPillarB}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("LeftPillarB")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftPillarB && (
            <img
              src={uploadedImages.LeftPillarB}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftPillarB)}
            />
          )}
        </Grid>

        {/*  
        Left Pillar c */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Left Pillar C</InputLabel>
            <Select
              required
              name="LeftPillarC"
              value={formData.LeftPillarC}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("LeftPillarC")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeftPillarC && (
            <img
              src={uploadedImages.LeftPillarC}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LeftPillarC)}
            />
          )}
        </Grid>

        {/* Right pillar  */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Pillar</InputLabel>
            <Select
              required
              name="RightPillar"
              value={formData.RightPillar}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("RightPillar")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightPillars && (
            <img
              src={uploadedImages.RightPillars}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightPillars)}
            />
          )}
        </Grid>
        {/* 
        Right Pillar A */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Pillar A</InputLabel>
            <Select
              required
              name="RightPillarA"
              value={formData.RightPillarA}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("RightPillarA")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightPillarA && (
            <img
              src={uploadedImages.RightPillarA}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightPillarA)}
            />
          )}
        </Grid>
        {/* 
        Right Pillar B */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Pillar B </InputLabel>
            <Select
              required
              name="RightPillarB"
              value={formData.RightPillarB}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("RightPillarB")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightPillarB && (
            <img
              src={uploadedImages.RightPillarB}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightPillarB)}
            />
          )}
        </Grid>

        {/* 
        Right Pillar C */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Right Pillar C </InputLabel>
            <Select
              required
              name="RightPillarC"
              value={formData.RightPillarC}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Faded">Faded</MenuItem>
              <MenuItem value="Sealent Broken">Sealent Broken</MenuItem>
            </Select>
          </FormControl>
          <div className="flex gap-5">
            <Button
              onClick={handleSubmitWithoutImage}
              size="small"
              variant="contained"
              color="success"
              style={{ marginTop: "10px" }}
            >
              Submit Without image
            </Button>
            {userRole === "INSPECTOR" ? (
              <div className="mt-3 ml-5">
                <Button
                  onClick={() => handleCameraModal("ABSs")}
                  size="small"
                  variant="contained"
                  color="success"
                >
                  Open Camera
                </Button>
              </div>
            ) : (
              <label
                htmlFor="upload-MusicSystems"
                onClick={handleCaptureImage}
                className="cursor-pointer flex items-center"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageClick}
                />
                <CloudUploadIcon />
                <span className="ml-2">Upload Image</span>
              </label>
            )}
            <Button
              onClick={() => handleReset("RightPillarC")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RightPillars && (
            <img
              src={uploadedImages.RightPillars}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RightPillars)}
            />
          )}
        </Grid>
      </Grid>

      <Modal
        open={captureModalOpen}
        onClose={() => setCaptureModalOpen(false)}
        // className={classes.modal}
      >
        <div className={classes.paper}>
          <UploadImage4
            isOpen={captureModalOpen}
            onClose={() => setCaptureModalOpen(false)}
            onCapture={handleCaptureImage}
            handleCaptureImage={handleFileChange}
            selectfiled={selectedLable}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Structure;
