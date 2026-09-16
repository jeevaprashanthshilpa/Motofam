import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import HomePage from "../pages/public/HomePage";
import BrowsePage from "../pages/public/BrowsePage";
import BikeDetailPage from "../pages/public/BikeDetailPage";
import ComparePage from "../pages/public/ComparePage";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Seller Pages
import SellerDashboard from "../pages/seller/SellerDashboard";
import AddBikePage from "../pages/seller/AddBikePage";
import EditBikePage from "../pages/seller/EditBikePage";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ListingApprovals from "../pages/admin/ListingApprovals";
import VerificationAudit from "../pages/admin/VerificationAudit";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/bikes" element={<BrowsePage />} />
      <Route path="/bikes/:id" element={<BikeDetailPage />} />
      <Route path="/compare" element={<ComparePage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Seller Portal Routes */}
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute allowedRoles={["seller", "admin"]}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/add-bike"
        element={
          <ProtectedRoute allowedRoles={["seller", "admin"]}>
            <AddBikePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/edit-bike/:id"
        element={
          <ProtectedRoute allowedRoles={["seller", "admin"]}>
            <EditBikePage />
          </ProtectedRoute>
        }
      />

      {/* Admin Panel Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/approvals"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ListingApprovals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/audit"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <VerificationAudit />
          </ProtectedRoute>
        }
      />

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}