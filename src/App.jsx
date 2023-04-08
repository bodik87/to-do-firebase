import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { LangContextProvider } from "./context/LangContext";

export default function App() {
  return (
    <LangContextProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </LangContextProvider>
  );
}
