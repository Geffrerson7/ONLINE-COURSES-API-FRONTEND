import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HomeView, CartView, PurchasedCourseView, LoginView, RegisterView} from "../pages";


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
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}
