import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
// import {jwtDecode} from 'jwt-decode';

export const setFavoriteCars = (cars) => (
    {
    type: 'SET_FAVORITE_CARS',
    payload: cars,
});

// Async thunk to fetch favorite cars
// Inside fetchFavoriteCars thunk
// favoritesSlice.js
export const fetchFavoriteCars = createAsyncThunk(
  'favorites/fetchFavoriteCars',
  async (UserId) => {
    const token = Cookies.get("token");
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(`https://cffffftasting-production.up.railway.app/saveCar/GetByUser?userId=${UserId}`, {
      method: 'GET',
      headers: headers
    });

    const data = await response.json();
    return data?.list;
  }
);

  

  const initialState = {
    favoriteCars: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addFavoriteCar: (state, action) => {
      state.favoriteCars.push(action.payload);
    },
    removeFavoriteCar: (state, action) => {
      state.favoriteCars = state.favoriteCars.filter(car => car.carId !== action.payload.carId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoriteCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favoriteCars = action.payload
      })
      .addCase(fetchFavoriteCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



export const { addFavoriteCar, removeFavoriteCar } = favoritesSlice.actions;

export default favoritesSlice.reducer;
