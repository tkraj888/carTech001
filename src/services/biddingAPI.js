
import { apiSlice } from "./apiSlice";


export const biddingAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    biddingAllCard: builder.query({
      query: () => ({
        url: `/BeadingCarController/all`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    AllDealerFinalBid: builder.query({
      query: ({ UserID, pageNo, pageSize }) => ({
        url: `/Bid/getAllDealerFinalBids?buyerDealerId=${UserID}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    biddingCarByDealerId: builder.query({
      query: (UserID) => ({
        url: `/BeadingCarController/getByUserId1/${UserID}`,

        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    biddingCarById: builder.query({
      query: (carId) => ({
        url: `/BeadingCarController/getbyId/${carId}`,

        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),
    biddingcarUpdate: builder.mutation({
      query: ({ data, beadingCarId }) => ({
        url: `/BeadingCarController/edit/${beadingCarId}`,
        // transferResponse: console.log(data, beadingCarId),
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["BIDDING"],
    }),
    biddingRemove: builder.mutation({
      query: (carId) => ({
        url: `/BeadingCarController/delete/${carId}`,
        // transferResponse: console.log(carId),
        method: "DELETE",
      }),
      invalidatesTags: ["BIDDING"],
    }),

    biddingCarRegister: builder.mutation({
      query: (formdata) => ({
        url: `/BeadingCarController/carregister`,
        // transferResponse: console.log(formdata),
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["BIDDING"],
    }),

    startBiddingSetTime: builder.mutation({
      query: (settime) => ({
        url: `/Bidding/v1/SetTime`,
        // transferResponse: console.log("Data to backend :- ",settime),
        method: "POST",
        body: settime,
      }),
      invalidatesTags: ["BIDDING"],
    }),

    createBidding: builder.mutation({
      query: (bidding) => ({
        url: `/Bidding/v1/CreateBidding`,
        // transferResponse: console.log("Data to backend :- ",bidding),
        method: "POST",
        body: bidding,
      }),
      invalidatesTags: ["BIDDING"],
    }),

    bidCarbyId: builder.query({
      query: () => ({
        url: `/Bidding/v1/getById?bidCarId=3&beadingCarId=22`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    getByDealerId: builder.query({
      query: (dealerId) => ({
        url: `BeadingCarController/getByDealerID/${dealerId}`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    getbeadingCarImage: builder.query({
      query: ({ beadingCarId }) => ({
        url: `/uploadFileBidCar/getByBidCarID?beadingCarId=${beadingCarId}`,
        method: "GET",
      }),
      providesTags: ["BIDDING", "SALESPERSON"],
    }),

    getbeadingCarById: builder.query({
      query: (id) => ({
        url: `/BeadingCarController/getbyId/${id}`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    getbeadingGetById: builder.query({
      query: (beadingCarId) => ({
        url: `/BeadingCarController/getbyId/${beadingCarId}`,

        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    updateBidCar: builder.mutation({
      query: ({ beadingCarId, formDataTosend }) => ({
        url: `/uploadFileBidCar/update?doc=abcd&doctype=cover&subtype=images&comment=xyz&bidDocumentId=${beadingCarId}`,
        // transerResponse:console.log("APi response",beadingCarId,formDataTosend),
        method: "PATCH",
        body: formDataTosend,
      }),
      invalidatesTags: ["BIDDING"],
    }),

    getBidCarId: builder.query({
      query: (beadingCarId) => ({
        url: `/uploadFileBidCar/getByBidCarID?beadingCarId=${beadingCarId}`,
        // transferResponse: console.log(beadingCarId),
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    getAllLiveBiddingCars: builder.query({
      query: (beadingCarId) => ({
        url: `BeadingCarController/getAllLiveBiddingCars`,
        transferResponse: console.log(beadingCarId),
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    getCarIdType: builder.query({
      query: (beadingCarId) => ({
        url: `uploadFileBidCar/getDocuments?beadingCarId=${beadingCarId}&DocumentType=coverImage`,
        // transferResponse: console.log(beadingCarId),
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    getbeadingImgGetById: builder.query({
      query: (beadingCarId) => ({
        url: `/uploadFileBidCar/getByBidCarID?beadingCarId=${beadingCarId}`,
        // transferResponse: console.log(beadingCarId),
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),

    biddingCarImageRemove: builder.mutation({
      query: ({ beadingCarId }) => ({
        url: `/uploadFileBidCar/delete?DocumentId=${beadingCarId}`,
        // transferResponse: console.log(beadingCarId),
        method: "DELETE",
      }),
      invalidatesTags: ["BIDDING"],
    }),
    UpdateBiddingTime: builder.mutation({
      query: (settime) => ({
        url: `/Bidding/v1/UpdateBiddingTime`,
        // transferResponse: console.log("Data to backend :- ",settime),
        method: "POST",
        body: settime,
      }),
      invalidatesTags: ["BIDDING"],
    }),
    biddingTimerId: builder.query({
      query: (carId) => ({
        url: `Bid/getTimer?biddingTimerId=${carId}`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),
    getByBidCarId: builder.query({
      query: (carId) => ({
        url: `Bidding/v1/getByBidCarId?beadingCarId=${carId}`,
        method: "GET",
      }),
      providesTags: ["BIDDING"],
    }),
  }),
});

export const {useBiddingAllCardQuery,
  useAllDealerFinalBidQuery,
  useBiddingCarByIdQuery, 
  useLazyBiddingCarByIdQuery,
  useBiddingcarUpdateMutation, 
  useBiddingRemoveMutation ,
  useBiddingCarRegisterMutation , 
  useStartBiddingSetTimeMutation ,
  useCreateBiddingMutation, 
  useBidCarbyIdQuery, 
  useBiddingCarByDealerIdQuery,
  useGetByDealerIdQuery,
  useGetbeadingCarImageQuery,
  useGetbeadingCarByIdQuery,
  useGetbeadingGetByIdQuery,
  useGetbeadingImgGetByIdQuery,
  useGetAllLiveBiddingCarsQuery,
  useUpdateBidCarMutation,
  useGetCarIdTypeQuery,
  useGetBidCarIdQuery,
  useBiddingCarImageRemoveMutation,
  useUpdateBiddingTimeMutation,
  useBiddingTimerIdQuery,
  useGetByBidCarIdQuery
} = biddingAPI;
