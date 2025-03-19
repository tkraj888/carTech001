/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useGetInspectionReportQuery } from "../../services/inspectorapi";

const SteeringSection = () => {
  const [formData, setFormData] = React.useState({
    Steering: "",
    Brake: "",
    Suspension: "",
  });

  const [uploadedImages, setUploadedImages] = useState({
    Steerings: null,
    Brakes: null,
    Suspensions: null,
  });

  const { beadingCarId } = useParams();

  const { data } = useGetInspectionReportQuery({
    beadingCarId,
    docType: "Steering",
  });

  useEffect(() => {
    // Pre-fill form data and uploaded images based on API data
    data?.object.map((item) => {
      switch (item.subtype) {
        case "Steering":
          setFormData((prev) => ({ ...prev, Steering: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            Steerings: item.documentLink,
          }));
          break;
        case "Brake":
          setFormData((prev) => ({ ...prev, Brake: item.comment }));
          setUploadedImages((prev) => ({ ...prev, Brakes: item.documentLink }));
          break;
        case "Suspension":
          setFormData((prev) => ({ ...prev, Suspension: item.comment }));
          setUploadedImages((prev) => ({
            ...prev,
            Suspensions: item.documentLink,
          }));
          break;
        default:
          break;
      }
    });
  }, [data]);
  return (
    <div>
      <div className="p-4">
        <Typography variant="h4" className="text-black font-bold pb-5">
          Steering
        </Typography>
        <div className=" bg-white border-2 rounded-md shadow-md p-7 -mt-2">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                Steering : {formData.Steering}
              </Typography>

              {uploadedImages.Steerings && (
                <img
                  src={uploadedImages.Steerings}
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
              <Typography variant="body1">Brake : {formData.Brake}</Typography>

              {uploadedImages.Brakes && (
                <img
                  src={uploadedImages.Brakes}
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
              <Typography variant="body1">
                Suspension : {formData.Suspension}
              </Typography>

              {uploadedImages.Suspensions && (
                <img
                  src={uploadedImages.Suspensions}
                  alt="Uploaded"
                  style={{
                    maxWidth: "20%",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
      {/* <div className="flex justify-center items-center mt-12">
        <Button
          variant="contained"
          color="primary"
          className="  rounded-lg bg-blue-500 text-white flex justify-centre items-center"
        >
          Submit
        </Button>
      </div> */}
    </div>
  );
};

export default SteeringSection;
