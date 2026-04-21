import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login_Screen";
import Register from "../pages/auth/Register_Screen";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import { MainLayout } from "../layout/MainLayout";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Products } from "../pages/products/Products";
import { Customers } from "../pages/customers/Customers";
import { Orders } from "../pages/orders/Orders";
import { Settings } from "../pages/settings/Settings";
import { Analytics } from "../pages/analytics/Analytics";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Route */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;