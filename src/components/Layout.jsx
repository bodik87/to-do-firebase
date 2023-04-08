import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="layout max-w-4xl mx-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
