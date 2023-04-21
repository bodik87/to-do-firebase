import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="layout py-3 px-4">
      <Header />
      <Outlet />
    </div>
  );
}
