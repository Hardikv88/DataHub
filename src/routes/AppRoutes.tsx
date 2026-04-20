import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login_Screen";
import Register from "../pages/auth/Register_Screen";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Route */}
      <Route
        path="/login"
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
        <Route element={<ProtectedRoute />}>
        {/* <Route path="/" element={<home />}> */}
         

          
        </Route>

     

      
      

    </Routes>
  );
};


export default AppRoutes;