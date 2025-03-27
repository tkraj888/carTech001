import { apiSlice } from "./apiSlice";


export const UserAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    GetUserById: builder.query({
      query: (userProfileId) => ({
        url: `/user/getUser/${userProfileId}`,
        // transferResponse: console.log(userProfileId),
        method: "GET",
      }),
      providesTags:["User"]
    }),

    Userupdate: builder.mutation({
      query: ({userProfileId ,userupdate})  => ({
        url: `user/edit/${userProfileId}`,
       
        method: 'PUT',
        body:userupdate
      }),
      invalidatesTags:["User"],
    }),

    UserSellForm : builder.mutation ({
      query : ({formData}) => ({
        url : `/userFormController/add`,
       
        method : "POST",
        body :formData
      }),
      providesTags:["User"]
    }),

   

    UserSellFormUpdate: builder.mutation({
      query: ({userFormId ,userformupdate})  => ({
        url: ` /userFormController/update/${userFormId}`,
        method: 'PUT',
        body:userformupdate
      }),
      invalidatesTags:["User"],
    }),

    GetUserRequestData: builder.query({
      query: ({page ,size}) => ({
        url: `/userFormController/all?page=${page}&size=${size}`,
        // transferResponse: console.log(userProfileId),
        method: "GET",
      }),
      providesTags:["User"]
  
       // You probably want providesTags here instead of invalidatesTags for queries
    }),

    GetUserRequestDataById: builder.query({
      query: (userFormId) => ({
        url: `?userFormId=${userFormId}`,
        // transferResponse: console.log(userProfileId),
        method: "GET",
      }),
      providesTags:["User"]
  
       // You probably want providesTags here instead of invalidatesTags for queries
    }),
    
    UserSaleReqFormEdit: builder.mutation({
      query: ({updatedData,userFormId}) => ({
        url: `/userFormController/update?userFormId=${userFormId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),
    UserSaleReqFormUpdate: builder.mutation({
      query: ({updatedData,userFormId}) => ({
        url: `/userFormController/updateStatus?userFormId=${userFormId}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword : builder.mutation({
      query : ({passChange,userProfileId}) => ({
        url : `/user/changePassword/${userProfileId}`,
        method: "PUT",
        body : passChange,
       }),
       invalidatesTags:["User"],
    }),
    listCarSell: builder.query({
      query: (userId) => ({
        url: `/userFormController/user?userId=${userId}`,
        // transferResponse: console.log(userProfileId),
        method: "GET",
      }),
      providesTags:["User"]
    }),
    listCarStatus: builder.query({
      query: (status) => ({
        url: `/userFormController/status?status=${status}`,
        method: "GET",
      }),
      providesTags:["User"]
    }),
    listbySalePersonId: builder.query({
      query: ({salesPersonId ,page , size}) => ({
        url: `/userFormController/salesPerson?salesPersonId=${salesPersonId}&page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags:["User"]
    }),
    listbyInspectorId: builder.query({
      query: ({inspectorId ,page , size}) => ({
        url: `/userFormController/inspector?inspectorId=${inspectorId}&page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags:["User"]
    }),
  })
});

export const { useGetUserByIdQuery ,
useUserupdateMutation,
useUserSellFormMutation,
useUserSellFormUpdate,
useGetUserRequestDataQuery,
useUserSaleReqFormEditMutation,
useUserSaleReqFormUpdateMutation,
useGetUserRequestDataByIdQuery,
useChangePasswordMutation,
useListCarSellQuery,
useListCarStatusQuery,
useListbySalePersonIdQuery,
useListbyInspectorIdQuery
 } = UserAPI;
