import { apiSlice } from "./apiSlice";

export const colorAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllColor : builder.query({
      query: () => ({
        url: `colors/getAll`,
        
        method: "GET",
      }),
      providesTags: ["Dealer", "User"],
    }),
}),


});

export const {
 useGetAllColorQuery
} = colorAPI;