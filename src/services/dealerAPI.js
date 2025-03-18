import { apiSlice } from "./apiSlice";

export const dealerAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDealer: builder.query({
      query: (pageNo) => ({
        url: `/dealer/allDealers/${pageNo}`,
        
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "Dealer", pageNo: result.pageNo }] : [],
    }),

    getDealerbySales: builder.query({
      query: (userid) => ({
        url: `/dealer/getAllDealersBySalesPersonID?salesPersonID=${userid}`,
        // transferResponce: console.log(userid),
        method: "GET",
      }),
        providesTags: ["Dealer", "user"],

    }),
    deleteDealer: builder.mutation({
      query: (id) => ({
        url: `/dealer/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dealer"],
    }),

    getDealer: builder.query({
      query: ({ id }) => ({
        url: `/dealer/${id}`,
        
      }),
      providesTags: ["Dealer", "user"],
    }),

    getEditDealer: builder.mutation({
      query: (userid) => ({
        url: `/dealer/updateDealer/${userid.id}`,
        method: "PUT",
        // transerResponse: console.log(userid.id),
        body: userid.inputField,
      }),
      invalidatesTags: ["Dealer"],
    }),

    getAllDealerCompleteBooking: builder.query({
      query: ({ pageNo, id }) => ({
        url: `/confirmBooking/getAllBookingsByDealerId?pageNo=${pageNo}&dealerId=${id}`,
        
      }),
      providesTags: ["DEALERBOOKING"],
    }),

    getAllDealerPendingBooking: builder.query({
      query: ({ id, pageNo }) => ({
        url: `/booking/getPendingBookingDetailsByDealerID?pageNo=${pageNo}&dealerId=${id}`,
        // transerResponse: console.log(pageNo, id),
      }),
      providesTags: ["DEALERBOOKING"],
    }),

    addCarImages: builder.mutation({
      query: ({ formData, document, firstCarId, UserID }) => ({
        url: `/uploadFile/add?documentType=${document}&userId=${UserID}&carId=${firstCarId}`,
        // transerResponse: console.log(
        //   "APi response",
        //   formData,
        //   firstCarId,
        //   document,
        //   UserID
        // ),
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Dealer"],
    }),

    dealerStatus: builder.mutation({
      query: ({ dealer_id, status }) => ({
        url: `/dealer/statusUpdate?dealerId=${dealer_id}&status=${status}`,
        // transerResponse: console.log("APi response", dealer_id, status),
        method: "PATCH",
      }),
      invalidatesTags: ["Dealer"],
    }),

    getAllDealerList: builder.query({
      query: () => ({
        url: `dealer/allDealer`,
        method: "GET",
      }),
      providesTags: ["Dealer"],
    }),
    cancelStatusSet: builder.mutation({
      query: (id, data) => ({
        url: `/confirmBooking/cancelStatusSet?id=${id}`,
        method: "PUT",
        // transerResponse: console.log(id),
        body: data,
      }),
      invalidatesTags: ["Dealer"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/getUser/${id}`,
        method: "GET",
      }),
      providesTags: ["Dealer", "User"],
    }),

    chnagePassword: builder.mutation({
      query: ({ passChange, dealerId }) => ({
        url: `/dealer/changePassword/${dealerId}`,
        method: "PUT",
        body: passChange,
      }),
    }),

    getDealerByUserId: builder.query({
      query: (id) => ({
        url: `/dealer/win/${id}`,
        method: "GET",
      }),
      providesTags: ["Dealer", "User"],
    }),

    getDealerProfile: builder.query({
      query: ({ userId }) => ({
        url: `/ProfilePhoto/getbyuserid?${userId}`,
        
      }),
      providesTags: ["Dealer", "user"],
    }),
  }),


});

export const {
  useGetAllDealerQuery,
  useGetDealerbySalesQuery,
  useDeleteDealerMutation,
  useGetDealerQuery,
  useLazyGetDealerQuery,
  useGetEditDealerMutation,
  useGetAllDealerCompleteBookingQuery,
  useGetAllDealerPendingBookingQuery,
  useAddCarImagesMutation,
  useDealerStatusMutation,
  useGetAllDealerListQuery,
  useCancelStatusSetMutation,
  useGetUserQuery,
  useChnagePasswordMutation,
  useLazyGetDealerByUserIdQuery,
  useGetDealerProfileQuery
} = dealerAPI;
