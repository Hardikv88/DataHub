// routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";


const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  console.log("user login status",user);
  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;