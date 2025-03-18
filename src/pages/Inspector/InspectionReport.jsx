/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, InputLabel, TextField, Grid, Typography,Button, FormHelperText } from '@material-ui/core';
import {useFinalInspectionReportMutation} from "../../services/inspectorapi"
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImportantDocuments = ({inspData}) => {
const navigate = useNavigate()
 console.log(inspData)
const token = Cookies.get("token");
let jwtDecodes;
if (token) {
  jwtDecodes = jwtDecode(token);
}
const {beadingCarId} = useParams()

const UserId = token ? jwtDecodes?.userId : null;

const [formData, setFormData] = useState({
  rcAvailability: "",
  mismatchInRC: "",
  rtoNocIssued: "",
  insuranceType: "",
  noClaimBonus: "",
  underHypothecation: "",
  roadTaxPaid: "",
  partipeshiRequest: "",
  duplicateKey: "",
  chassisNumberEmbossing: "",
  manufacturingDate: "",
  registrationDate: "",
  rto: "",
  fitnessUpto: "",
  cngLpgFitmentInRC: "",
  LoanStatus: "",
  NOCStatus:""
});

  useEffect(() => {
    if (inspData) {
      setFormData({
        rcAvailability: inspData.object.rcavailability,
        mismatchInRC: inspData.object.mismatchInRC,
        rtoNocIssued: inspData.object.rtonocissued,
        insuranceType: inspData.object.insuranceType,
        noClaimBonus: inspData.object.noClaimBonus,
        underHypothecation: inspData.object.underHypothecation,
        roadTaxPaid: inspData.object.roadTaxPaid,
        partipeshiRequest: inspData.object.partipeshiRequest,
        duplicateKey: inspData.object.duplicateKey,
        chassisNumberEmbossing: inspData.object.chassisNumberEmbossing,
        manufacturingDate: inspData.object.manufacturingDate ? inspData.object.manufacturingDate.split('T')[0] : '',
        registrationDate: inspData.object.registrationDate ? inspData.object.registrationDate.split('T')[0] : '',
        rto: inspData.object.rto,
        fitnessUpto: inspData.object.fitnessUpto ? inspData.object.fitnessUpto.split('T')[0] : '',
        cngLpgFitmentInRC: inspData.object.cnglpgfitmentInRC,
        LoanStatus: inspData.object.loanStatus,
        NOCStatus: inspData.object.NOCStatus
      });
    }
  }, [inspData]);
  const [finalInspectionReport] = useFinalInspectionReportMutation()
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevState) => ({
      ...prevState,
      [name]: ''
    }));
  };

  function handleSubmit (e) {
  e.preventDefault()
  if (validateForm()) {
    // Handle form submission
    // console.log('Form submitted successfully:', formData);
  }
     const inspectionData = {
       userId: Number(UserId),
       beadingCarId: Number(beadingCarId),
      rcavailability:formData.rcAvailability ,
      mismatchInRC: formData.mismatchInRC,
      rtonocissued: formData.rtoNocIssued,
      insuranceType: formData.insuranceType,
      noClaimBonus: formData.noClaimBonus,
      underHypothecation:formData.underHypothecation ,
      loanStatus: formData.LoanStatus,
      roadTaxPaid: formData.roadTaxPaid,
      partipeshiRequest:formData.partipeshiRequest,
      duplicateKey: formData.duplicateKey,
      chassisNumberEmbossing: formData.chassisNumberEmbossing,
      manufacturingDate:formData.manufacturingDate,
      registrationDate: formData.registrationDate,
      rto: formData.rto,
      fitnessUpto:formData.fitnessUpto,
      cnglpgfitmentInRC:formData.cngLpgFitmentInRC ,
      NOCStatus:formData.NOCStatus 
     }
  try {
    const res = finalInspectionReport({inspectionData})
    res;
    // console.log(res)
    
      toast.success("Data Uploaded");
      setTimeout(() => {
        navigate(-1)
      },1000)
     
  } catch (error) {
    // console.log(error)
  }
  }
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let valid = true;
    let errors = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        valid = false;
        errors[key] = 'This field is required';
      }
    }

    setErrors(errors);
    return valid;
  };
  return (
    <div className='p-4'>
      <Typography variant="h4" className='text-black font-bold pb-5'>
        Important Documents
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* RC Availability */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.rcAvailability}>
            <InputLabel>RC Availability</InputLabel>
            <Select
              name="rcAvailability"
              value={formData.rcAvailability}
              onChange={handleChange}
              color="Green"
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {errors.rcAvailability && <FormHelperText>{errors.rcAvailability}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.mismatchInRC}>
            <InputLabel>Mismatch in RC</InputLabel>
            <Select
              name="mismatchInRC"
              value={formData.mismatchInRC}
              onChange={handleChange}
            >
              <MenuItem value="No mismatch">No mismatch</MenuItem>
              <MenuItem value="mismatch">mismatch</MenuItem>
            </Select>
            {errors.mismatchInRC && <FormHelperText>{errors.mismatchInRC}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.rtoNocIssued}>
            <InputLabel>RTO NOC Issued</InputLabel>
            <Select
              name="rtoNocIssued"
              value={formData.rtoNocIssued}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {errors.rtoNocIssued && <FormHelperText>{errors.rtoNocIssued}</FormHelperText>}
          </FormControl>
        </Grid>
  {/* NOC Issued */}
        {/* <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.NOCStatus}>
            <InputLabel> NOC Issued</InputLabel>
            <Select
              name="NOCStatus"
              value={formData.NOCStatus}
              onChange={handleChange}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="NA">N/A</MenuItem>
            </Select>
            {errors.NOCStatus && <FormHelperText>{errors.NOCStatus}</FormHelperText>}
          </FormControl>
        </Grid> */}

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.insuranceType}>
            <InputLabel>Insurance Type</InputLabel>
            <Select
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleChange}
            >
              <MenuItem value="Zero Depreciation">Zero Depreciation</MenuItem>
              <MenuItem value="Comprehensive">Comprehensive</MenuItem>
              <MenuItem value="3rd Party">3rd Party</MenuItem>
              <MenuItem value="Insurance Expired">Insurance Expired</MenuItem>
            </Select>
            {errors.insuranceType && <FormHelperText>{errors.insuranceType}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.noClaimBonus}>
            <InputLabel>No Claim Bonus</InputLabel>
            <Select
              name="noClaimBonus"
              value={formData.noClaimBonus}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {errors.noClaimBonus && <FormHelperText>{errors.noClaimBonus}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.LoanStatus}>
            <InputLabel>Loan Status</InputLabel>
            <Select
              name="LoanStatus"
              value={formData.LoanStatus}
              onChange={handleChange}
            >
              <MenuItem value="Paid/Closed">Paid/Closed</MenuItem>
              <MenuItem value="Unpaid/Pending">Unpaid/Pending</MenuItem>
            </Select>
            {errors.LoanStatus && <FormHelperText>{errors.LoanStatus}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.underHypothecation}>
            <InputLabel>Under Hypothecation</InputLabel>
            <Select
              name="underHypothecation"
              value={formData.underHypothecation}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {errors.underHypothecation && <FormHelperText>{errors.underHypothecation}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.roadTaxPaid}>
            <InputLabel>Road Tax Paid</InputLabel>
            <Select
              name="roadTaxPaid"
              value={formData.roadTaxPaid}
              onChange={handleChange}
            >
              <MenuItem value="OTT">OTT</MenuItem>
              <MenuItem value="LTT">LTT</MenuItem>
            </Select>
            {errors.roadTaxPaid && <FormHelperText>{errors.roadTaxPaid}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.partipeshiRequest}>
            <InputLabel>Partipeshi Request</InputLabel>
            <Select
              name="partipeshiRequest"
              value={formData.partipeshiRequest}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {errors.partipeshiRequest && <FormHelperText>{errors.partipeshiRequest}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Duplicate Key */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.duplicateKey}>
            <InputLabel>Duplicate Key</InputLabel>
            <Select
              name="duplicateKey"
              value={formData.duplicateKey}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {errors.duplicateKey && <FormHelperText>{errors.duplicateKey}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Chassis Number Embossing */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.chassisNumberEmbossing}>
            <InputLabel>Chassis Number Embossing</InputLabel>
            <Select
              name="chassisNumberEmbossing"
              value={formData.chassisNumberEmbossing}
              onChange={handleChange}
            >
              <MenuItem value="Ok">Ok</MenuItem>
              <MenuItem value="Floor Laminated">Floor Laminated</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repunched">Repunched</MenuItem>
              <MenuItem value="Not Traceable">Not Traceable</MenuItem>
            </Select>
            {errors.chassisNumberEmbossing && <FormHelperText>{errors.chassisNumberEmbossing}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Manufacturing Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Manufacturing Date"
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.manufacturingDate}
            helperText={errors.manufacturingDate}
          />
        </Grid>

        {/* Registration Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Registration Date"
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.registrationDate}
            helperText={errors.registrationDate}
          />
        </Grid>

        {/* RTO */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="RTO"
            name="rto"
            value={formData.rto}
            onChange={handleChange}
            error={!!errors.rto}
            helperText={errors.rto}
          />
        </Grid>

        {/* Fitness Upto */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Fitness Upto"
            type="date"
            name="fitnessUpto"
            value={formData.fitnessUpto}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.fitnessUpto}
            helperText={errors.fitnessUpto}
          />
        </Grid>

        {/* CNG/LPG Fitment in RC */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.cngLpgFitmentInRC}>
            <InputLabel>CNG/LPG Fitment in RC</InputLabel>
            <Select
              name="cngLpgFitmentInRC"
              value={formData.cngLpgFitmentInRC}
              onChange={handleChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="No mismatch">No mismatch</MenuItem>
              <MenuItem value="mismatch">mismatch</MenuItem>
            </Select>
            {errors.cngLpgFitmentInRC && <FormHelperText>{errors.cngLpgFitmentInRC}</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
      <div className="flex justify-between mt-10 px-8">
       
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="rounded-lg bg-blue-500 text-white flex justify-center items-center"
        >
          Submit
        </Button>
      </div>
    </form>
    </div>
  );
};

export default ImportantDocuments;
