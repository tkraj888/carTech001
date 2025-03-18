/* eslint-disable no-unused-vars */

import { apiSlice } from "./apiSlice";

export const carApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filterCar: builder.query({
      query: (urlState) => {
        // Destructure and provide default values
        const {
          MinPrice = "",
          MaxPrice = "",
          Area = "",
          Year = "",
          Brand = "",
          Model = "",
          Transmission = "",
          FuleType = "",
        } = urlState || {};

        return {
          url: `/cars/mainFilter?minPrice=${MinPrice}&maxPrice=${MaxPrice}&area=${Area}&year=${Year}&brand=${Brand}&model=${Model}&transmission=${Transmission}&fuelType=${FuleType}`,
          method: "GET",
        };
      },
      providesTags: ["CAR", "Dealer"],
    }),
    filterCarPremium: builder.query({
      query: (urlState) => {
        // Destructure and provide default values
        const {
          MinPrice = "",
          MaxPrice = "",
          Area = "",
          Year = "",
          Brand = "",
          Model = "",
          Transmission = "",
          FuleType = "",
        } = urlState || {};

        return {
          url: `/cars/mainFilter?minPrice=${MinPrice}&maxPrice=${MaxPrice}&area=${Area}&year=${Year}&brand=${Brand}&model=${Model}&transmission=${Transmission}&fuelType=${FuleType}&carType=premium`,
          method: "GET",
        };
      },
      providesTags: ["CAR", "Dealer"],
    }),
    getCarById: builder.query({
      query: (carId) => ({
        url: `/cars/getCar?carId=${carId}`,

        method: "GET",
      }),
      providesTags: ["CAR", "Dealer"],
    }),

    dealerIdByCar: builder.query({
      query: ({ id, pageNo, status }) => ({
        url: `/car/dealer?dealerId=${id}&carStatus=${status}&pageNo=${pageNo}`,
        method: "GET",
      }),
      providesTags: ["CAR", "Dealer "],
    }),
    dealerIdByPremiumCar: builder.query({
      query: ({ id, pageNo, status, carType }) => ({
        url: `/car/dealer?dealerId=${id}&carStatus=${status}&pageNo=${pageNo}&carType=premium`,
        method: "GET",
      }),
      providesTags: ["CAR", "Dealer "],
    }),
    getAllCar: builder.query({
      query: () => ({
        url: `/cars/mainFilter/${0}`,
        method: "GET",
      }),
      providesTags: ["CAR", "Inspector"],
    }),
    bookingRequest: builder.mutation({
      query: (formData) => ({
        url: `/booking/request`,

        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CAR"],
    }),
    carRegister: builder.mutation({
      query: (data) => ({
        url: `/car/carregister`,

        body: data,
        method: "POST",
      }),
      invalidatesTags: ["CAR"],
    }),
    carRegisterPremium: builder.mutation({
      query: (data, carType) => ({
        url: `/car/carregister?carType=premium`,

        body: data,
        method: "POST",
      }),
      invalidatesTags: ["CAR"],
    }),
    carUpdate: builder.mutation({
      query: ({ data, carId }) => ({
        url: `/car/edit/${carId}`,

        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CAR"],
    }),
    carRemove: builder.mutation({
      query: ({ id, carId }) => ({
        url: `/car/removeCar?carId=${carId}&dealerId=${id}`,

        method: "DELETE",
      }),
      invalidatesTags: ["CAR"],
    }),
    userAllCarRequest: builder.query({
      query: ({ pageNo, userid }) => ({
        url: `/booking/getByUserId?pageNo=${pageNo}&userId=${userid}`,
      }),
      providesTags: ["CAR"],
    }),
    getAllUserConfirm: builder.query({
      query: () => ({
        url: `/confirmBooking/getAllBookingsByUserId?userId=1012`,
      }),
      providesTags: ["CAR"],
    }),

    ConfirmBooking: builder.mutation({
      query: (formdata) => ({
        url: `/confirmBooking/book`,

        method: "POST",
        body: formdata,
      }),
      providesTags: ["CAR"],
    }),

    getPendingrequest: builder.query({
      query: ({ CarId, currentpage }) => ({
        url: `/booking/getPendingBookingDetailsByCarID?pageNo=${currentpage}&CarId=${CarId}`,
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    getCarImageById: builder.query({
      query: ({ carId }) => ({
        url: `/uploadFile/getByCarID?carId=${carId} `,

        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    deleteCarImageById: builder.mutation({
      query: ({ id }) => ({
        url: `uploadFile/deleteDocumentId?DocumentId=${id}`,

        method: `DELETE`,
      }),
      invalidatesTags: ["CAR"],
    }),

    // getCarImageById : builder.query({
    //   query : ({carId}) => ({
    //     url : `/photo/get/${carId}`,
    //     method : 'GET',
    //     transferResponse: console.log(carId),
    //     responseHandler: (response) => {
    //       // Check response headers (e.g., Content-Type) to determine format
    //       if (response.headers.get('Content-Type').startsWith('image/')) {
    //         return response.blob(); // Assuming response is an image blob
    //       } else {
    //         // Handle unexpected formats (throw error or return default value)
    //         throw new Error('Unexpected response format');
    //       }
    //     }
    //   }),
    //   providesTags : ["CAR"],
    // })

    favoriteCar: builder.mutation({
      query: (data2) => ({
        url: `/saveCar/add`,

        method: "POST",
        body: data2,
      }),
      invalidatesTags: ["CAR"],
    }),

    getbySaveCarId: builder.query({
      query: (saveCarIds) => ({
        url: `/saveCar/getBySaveCar?saveCarId=${saveCarIds}`,

        method: "GET",
      }),
      providesTags: ["CAR"],
    }),

    getbyUserCarId: builder.query({
      query: ({ UserId }) => ({
        url: `/saveCar/GetByUser?userId=${UserId}`,

        method: "GET",
      }),
      providesTags: ["CAR", "User"],
    }),

    CarremoveFavorite: builder.mutation({
      query: ({ saveCarId }) => ({
        url: `/saveCar/delete?saveCarId=${saveCarId}`,

        method: "DELETE",
      }),
      providesTags: ["User"],
    }),

    CarFavoriteAddRemove: builder.query({
      query: ({ carid, useid }) => ({
        url: `/saveCar/getByCarAndUserId?userId=${useid}&carId=${carid}`,

        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    CarCountByStatus: builder.query({
      query: ({ status, id }) => ({
        url: `/car/count?carStatus=${status}&dealerId=${id}`,

        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    CarCountByCartype: builder.query({
      query: ({ status, id, carType }) => ({
        url: `/car/count?carStatus=${status}&dealerId=${id}&carType=premium`,

        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    CarsByCartype: builder.query({
      query: ({ pageNo, pageSize, carType }) => ({
        url: `./car/getAllCarsWithCarType?pageNo=${pageNo}&pageSize=${pageSize}&carType=premium`,

        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useFilterCarQuery,
  useFilterCarPremiumQuery,
  useGetCarByIdQuery,
  useGetAllCarQuery,
  useDealerIdByCarQuery,
  useDealerIdByPremiumCarQuery,
  useBookingRequestMutation,
  useCarRegisterMutation,
  useCarRegisterPremiumMutation,
  useCarUpdateMutation,
  useCarRemoveMutation,
  useUserAllCarRequestQuery,
  useGetAllUserConfirmQuery,
  useGetPendingrequestQuery,
  useGetCarImageByIdQuery,
  useConfirmBookingMutation,
  useDeleteCarImageByIdMutation,
  useFavoriteCarMutation,
  useGetbySaveCarIdQuery,
  useGetbyUserCarIdQuery,
  useCarremoveFavoriteMutation,
  useCarFavoriteAddRemoveQuery,
  useCarCountByStatusQuery,
  useCarCountByCartypeQuery,
  useCarsByCartypeQuery,
} = carApi;
