import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Profile from "../pages/ProfilePage";

const AppRouter = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginForm /> : <Navigate to="/profile" />}
        />
        <Route
          path="/register"
          element={!token ? <RegisterForm /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/profile" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/profile" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
