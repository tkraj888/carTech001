import { apiSlice } from "./apiSlice";

export const salesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeller: builder.query({
      query: ({pageNo,pageSize}) => ({
        url: `/salesPerson/GetAllInspProfiles?pageNo=${pageNo}&pageSize=${pageSize}`,
        
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "SALESPERSON", pageNo: result.pageNo }] : [],
    }),
    deleteSeller: builder.mutation({
      query: (id) => ({
        url: `/salesPerson/deletById/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SALESPERSON"],
    }),
    sellerById: builder.query({
      query: ({userId}) => ({
        url: `/salesPerson/getByUserId?userId=${userId}`,
        // transerResponse: console.log(userId),
        method:"GET"
      }),
      providesTags: ["SALESPERSON" ,"User"],
    }),


    sellerupdate: builder.mutation({
      query: ({id, salesdata}) => ({
        url: `/salesPerson/updateSPersonDetails?salesPersonId=${id}`,
        method: "PATCH",
        // transerResponse: console.log("API response",salesdata,id),
        body: salesdata,
      }),
      invalidatesTags: ["SALESPERSON"],
    }),

    sellerChangePassword : builder.mutation({
      query : ({passChange,salesPersonId}) => ({
        url : `/salesPerson/passwordChange/${salesPersonId}`,
        method: "PUT",
        body : passChange,
        // transerResponse:console.log(salesPersonId,passChange),
       
      })
      
    }),

  }),
});

export const {
  useGetAllSellerQuery,
  useDeleteSellerMutation,
  useSellerByIdQuery,
  useSellerupdateMutation,
  useSellerChangePasswordMutation
} = salesAPI;
