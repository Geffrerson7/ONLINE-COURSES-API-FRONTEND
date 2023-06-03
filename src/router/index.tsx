import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomeView,
  CartView,
  PurchasedCourseView,
  LoginView,
  RegisterView,
} from "../pages";
import { ProtectedRoute } from "../services/ProtectedRoute";

export default function Router() {
  const authTokens = localStorage.getItem("authTokens");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={!!authTokens}>
              <HomeView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAllowed={!!authTokens}>
              <CartView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute isAllowed={!!authTokens}>
              <PurchasedCourseView />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}
