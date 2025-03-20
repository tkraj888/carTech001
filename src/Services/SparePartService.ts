import apiClient from "./apiService";
import { SparePartData } from "../types/SparePart";

export const SparePartGet = async () => {
    try {
      const response = await apiClient.get("/sparePartManagement/getAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching spare parts:", error);
      throw new Error("Failed to fetch spare parts");
    }
  };

  export const SparePartAdd = async (SPdata : SparePartData) => {
    try {
      const response = await apiClient.post("/sparePartManagement/getAll" , SPdata);
      return response.data;
    } catch (error) {
      console.error("Error fetching spare parts:", error);
      throw new Error("Failed to fetch spare parts");
    }
  };

  export const SparePartGetByID = async (SPID : string | number) => {
    try {
      const response = await apiClient.get(`/getPartById/${SPID}` );
      return response.data;
    } catch (error) {
      console.error("Error fetching spare parts:", error);
      throw new Error("Failed to fetch spare parts");
    }
  };
  