/* eslint-disable react/prop-types */

import{ useEffect, useRef, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { useAddBiddingCarWithoutImageMutation, useGetInspectionReportQuery, useInspectionReportMutation, useInspectionReportNewMutation } from '../../../services/inspectorapi';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import UploadImage4 from '../../../ui/UploadImageComponents/UploadImage4';
import {  toast } from 'react-toastify';


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

const Tyre = ({setCheckstep}) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();
  
  const { data,refetch } = useGetInspectionReportQuery({ beadingCarId, docType: "Exterior" });
  


  const [formData, setFormData] = useState({
    LHSFrontTyre: [],
    RHSFrontTyre: [],
    LHSRearTyre: [],
    RHSRearTyre: [],
    SpareTyre: []
  });

  const [inspectionReport ] = useInspectionReportMutation();
  const [inspectionReportNew ] = useInspectionReportNewMutation();

  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation()
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable ,setSelectedLable] = useState("");
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("")

  const [uploadedImages, setUploadedImages] = useState({
    LHSFrontTyres: null,
    RHSFrontTyres: null,
    LHSRearTyres: null,
    RHSRearTyres: null,
    SpareTyres: null
  });
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
        default:
          break;
      }
    });
  }, [data]);

  
  const handleFileChange = async (event, fieldName, imgPreview = "") => {
    imgPreview;
    // console.log(imgPreview);
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
    formDataToSend.append('documentType', "InspectionReport");
    formDataToSend.append('beadingCarId', beadingCarId);
    formDataToSend.append('doc', "");
    formDataToSend.append('doctype', "Exterior");
    formDataToSend.append('subtype', lables);
    formDataToSend.append('comment', selectfiled);
  
    const reader = new FileReader();
    reader.onload = async () => {
      imageData = reader.result;
     
          setFormData({ ...formData, ["FourPowerWindowss"]: imageData });
          if (lables) {
      // const inspectionData = {
      //   documentType: "InspectionReport",
      //   beadingCarId: beadingCarId,
      //   doc: "",
      //   doctype: "Exterior",
      //   subtype: lables,
      //   // comment: selectfiled,
      // };
  
      try {
        const res = await inspectionReportNew({  formDataToSend });
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
    formDataToSend1.append('doctype', "Exterior");
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
      // console.error('Error uploading the data:', error);
      alert("Data not Uploaded")
    }
  } else {
    toast.error("Input is required", { autoClose: 2000 });
  }
  };

  if (
    formData.LHSFrontTyre.length > 0 &&
    formData.RHSFrontTyre.length > 0 &&
    formData.LHSRearTyre.length > 0 &&
    formData.RHSRearTyre.length > 0 &&
    formData.SpareTyre.length > 0
  ) {
    setCheckstep(true);
    console.log("All conditions met, setting checkstep to true");
  } else {
    setCheckstep(false);
    console.log("One or more conditions not met, setting checkstep to false");
  }
  
  const handleChange= (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };
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
        doctype: "Exterior",
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

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key)
  }

  const handleReset = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" })); // Reset form field value
    setUploadedImages((prev) => ({ ...prev, [fieldName + "s"]: null })); // Reset corresponding uploaded image
    setLables(""); // Clear labels
    setSelectfiled(""); // Clear selected field
  };
  // const handleImageClick = (image) => {
  //   setSelectedImage(image);
  //   setOpenModal(true);
  // };

  
  return (
    <div className="p-4">
      <Typography variant="h4" className="text-black font-bold pb-5 pt-16">
        Tyres
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>LHS Front Tyre</InputLabel>
            <Select
              required
              name="LHSFrontTyre"
              value={formData.LHSFrontTyre}
              onChange={handleChange}
            >
              <MenuItem value="ok-69-85%">Ok 69-85%</MenuItem>
              <MenuItem value="not-ok-22-38%">Not Ok 22-38%</MenuItem>
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
              onClick={() => handleReset("LHSFrontTyre")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LHSFrontTyres && (
            <img
              src={uploadedImages.LHSFrontTyres}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LHSFrontTyres)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>RHS Front Tyre</InputLabel>
            <Select
              required
              name="RHSFrontTyre"
              value={formData.RHSFrontTyre}
              onChange={handleChange}
            >
              <MenuItem value="ok-69-85%">Ok 69-85%</MenuItem>
              <MenuItem value="not-ok-22-38%">Not Ok 22-38%</MenuItem>
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
              onClick={() => handleReset("RHSFrontTyre")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RHSFrontTyres && (
            <img
              src={uploadedImages.RHSFrontTyres}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RHSFrontTyres)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>LHS Rear Tyre</InputLabel>
            <Select
              required
              name="LHSRearTyre"
              value={formData.LHSRearTyre}
              onChange={handleChange}
            >
              <MenuItem value="ok-69-85%">Ok 69-85%</MenuItem>
              <MenuItem value="not-ok-22-38%">Not Ok 22-38%</MenuItem>
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
              onClick={() => handleReset("LHSRearTyre")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LHSRearTyres && (
            <img
              src={uploadedImages.LHSRearTyres}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.LHSRearTyres)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>RHS Rear Tyre</InputLabel>
            <Select
              required
              name="RHSRearTyre"
              value={formData.RHSRearTyre}
              onChange={handleChange}
            >
              <MenuItem value="ok-69-85%">Ok 69-85%</MenuItem>
              <MenuItem value="not-ok-22-38%">Not Ok 22-38%</MenuItem>
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
              onClick={() => handleReset("RHSRearTyre")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.RHSRearTyres && (
            <img
              src={uploadedImages.RHSRearTyres}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.RHSRearTyres)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Spare Tyre</InputLabel>
            <Select
              required
              name="SpareTyre"
              value={formData.SpareTyre}
              onChange={handleChange}
            >
              <MenuItem value="ok-69-85%">Ok 69-85%</MenuItem>
              <MenuItem value="not-ok-22-38%">Not Ok 22-38%</MenuItem>
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
              onClick={() => handleReset("SpareTyre")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.SpareTyres && (
            <img
              src={uploadedImages.SpareTyres}
              alt="Uploaded"
              style={{
                maxWidth: "20%",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(uploadedImages.SpareTyres)}
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

export default Tyre;
