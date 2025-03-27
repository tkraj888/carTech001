/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Grid, Typography } from "@material-ui/core";

const CarDocumentSection = ({ inspData }) => {
  
  // const [formData, setFormData] = React.useState({
  //   rcAvailability: "",
  //   mismatchInRC: "",
  //   rtoNocIssued: "",
  //   insuranceType: "",
  //   noClaimBonus: "",
  //   underHypothecation: "",
  //   roadTaxPaid: "",
  //   partipeshiRequest: "",
  //   duplicateKey: "",
  //   chassisNumberEmbossing: "",
  //   manufacturingDate: "",
  //   registrationDate: "",
  //   rto: "",
  //   fitnessUpto: "",
  //   cngLpgFitmentInRC: "",
  // });

  return (
    <div className="p-4 flex-col ">
      <Typography variant="h4" className="text-black font-bold pb-10">
        <span>Important Document</span>
      </Typography>
      <div className=" bg-white border-2 rounded-md shadow-md p-7 -mt-2">
        <Grid container spacing={3}>
          {/* RC Availability */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              RC Availability:{" "}
              <span className="font-semibold">
                {inspData?.object.rcavailability}
              </span>
            </Typography>
          </Grid>

          {/* Mismatch in RC */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Mismatch in RC:{" "}
              <span className="font-semibold">
                {inspData?.object.mismatchInRC}
              </span>
            </Typography>
          </Grid>

          {/* RTO NOC Issued */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              RTO NOC Issued:{" "}
              <span className="font-semibold">
                {inspData?.object.rtonocissued}
              </span>
            </Typography>
          </Grid>

          {/* Insurance Type */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Insurance Type:{" "}
              <span className="font-semibold">
                {inspData?.object.insuranceType}
              </span>
            </Typography>
          </Grid>

          {/* No Claim Bonus */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              No Claim Bonus:{" "}
              <span className="font-semibold">
                {inspData?.object.noClaimBonus}
              </span>
            </Typography>
          </Grid>

          {/* Under Hypothecation */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Under Hypothecation:{" "}
              <span className="font-semibold">
                {inspData?.object.underHypothecation}
              </span>
            </Typography>
          </Grid>

          {/* Road Tax Paid */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Road Tax Paid:{" "}
              <span className="font-semibold">
                {inspData?.object.roadTaxPaid}
              </span>
            </Typography>
          </Grid>

          {/* Partipeshi Request */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Partipeshi Request:{" "}
              <span className="font-semibold">
                {inspData?.object.partipeshiRequest}
              </span>
            </Typography>
          </Grid>

          {/* Duplicate Key */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Duplicate Key:{" "}
              <span className="font-semibold">
                {inspData?.object.duplicateKey}
              </span>
            </Typography>
          </Grid>

          {/*NOC Sta */}
          {/* <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              NOC Status:{" "}
              <span className="font-semibold">
                {inspData?.object.NOCStatus}
              </span>
            </Typography>
          </Grid> */}

          {/* Chassis Number Embossing */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Chassis Number Embossing:{" "}
              <span className="font-semibold">
                {inspData?.object.chassisNumberEmbossing}
              </span>
            </Typography>
          </Grid>

          {/* Manufacturing Date */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Manufacturing Date:{" "}
              <span className="font-semibold">
                {inspData?.object.manufacturingDate}
              </span>
            </Typography>
          </Grid>

          {/* Registration Date */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Registration Date:{" "}
              <span className="font-semibold">
                {inspData?.object.registrationDate}
              </span>
            </Typography>
          </Grid>

          {/* RTO */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <label htmlFor="">RTO:</label>{" "}
              <span className="font-semibold">
                {inspData?.object.rto}
              </span>
            </Typography>
          </Grid>

          {/* Fitness Upto */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <label htmlFor="">Fitness Upto:</label>{" "}
              <span className="font-semibold">
                {inspData?.object.fitnessUpto}
              </span>
            </Typography>
          </Grid>

          {/* CNG/LPG Fitment in RC */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              CNG/LPG Fitment in RC:{" "}
              <span className="font-semibold">
                {inspData?.object.cnglpgfitmentInRC}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </div>
      {/* <div className="flex justify-between mt-10 px-8">
        <button
          className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default CarDocumentSection;
