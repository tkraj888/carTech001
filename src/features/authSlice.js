// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialUser = localStorage.getItem("userInfo");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    token: null, // Retrieve token from cookies
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    setToken: (state, action) => {
     
      state.token = action.payload;
      Cookies.set("token", action.payload); // Save token to cookies
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo"); // Remove user info from local storage
      Cookies.remove("token"); // Remove token from cookies
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } =
  authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
