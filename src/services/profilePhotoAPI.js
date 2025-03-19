import { apiSlice } from "./apiSlice";

export const profilePhotoAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProfileImages: builder.mutation({
      query: ({ formData, userId }) => ({
        url: `/ProfilePhoto/add?userId=${userId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Dealer", "Admin", "Inspector", "SALESPERSON", "User"],
    }),

    getProfileImageById: builder.query({
      query: ({ userId }) => ({
        url: `/ProfilePhoto/getbyuserid?userId=${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, { userId }) => [
        { type: "User", id: userId },
      ], // Add providesTags to cache results by userId
    }),

    deleteProfileImageById: builder.mutation({
      query: ({ userId }) => ({
        url: `/ProfilePhoto/deletebyuserid?userId=${userId}`,
        method: `DELETE`,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }], // Corrected invalidatesTags for consistency
    }),
  }),
});

export const {
  useAddProfileImagesMutation,
  useGetProfileImageByIdQuery,
  useDeleteProfileImageByIdMutation,
} = profilePhotoAPI;
