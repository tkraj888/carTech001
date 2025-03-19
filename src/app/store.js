// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import { apiSlice } from "../services/apiSlice";
import { authApi } from "../services/authAPI";
import { carApi } from "../services/carAPI";
import { dealerAPI } from "../services/dealerAPI";
import { biddingAPI } from "../services/biddingAPI";
import { StartbiddingAPI } from "../services/StartbiddingAPI";
import { placebidAPI } from "../services/placingbidApi";
import { inspectorAPI } from "../services/inspectorapi";
import { brandAPI } from "../services/brandAPI";
import { salesAPI } from "../services/salesAPI";
import { UserAPI } from "../services/userAPI";
import favoritesSlice from "../pages/favoritesSlice";
import { profilePhotoAPI } from "../services/profilePhotoAPI";

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [dealerAPI.reducerPath]: dealerAPI.reducer,
    [biddingAPI.reducerPath]: biddingAPI.reducer,
    [StartbiddingAPI.reducerPath]: StartbiddingAPI.reducer,
    [placebidAPI.reducerPath]: placebidAPI.reducer,
    [inspectorAPI.reducerPath]: inspectorAPI.reducer,
    [brandAPI.reducerPath]: brandAPI.reducer,
    [salesAPI.reducerPath]: salesAPI.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
    [profilePhotoAPI.reducerPath]: profilePhotoAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
