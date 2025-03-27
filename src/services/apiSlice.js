/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// import { useNavigate } from 'react-router-dom';

export const apiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cffffftasting-production.up.railway.app",
    prepareHeaders: (headers, { getState }) => {
      // console.log(headers, "prepareHeaders");
      // console.log(getState().auth.token);
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User", "Admin", "Dealer", "CAR", "DEALERBOOKING" ,"Inspector","SALESPERSON","Favorite"],
  endpoints: (builder) => ({}),
  // onError: async (error) => {
  //   if (error.status === 401) { // Unauthorized error
  //     // Redirect to sign-in page
  //     redirectToSignIn();
  //   }
  // }
});

// Define a custom function to handle redirection
// export const redirectToSignIn = (navigate) => {

//   navigate('/signin'); // Redirect to the sign-in page using the navigate function passed as a parameter
// };
