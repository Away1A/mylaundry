import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Profile from "../pages/ProfilePage";
import AdminDashboard from "../pages/AdminDashboard";

const AppRouter = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !token ? (
              <LoginForm />
            ) : (
              <Navigate to={role === "admin" ? "/admin" : "/admin"} />
            )
          }
        />
        <Route
          path="/register"
          element={
            !token ? (
              <RegisterForm />
            ) : (
              <Navigate to={role === "admin" ? "/admin" : "/profile"} />
            )
          }
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            token && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={token ? (role === "admin" ? "/admin" : "/profile") : "/login"}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
