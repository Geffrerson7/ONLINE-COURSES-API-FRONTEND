import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HomeView, CartView, PurchasedCourseView} from "../pages";
import { Login } from "../components";


export default function Router() {
  
  const authTokens = localStorage.getItem("authTokens") 
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
        <Route
          path="/my-courses"
          element={authTokens ? <PurchasedCourseView /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
