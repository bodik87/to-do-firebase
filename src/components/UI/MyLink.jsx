import React from "react";
import { Link } from "react-router-dom";

export default function MyLink({
  children,
  to = "#",
  onClick = () => {},
  bg = "bg-my-violet",
  textColor = "text-gray-800",
  variant = "button",
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${bg} ${textColor} ${
        variant === "secondary" ? "secondaryButton" : "button"
      }`}
    >
      {children}
    </Link>
  );
}
