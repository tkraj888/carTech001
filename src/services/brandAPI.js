/* eslint-disable no-unused-vars */
import { apiSlice } from "./apiSlice";

export const brandAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET
    getAllBrands: builder.query({
      query: ({ pageNo, pageSize }) => ({
        url: `./brands/getAll?pageNo=${pageNo}&pageSize=${pageSize}`,
       
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    //GET ONLY BRANDS
    getOnlyBrands: builder.query({
      query: () => ({
        url: `/brands/only-brands`,
        method: "GET",
      }),
      invalidatesTags: ["Admin"],
    }),

    //GET VARIANT means Model
    getVariants: builder.query({
      query: (brand) => ({
        url: `/brands/variants`,
        method: "GET",
        params: { brand },
      }),
      providesTags: ["Admin"],
    }),

    // GET SUB-VARIANT
    getSubVariants: builder.query({
      query: ({ brand, variant }) => ({
        url: `/brands/sub-variants`,
        method: "GET",
        params: { brand, variant },
      }),
      providesTags: ["Admin"],
    }),

    //POST
    addCarBrands: builder.mutation({
      query: (carBrand) => ({
        url: `/brands/add`,
        method: "POST",
        
        body: carBrand,
      }),
      invalidatesTags:["Admin"]
    }),

    //PATCH
    editBrandData: builder.mutation({
      query: ({ inputField, id }) => ({
        url: `/brands/edit?id=${id}`,
        method: "PATCH",
       
        body: inputField,
      }),
      providesTags: ["Admin"],
    }),

    //DELETE
    deleteCarBrands: builder.mutation({
      query: (brandDataId) => ({
        url: `/brands/delete?id=${brandDataId}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useAddCarBrandsMutation,
  useGetAllBrandsQuery,
  useEditBrandDataMutation,
  useDeleteCarBrandsMutation,
  useGetOnlyBrandsQuery,
  useGetVariantsQuery,
  useGetSubVariantsQuery
} = brandAPI;
