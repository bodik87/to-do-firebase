import React from "react";
import { Link } from "react-router-dom";

export default function MyLink({
  children,
  to = "#",
  onClick = () => {},
  bg = "bg-my-violet",
  textColor = "text-gray-800",
}) {
  return (
    <Link to={to} onClick={onClick} className={`${bg} ${textColor} button`}>
      {children}
    </Link>
  );
}
