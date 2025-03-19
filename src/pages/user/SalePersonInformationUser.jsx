/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import { useSellerByIdQuery } from '../../services/salesAPI';


export default function SalePersonInformationUser({formData ,saler, Inspector}) {
  return (
    <div className="p-4 flex-col ">
    <Typography variant="h4" className="text-black font-bold pb-10">
      <span>Sale & Inspector Information</span>
    </Typography>
    <div className=" bg-white border-2 rounded-md shadow-md p-7 -mt-2">
      <Grid container spacing={3}>
        {/* RC Availability */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" >
            Sale Person Name:{" "}
            <span >
            {(saler?.response?.firstName || "-") + " " + (saler?.response?.lastName || "")}

            </span>
          </Typography>
        </Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
          Inspector Person Name:{" "}
            <span >
            {(Inspector?.response?.firstName || "-") + " " + (Inspector?.response?.lastName || "")}
            </span>
          </Typography>
        </Grid>

        {/* Partipeshi Request */}
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Partipeshi Request:{" "}
            <span className="font-semibold">
            </span>
          </Typography>
        </Grid> */}

        {/* Duplicate Key */}
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            Duplicate Key:{" "}
            <span className="font-semibold">
              {/* {inspData?.object.duplicateKey} */}
            {/* </span>
          </Typography>
        </Grid> */} 

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
  )
}
