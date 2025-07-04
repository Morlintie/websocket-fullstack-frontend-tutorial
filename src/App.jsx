import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

export function App() {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="login" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
