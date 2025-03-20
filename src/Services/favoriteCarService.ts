// src/services/favoriteCarService.ts
const BASE_URL = "http://carauto01-production-8b0b.up.railway.app";

/* -------------------- Favorite Cars APIs -------------------- */

// Fetch all favorite cars
export const fetchFavoriteCars = async () => {
  const response = await fetch(`${BASE_URL}/favorite-cars`);
  if (!response.ok) throw new Error("Failed to fetch favorite cars.");
  return response.json();
};

// Save or remove a car from favorites
export const saveFavoriteCar = async (userId: number, carId: number, isFavorited: boolean) => {
  const response = await fetch(`${BASE_URL}/favorite-cars/user?userId=${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carId, isFavorited }),
  });
  if (!response.ok) throw new Error("Failed to update favorite car status.");
  return response.json();
};

// Get a specific favorite car by its ID
export const getFavoriteCar = async (favoriteCarId: number) => {
  const response = await fetch(`${BASE_URL}/favorite-cars/get?favoriteCarId=${favoriteCarId}`);
  if (!response.ok) throw new Error("Failed to fetch favorite car.");
  return response.json();
};

// Find a specific user's favorite car
export const findFavoriteCar = async (userId: number, carId: number) => {
  const response = await fetch(`${BASE_URL}/favorite-cars/find?userId=${userId}&carId=${carId}`);
  if (!response.ok) throw new Error("Failed to find favorite car.");
  return response.json();
};

// Delete a favorite car
export const deleteFavoriteCar = async (favoriteCarId: number) => {
  const response = await fetch(`${BASE_URL}/favorite-cars/delete?favoriteCarId=${favoriteCarId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove favorite car.");
  return response.json();
};
