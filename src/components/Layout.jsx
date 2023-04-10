import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="layout p-4">
      <Header />
      <Outlet />
    </div>
  );
}
