import axios from "axios";

const API_BASE_URL = "/api/admin";

export const adminService = {
  // Fetch platform-wide metrics and stats for the admin dashboard
  getAdminStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch admin stats, using fallback mock data", error);
      return {
        totalListings: 124,
        pendingApprovals: 8,
        activeUsers: 450,
        expiringSoon: 12,
      };
    }
  },

  // Fetch all pending listings awaiting administrative moderation
  getPendingListings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/listings/pending`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch pending listings", error);
      return [];
    }
  },

  // Approve a pending bike listing
  approveListing: async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/listings/${id}/approve`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to approve listing");
    }
  },

  // Reject a pending bike listing
  rejectListing: async (id, reason) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/listings/${id}/reject`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to reject listing");
    }
  },

  // Fetch verification audit logs for 30-day lifecycle tracking
  getVerificationAuditLogs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/audit/verification`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch audit logs", error);
      return [];
    }
  },
};