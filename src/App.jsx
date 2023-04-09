import React from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { LangContextProvider } from "./context/LangContext";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import FolderPage from "./pages/FolderPage";

export default function App() {
  return (
    <LangContextProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/account/folder/:id" element={<FolderPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </LangContextProvider>
  );
}
