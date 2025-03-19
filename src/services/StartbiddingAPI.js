

import { apiSlice } from "./apiSlice";

export const StartbiddingAPI = apiSlice.injectEndpoints({

    endpoints : (builder) => ({
        getallbiddingcars : builder.query({
            query : () => ({
                url : `BeadingCarController/all`,
                method : "GET",
            }),
            providesTags : ["BIDDING"]
        }),
        
        biddingcarregister : builder.mutation({
            query : (formData) => ({
               url : `BeadingCarController/carregister`,
               method : "POST",
               body : formData
            }),
            invalidatesTags : ["BIDDING"]
        })
    })
})

export const {useGetallbiddingcarsQuery, useBiddingcarregisterMutation} = StartbiddingAPI