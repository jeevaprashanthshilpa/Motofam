import apiClient from "./apiClient";

export const authService = {
  // Login user with email, password, and role
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("motofam-token", response.data.token);
        localStorage.setItem("motofam-user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid login credentials. Please try again.");
    }
  },

  // Register new buyer or seller account
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      if (response.data.token) {
        localStorage.setItem("motofam-token", response.data.token);
        localStorage.setItem("motofam-user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed. Please try with valid details.");
    }
  },

  // Logout current user and clear local session storage
  logout: () => {
    localStorage.removeItem("motofam-token");
    localStorage.removeItem("motofam-user");
  },

  // Get current stored user profile from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("motofam-user");
    return user ? JSON.parse(user) : null;
  },
};