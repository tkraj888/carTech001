/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Grid, Typography, Button, Modal, makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useGetInspectionReportQuery, useInspectionReportMutation } from '../../services/inspectorapi';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import UploadImage4 from '../../ui/UploadImageComponents/UploadImage4';
import { useAddBiddingCarWithoutImageMutation } from "../../services/inspectorapi"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Engine = ({setCheckstep}) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();
 
  const { data ,refetch} = useGetInspectionReportQuery({ beadingCarId, docType: "Engine" });
 
 

  const [formData, setFormData] = useState({
    Engine: [],
    EngineMounting: [],
    EngineSound: [],
    Exhaustsmoke: [],
    Gearbox: [],
    Engineoil: [],
    Battery: [],
    Coolant: [],
    Clutch: [],
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

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [inspectionReport] = useInspectionReportMutation();
  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation()
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable ,setSelectedLable] = useState("");
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("")
  
 
  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

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

  const handleFileChange = async (event, fieldName, imgPreview = "") => {
   
    let file;
    let imageData;
  if (!event?.target) {
      
      file = event;
      imageData = file;
    } else {
      file = event.target.files[0];
    }
  
    if (!file) return;
  
    const formDataToSend = new FormData();
    formDataToSend.append('image', file);
  
    const reader = new FileReader();
    reader.onload = async () => {
      imageData = reader.result;
      
          setFormData({ ...formData, ["FourPowerWindowss"]: imageData });
          if (lables) {
      const inspectionData = {
        documentType: "Inspection Report",
        beadingCarId: beadingCarId,
        doc: "",
        doctype: "Engine",
        subtype: lables,
        comment: selectfiled,
      };
  
      try {
        const res = await inspectionReport({ inspectionData, formDataToSend });
        refetch()
       
        if (res.data?.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
          setLables('');
          setSelectfiled('');
        } else {
          toast.error("Data Upload failed", { autoClose: 500 });
        }
      } catch (error) {
        // console.error('Error uploading the file:', error);
        alert("Data not Uploaded");
      }
    } else {
      toast.error("Input is required", { autoClose: 2000 });
    }
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmitWithoutImage = async () => {
    if (lables) {
    const formDataToSend1 = new FormData();
    formDataToSend1.append('beadingCarId', beadingCarId);
    formDataToSend1.append('doctype', "Engine");
    formDataToSend1.append('subtype', lables);
    formDataToSend1.append('comment', selectfiled);
    formDataToSend1.append('documentType', "InspectionReport");
    formDataToSend1.append('doc', "");
    try {
      const res = await addBiddingCarWithoutImage({formDataToSend1});
      refetch()
     
      if (res.data?.message === "success") {
        
        toast.success("Data Uploaded", { autoClose: 500 });
        setLables('');
          setSelectfiled('');
      } else {
        toast.error("Data Upload failed", { autoClose: 500 });
      }
    } catch (error) {
      
      toast.error("Data not Uploaded", { autoClose: 500 });
    }
  } else {
    toast.error("Input is required", { autoClose: 2000 });
  }
  };

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key)
  }
  if (
    formData.Engine.length > 0 &&
    formData.EngineMounting.length > 0 &&
    formData.EngineSound.length > 0 &&
    formData.Exhaustsmoke.length > 0 &&
    formData.Gearbox.length > 0 &&
    formData.Engineoil.length > 0 &&
    formData.Battery.length > 0 &&
    formData.Coolant.length > 0 &&
    formData.Clutch.length > 0
  ) {
    setCheckstep(true);
    console.log("working")
  } else {
    setCheckstep(false);
   
  }
  
  // const handleCaptureImage = (imageUrl) => {
  //   setSelectedImage(imageUrl);
  //   setCaptureModalOpen(false); // Close the camera modal after capturing the image
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };
 

  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  //   setOpenModal(true);
  // };

  const fileInputRef = useRef(null);

  const handleCaptureImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageClick =  async(event)  => {
    // Handle the image upload here
    const file = event.target.files[0];
    const formDataToSend = new FormData();
    formDataToSend.append('image', file);
    
    const inspectionData = {
        documentType: "InspectionReport",
        beadingCarId: beadingCarId,
        doc: "",
        doctype: "Engine",
        subtype: lables,
        comment: selectfiled,
      };
  
      try {
        const res = await inspectionReport({ inspectionData, formDataToSend });
        refetch()
        
        if (res.data?.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
        } else {
          toast.error("Data Upload failed", { autoClose: 500 });
        }
      } catch (error) {
        // console.error('Error uploading the file:', error);
        toast.error("Data not Uploaded", { autoClose: 500 });
      }
    };

    const handleReset = (fieldName) => {
      setFormData((prev) => ({ ...prev, [fieldName]: "" })); // Reset form field value
      setUploadedImages((prev) => ({ ...prev, [fieldName + "s"]: null })); // Reset corresponding uploaded image
      setLables(""); // Clear labels
      setSelectfiled(""); // Clear selected field
    };

  return (
    <div className="p-4">
      <Typography variant="h4" className="text-black font-bold pb-5">
        Engine
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Engine</InputLabel>
            <Select
              required
              name="Engine"
              value={formData.Engine}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Misfiring">Misfiring</MenuItem>
              <MenuItem value="Long cranking due to weak Compression">
                Long cranking due to weak Compression
              </MenuItem>
              <MenuItem value="Permissible blow- by on idle">
                Permissible blow- by on idle
              </MenuItem>
              <MenuItem value="Fuel leakage from injector">
                Fuel leakage from injector
              </MenuItem>
              <MenuItem value="MIL light glowing">MIL light glowing</MenuItem>
              <MenuItem value="RPM Fluctuating">RPM Fluctuating</MenuItem>
              <MenuItem value="Over Heating">Over Heating</MenuItem>
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
              onClick={() => handleReset("Engine")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Engines && (
            <img
              src={uploadedImages.Engines}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Engines)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Engine Mounting</InputLabel>
            <Select
              required
              name="EngineMounting"
              value={formData.EngineMounting}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Loose">Loose</MenuItem>
              <MenuItem value="Tight">Tight</MenuItem>
              <MenuItem value="Excess Vibration">Excess Vibration</MenuItem>
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
              onClick={() => handleReset("EngineMounting")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.EngineMountings && (
            <img
              src={uploadedImages.EngineMountings}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.EngineMountings)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Engine Sound</InputLabel>
            <Select
              required
              name="EngineSound"
              value={formData.EngineSound}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Minor sound">Minor sound</MenuItem>
              <MenuItem value="No engine sound">No engine sound</MenuItem>
              <MenuItem value="Critical sound">Critical sound</MenuItem>
              <MenuItem value="No Blow-by">No Blow-by</MenuItem>
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
              onClick={() => handleReset("EngineSound")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.EngineSounds && (
            <img
              src={uploadedImages.EngineSounds}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.EngineSounds)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Exhaust Smoke</InputLabel>
            <Select
              required
              name="Exhaustsmoke"
              value={formData.Exhaustsmoke}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Black">Black</MenuItem>
              <MenuItem value="Blue">Blue</MenuItem>
              <MenuItem value="Silencer assembly Damaged and Create Noise">
                Silencer assembly Damaged and Create Noise
              </MenuItem>
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
              onClick={() => handleReset("Exhaustsmoke")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Exhaustsmokes && (
            <img
              src={uploadedImages.Exhaustsmokes}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Exhaustsmokes)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Gearbox</InputLabel>
            <Select
              required
              name="Gearbox"
              value={formData.Gearbox}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Abnormal Noise">Abnormal Noise</MenuItem>
              <MenuItem value="Oil leakage">Oil leakage</MenuItem>
              <MenuItem value="Shifting-Hard">Shifting-Hard</MenuItem>
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
              onClick={() => handleReset("Gearbox")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Gearboxs && (
            <img
              src={uploadedImages.Gearboxs}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Gearboxs)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Engine Oil</InputLabel>
            <Select
              required
              name="Engineoil"
              value={formData.Engineoil}
              onChange={handleChange}
            >
              <MenuItem value="Low Level">Low Level</MenuItem>
              <MenuItem value="Leakage">Leakage</MenuItem>
              <MenuItem value="Deteriorated">Deteriorated</MenuItem>
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
              onClick={() => handleReset("Engineoil")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Engineoils && (
            <img
              src={uploadedImages.Engineoils}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginsTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Engineoils)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Battery</InputLabel>
            <Select
              required
              name="Battery"
              value={formData.Battery}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Weak">Weak</MenuItem>
              <MenuItem value="jump start">jump start</MenuItem>
              <MenuItem value="Dead">Dead</MenuItem>
              <MenuItem value="Acid leakage">Acid leakage</MenuItem>
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
              onClick={() => handleReset("Battery")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Batterys && (
            <img
              src={uploadedImages.Batterys}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Batterys)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Coolant</InputLabel>
            <Select
              required
              name="Coolant"
              value={formData.Coolant}
              onChange={handleChange}
            >
              <MenuItem value="Low Level">Low Level</MenuItem>
              <MenuItem value="Leakage">Leakage</MenuItem>
              <MenuItem value="Deteriorated">Deteriorated</MenuItem>
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
              onClick={() => handleReset("Coolant")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Coolants && (
            <img
              src={uploadedImages.Coolants}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Coolants)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Clutch</InputLabel>
            <Select
              required
              name="Clutch"
              value={formData.Clutch}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Slipping">Slipping</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
              <MenuItem value="Spongy">Spongy</MenuItem>
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
              onClick={() => handleReset("Clutch")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Clutchs && (
            <img
              src={uploadedImages.Clutchs}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Clutchs)}
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

      {/* <div className="flex justify-between mt-10 px-8">
        <Button variant="contained" color="success">
          Previous
        </Button>
        <Button variant="contained" color="success">
          Next
        </Button>
      </div> */}
    </div>
  );
};

export default Engine;
