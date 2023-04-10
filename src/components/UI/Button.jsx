import React from "react";

export const getButtonColor = (location) => {
  switch (location.pathname) {
    case "/account/folders":
      return "bg-my-yellow";
    case "/account":
      return "bg-my-violet";
    default:
      return "bg-my-violet";
  }
};

export const getButtonTextColor = (location) => {
  switch (location.pathname) {
    case "/account/folders":
      return "text-gray-800";
    case "/account":
      return "text-white";
    default:
      return "text-white";
  }
};

export const getButtonStyle = (variant) => {
  switch (variant) {
    case "secondary":
      return "secondaryButton";
    default:
      return "button";
  }
};

export default function Button({
  children,
  type = "button",
  onClick = () => {},
  bg = "bg-my-violet",
  textColor = "text-gray-800",
  variant = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bg} ${textColor} ${
        variant === "secondary" ? "secondaryButton" : "button"
      }`}
    >
      {children}
    </button>
  );
}
