import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useListings(initialFilters = {}) {
  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchBikes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Build query parameters from filters
      const params = new URLSearchParams();
      if (filters.brand) params.append("brand", filters.brand);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.minYear) params.append("minYear", filters.minYear);
      if (filters.verifiedOnly) params.append("verified", "true");

      const response = await axios.get(`/api/bikes?${params.toString()}`);
      setBikes(response.data.bikes || response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch bike listings");
      // Fallback mock data if API is not yet running
      setBikes([
        {
          id: 1,
          title: "Royal Enfield Classic 350",
          year: 2022,
          price: 175000,
          mileage: 12000,
          location: "Bengaluru",
          verifiedStatus: true,
          sellerPhone: "+919876543210",
          sellerWhatsApp: "919876543210",
        },
        {
          id: 2,
          title: "KTM Duke 250",
          year: 2023,
          price: 210000,
          mileage: 8500,
          location: "Mumbai",
          verifiedStatus: true,
          sellerPhone: "+919876543211",
          sellerWhatsApp: "919876543211",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBikes();
  }, [fetchBikes]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return { bikes, isLoading, error, filters, updateFilters, refetch: fetchBikes };
}