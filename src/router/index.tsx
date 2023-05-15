import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HomeView, CartView } from "../pages";
import { Login } from "../components";

export default function Router() {
  
  const authTokens = localStorage.getItem("authTokens") ?? ""
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={authTokens ? <HomeView /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={authTokens ? <CartView /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
