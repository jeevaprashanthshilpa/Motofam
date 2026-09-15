import apiClient from "./apiClient";

export const bikeService = {
  // Fetch all bike listings with optional query parameters (brand, price, verified status, etc.)
  getBikes: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.brand) params.append("brand", filters.brand);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.minYear) params.append("minYear", filters.minYear);
      if (filters.verifiedOnly) params.append("verified", "true");
      if (filters.search) params.append("search", filters.search);

      const response = await apiClient.get(`/bikes?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch bike listings");
    }
  },

  // Fetch a single bike listing by its ID
  getBikeById: async (id) => {
    try {
      const response = await apiClient.get(`/bikes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch bike details");
    }
  },

  // Create a new bike listing (multipart/form-data for image and doc uploads)
  createBike: async (bikeFormData) => {
    try {
      const response = await apiClient.post("/bikes", bikeFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to submit bike listing");
    }
  },

  // Update an existing bike listing
  updateBike: async (id, updatedData) => {
    try {
      const response = await apiClient.put(`/bikes/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update bike listing");
    }
  },

  // Delete a bike listing
  deleteBike: async (id) => {
    try {
      const response = await apiClient.delete(`/bikes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete bike listing");
    }
  },
};