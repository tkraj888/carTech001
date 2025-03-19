/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
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
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  useGetInspectionReportQuery,
  useInspectionReportMutation,
} from "../../services/inspectorapi";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UploadImage4 from "../../ui/UploadImageComponents/UploadImage4";
import { useAddBiddingCarWithoutImageMutation } from "../../services/inspectorapi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    maxWidth: "90%",
    maxHeight: "90%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
}));

const Interior = ({ setCheckstep }) => {
  const classes = useStyles();
  const { beadingCarId } = useParams();

  const { data, refetch } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "Interior",
  });

  const [formData, setFormData] = useState({
    LeatherSeat: "",
    Odometer: "",
    CabinFloor: "",
    Dashboard: "",
  });

  const [uploadedImages, setUploadedImages] = useState({
    LeatherSeats: null,
    Odometers: null,
    CabinFloors: null,
    Dashboards: null,
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [inspectionReport] = useInspectionReportMutation();
  const [addBiddingCarWithoutImage] = useAddBiddingCarWithoutImageMutation();
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  const [selectedLable, setSelectedLable] = useState("");
  const [lables, setLables] = useState("");
  const [selectfiled, setSelectfiled] = useState("");

  const token = Cookies.get("token");
  let jwtDecodes;
  if (token) {
    jwtDecodes = jwtDecode(token);
  }

  const userRole = token ? jwtDecodes?.authorities[0] : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (value.length > 0) {
      setLables(name);
      setSelectfiled(value);
    }
  };

  const handleFileChange = async (event, fieldName, imgPreview = "") => {
    let file;
    let imageData;
    if (!event?.target) {
      // console.log("name");
      file = event;
      imageData = file;
    } else {
      file = event.target.files[0];
    }

    if (!file) return;

    const formDataToSend = new FormData();
    formDataToSend.append("image", file);

    const reader = new FileReader();
    reader.onload = async () => {
      imageData = reader.result;

      setFormData({ ...formData, ["FourPowerWindowss"]: imageData });
      if (lables) {
        const inspectionData = {
          documentType: "Inspection Report",
          beadingCarId: beadingCarId,
          doc: "",
          doctype: "Interior",
          subtype: lables,
          comment: selectfiled,
        };

        try {
          const res = await inspectionReport({
            inspectionData,
            formDataToSend,
          });
          refetch();

          if (res.data?.message === "success") {
            toast.success("Data Uploaded", { autoClose: 500 });
            setLables("");
            setSelectfiled("");
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
      formDataToSend1.append("beadingCarId", beadingCarId);
      formDataToSend1.append("doctype", "Interior");
      formDataToSend1.append("subtype", lables);
      formDataToSend1.append("comment", selectfiled);
      formDataToSend1.append("documentType", "InspectionReport");
      formDataToSend1.append("doc", "");
      try {
        const res = await addBiddingCarWithoutImage({ formDataToSend1 });
        refetch();

        if (res.data?.message === "success") {
          toast.success("Data Uploaded", { autoClose: 500 });
          setLables("");
          setSelectfiled("");
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

  // const handleCaptureImage = (imageUrl) => {
  //   setSelectedImage(imageUrl);
  //   setCaptureModalOpen(false); // Close the camera modal after capturing the image
  // };

  const handleCameraModal = (key) => {
    setCaptureModalOpen(true);
    setSelectedLable(key);
  };

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "LeatherSeat":
          setFormData((prev) => ({ ...prev, LeatherSeat: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            LeatherSeats: item.documentLink,
          }));
          break;
        case "Odometer":
          setFormData((prev) => ({ ...prev, Odometer: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            Odometers: item.documentLink,
          }));
          break;
        case "CabinFloor":
          setFormData((prev) => ({ ...prev, CabinFloor: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            CabinFloors: item.documentLink,
          }));
          break;
        case "Dashboard":
          setFormData((prev) => ({ ...prev, Dashboard: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            Dashboards: item.documentLink,
          }));
          break;
        default:
          break;
      }
    });
  }, [data]);
  if (
    formData.LeatherSeat.trim() !== "" &&
    formData.Odometer.trim() !== "" &&
    formData.CabinFloor.trim() !== "" &&
    formData.Dashboard.trim() !== ""
  ) {
    setCheckstep(true);
  } else {
    setCheckstep(false);
  }

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

  const handleImageClick = async (event) => {
    // Handle the image upload here
    const file = event.target.files[0];
    const formDataToSend = new FormData();
    formDataToSend.append("image", file);

    const inspectionData = {
      documentType: "InspectionReport",
      beadingCarId: beadingCarId,
      doc: "",
      doctype: "Interior",
      subtype: lables,
      comment: selectfiled,
    };

    try {
      const res = await inspectionReport({ inspectionData, formDataToSend });
      refetch();

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
        Interior
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Leather Seat</InputLabel>
            <Select
              required
              name="LeatherSeat"
              value={formData.LeatherSeat}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Torn">Torn</MenuItem>
              <MenuItem value="Worn Out">Worn Out</MenuItem>
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
              onClick={() => handleReset("LeatherSeat")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.LeatherSeats && (
            <img
              src={uploadedImages.LeatherSeats}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.LeatherSeats)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Odometer</InputLabel>
            <Select
              required
              name="Odometer"
              value={formData.Odometer}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Tempered">Tempered</MenuItem>
              <MenuItem value="Not Tempered">Not Tempered</MenuItem>
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
              onClick={() => handleReset("Odometer")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Odometers && (
            <img
              src={uploadedImages.Odometers}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Odometers)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Cabin Floor</InputLabel>
            <Select
              required
              name="CabinFloor"
              value={formData.CabinFloor}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              {/* <MenuItem value="Repainted">Repainted</MenuItem> */}
              <MenuItem value="Dented">Dented</MenuItem>
              {/* <MenuItem value="Scratched">Scratched</MenuItem> */}
              <MenuItem value="Rusted">Rusted</MenuItem>

              {/* <MenuItem value="Repaired">Repaired</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem> */}
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
              onClick={() => handleReset("CabinFloor")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.CabinFloors && (
            <img
              src={uploadedImages.CabinFloors}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.CabinFloors)}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Dashboard</InputLabel>
            <Select
              required
              name="Dashboard"
              value={formData.Dashboard}
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
              onClick={() => handleReset("Dashboard")}
              size="small"
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Reset
            </Button>
          </div>
          {uploadedImages.Dashboards && (
            <img
              src={uploadedImages.Dashboards}
              alt="Uploaded"
              style={{ maxWidth: "20%", marginTop: "10px", cursor: "pointer" }}
              onClick={() => handleImageClick(uploadedImages.Dashboards)}
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

export default Interior;
