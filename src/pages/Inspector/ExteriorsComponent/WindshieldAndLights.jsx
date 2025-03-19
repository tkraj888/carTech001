/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
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

const WindshieldAndLights = ({ handleCameraModal, 
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
  handleChange,handleImageClick,fileInputRef
}) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "Windshield":
          setFormData((prev) => ({ ...prev, Windshield: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Windshields: item.documentLink }));
          break;
          case "FrontWindshield":
            setFormData((prev) => ({ ...prev, FrontWindshield: item.comment }));
            setUploadedImages((prev) => ({ ...prev, FrontWindshield: item.documentLink }));
            break;
            case "RearWindshield":
              setFormData((prev) => ({ ...prev, RearWindshield: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RearWindshield: item.documentLink }));
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
          case "LHSORVM":
            setFormData((prev) => ({ ...prev, LHSORVM: item.comment }));
            setUploadedImages((prev) => ({ ...prev, LHSORVM: item.documentLink }));
            break;
            case "RHSORVM":
              setFormData((prev) => ({ ...prev, RHSORVM: item.comment }));
              setUploadedImages((prev) => ({ ...prev, RHSORVM: item.documentLink }));
              break;
           
        default:
          break;
      }
    });
  }, [data]);

  const handleReset = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" })); // Reset form field value
    setUploadedImages((prev) => ({ ...prev, [fieldName + "s"]: null })); // Reset corresponding uploaded image
    // setLables(""); // Clear labels
    // setSelectfiled(""); // Clear selected field
  };

  return (
    <div className="p-4 mt-10">
      <Typography variant="h4" className="text-black font-bold pb-5 pt-15 ">
        Windshield And Lights
      </Typography>

      <Grid container spacing={3}>
        {/* Windshield */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Windshield</InputLabel>
            <Select
              required
              name="Windshield"
              value={formData.Windshield}
              onChange={handleChange}
              color="Green"
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Dented">Replaced</MenuItem>
              {/* <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem> */}
              <MenuItem value="Damaged">Damaged</MenuItem>
              {/* <MenuItem value="NotWorking">Not Working</MenuItem> */}
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
              onClick={() => handleReset("Windshield")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Windshields && (
            <img
              src={uploadedImages.Windshields}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Windshields)}
            />
          )}
        </Grid>
        {/* FrontWindshield */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Front Windshield</InputLabel>
            <Select
              required
              name="FrontWindshield"
              value={formData.FrontWindshield}
              onChange={handleChange}
              color="Green"
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Dented">Replaced</MenuItem>
              {/* <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem> */}
              <MenuItem value="Damaged">Damaged</MenuItem>
              {/* <MenuItem value="NotWorking">Not Working</MenuItem> */}
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
              onClick={() => handleReset("FrontWindshield")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.FrontWindshield && (
            <img
              src={uploadedImages.FrontWindshield}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.FrontWindshield)}
            />
          )}
        </Grid>

        {/* RearWindshield */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel> Rear Windshield</InputLabel>
            <Select
              required
              name="RearWindshield"
              value={formData.RearWindshield}
              onChange={handleChange}
              color="Green"
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Dented">Replaced</MenuItem>
              {/* <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem> */}
              <MenuItem value="Damaged">Damaged</MenuItem>
              {/* <MenuItem value="NotWorking">Not Working</MenuItem> */}
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
              onClick={() => handleReset("RearWindshield")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RearWindshield && (
            <img
              src={uploadedImages.RearWindshield}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.RearWindshield)}
            />
          )}
        </Grid>

        {/* Light */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Light</InputLabel>
            <Select
              required
              name="Light"
              value={formData.Light}
              onChange={handleChange}
              color="Green"
            >
              {/* <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem> */}
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              {/* <MenuItem value="Rusted">Rusted</MenuItem> */}
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>

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
              onClick={() => handleReset("Light")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Lights && (
            <img
              src={uploadedImages.Lights}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Lights)}
            />
          )}
        </Grid>

        {/* Front Bumper */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Front Bumper</InputLabel>
            <Select
              required
              name="FrontBumper"
              value={formData.FrontBumper}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
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
              onClick={() => handleReset("FrontBumper")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.FrontBumpers && (
            <img
              src={uploadedImages.FrontBumpers}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.FrontBumpers)}
            />
          )}
        </Grid>

        {/* Rear Bumper */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Rear Bumper</InputLabel>
            <Select
              required
              name="RearBumper"
              value={formData.RearBumper}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="NotWorking">Not Working</MenuItem>
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
              onClick={() => handleReset("RearBumper")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RearBumpers && (
            <img
              src={uploadedImages.RearBumpers}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.RearBumpers)}
            />
          )}
        </Grid>

        {/* LHS Headlight */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>LHS Headlight</InputLabel>
            <Select
              required
              name="LHSHeadlight"
              value={formData.LHSHeadlight}
              onChange={handleChange}
            >
              {/* <MenuItem value="Repainted">Repainted</MenuItem> */}
              {/* <MenuItem value="Dented">Dented</MenuItem> */}
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              {/* <MenuItem value="Rusted">Rusted</MenuItem> */}
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="NotWorking">Not Working</MenuItem>
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
              onClick={() => handleReset("LHSHeadlight")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LHSHeadlights && (
            <img
              src={uploadedImages.LHSHeadlights}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.LHSHeadlights)}
            />
          )}
        </Grid>

        {/* RHS Headlight */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>RHS Headlight</InputLabel>
            <Select
              required
              name="RHSHeadlight"
              value={formData.RHSHeadlight}
              onChange={handleChange}
            >
              {/* <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem> */}
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              {/* <MenuItem value="Rusted">Rusted</MenuItem> */}
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="NotWorking">Not Working</MenuItem>
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
              onClick={() => handleReset("RHSHeadlight")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RHSHeadlights && (
            <img
              src={uploadedImages.RHSHeadlights}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.RHSHeadlights)}
            />
          )}
        </Grid>

        {/* LHS Taillight */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>LHS Taillight</InputLabel>
            <Select
              required
              name="LHSTaillight"
              value={formData.LHSTaillight}
              onChange={handleChange}
            >
              {/* <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem> */}
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              {/* <MenuItem value="Rusted">Rusted</MenuItem> */}
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="NotWorking">Not Working</MenuItem>
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
              onClick={() => handleReset("LHSTaillight")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LHSTaillights && (
            <img
              src={uploadedImages.LHSTaillights}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.LHSTaillights)}
            />
          )}
        </Grid>

        {/* RHS Taillight */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>RHS Taillight</InputLabel>
            <Select
              required
              name="RHSTaillight"
              value={formData.RHSTaillight}
              onChange={handleChange}
            >
              {/* <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem> */}
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Scratched">Scratched</MenuItem>
              {/* <MenuItem value="Rusted">Rusted</MenuItem> */}
              <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="NotWorking">Not Working</MenuItem>
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
              onClick={() => handleReset("RHSTaillight")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RHSTaillights && (
            <img
              src={uploadedImages.RHSTaillights}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.RHSTaillights)}
            />
          )}
        </Grid>

        {/* RHSORVM */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>LHS ORVM</InputLabel>
            <Select
              required
              name="LHSORVM"
              value={formData.LHSORVM}
              onChange={handleChange}
            >
              {/* <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem> */}

              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="NotWorking">Not Working</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Missing">Missing</MenuItem>
              <MenuItem value="Cracked">Mirror Broken/Cracked</MenuItem>
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
              onClick={() => handleReset("LHSORVM")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LHSORVM && (
            <img
              src={uploadedImages.LHSORVM}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.LHSORVM)}
            />
          )}
        </Grid>

        {/* LHSORVM */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>RHS ORVM</InputLabel>
            <Select
              required
              name="RHSORVM"
              value={formData.RHSORVM}
              onChange={handleChange}
            >
              {/* <MenuItem value="Repainted">Repainted</MenuItem>
              <MenuItem value="Dented">Dented</MenuItem> */}

              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="NotWorking">Not Working</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
              <MenuItem value="Missing">Missing</MenuItem>
              <MenuItem value="Cracked">Mirror Broken/Cracked</MenuItem>
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
              onClick={() => handleReset("RHSORVM")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RHSORVM && (
            <img
              src={uploadedImages.RHSORVM}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.RHSORVM)}
            />
          )}
        </Grid>
      </Grid>

      {/* Modal for displaying clicked image */}
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

export default WindshieldAndLights;
