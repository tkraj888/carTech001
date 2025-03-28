import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/jwt/login",
        method: "POST",
       
        body: formData,
      }),
      invalidatesTags: ["User", "Dealer"],
    }),
    SignUp:builder.mutation({
      query:(formData)=>({
        url:"/account/register",
        method:"POST",
        
        body:formData
      }),
      invalidatesTags: ["User", "Dealer"],
    }),
    forgetPasswordEmail: builder.mutation({
      query: (formData) => ({
        url: "/cars/forgot-password?email",
        method: "POST",
       
        body: formData,
      }),
      invalidatesTags: ["User", "Dealer"],
    }),

    resetPassword: builder.mutation({
      query: ({emailData}) => ({
        url: "/cars/update-password",
        method: "POST",
       
        body: emailData,
      }),
      invalidatesTags: ["User", "Dealer"],
    }),
  }),
});

export const { useSignInMutation,useSignUpMutation,useForgetPasswordEmailMutation,useResetPasswordMutation } = authApi;
