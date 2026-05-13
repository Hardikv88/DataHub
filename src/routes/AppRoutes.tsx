import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login_Screen";
import Register from "../pages/auth/Register_Screen";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { MainLayout } from "../layout/MainLayout";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Products } from "../pages/products/Products";
import { Orders } from "../pages/orders/Orders";
import { Settings } from "../pages/settings/Settings";
import { Analytics } from "../pages/analytics/Analytics";
import { WishList } from "../pages/wishlist/WishList";
import { ProductDetails } from "../pages/products/ProductDetails";
import UserList from "../pages/users/UserList";
import UserDetails from "../pages/users/UserDetails";
import Posts from "../pages/posts/Posts";
import PostDetails from "../pages/posts/PostDetails";
import Recipes from "../pages/recipes/Recipes";
import RecipeDetails from "../pages/recipe-details/RecipeDetails";
import Todos from "../pages/todos/Todos";
import Quotes from "../pages/quotes/Quotes";


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
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/quotes" element={<Quotes />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;
