import React from "react";

export const getButtonColor = (option) => {
  switch (option) {
    case "folder":
      return "bg-my-yellow";
    default:
      return "bg-my-violet";
  }
};

export const getButtonTextColor = (option) => {
  switch (option) {
    case "folder":
      return "text-gray-800";
    default:
      return "text-white";
  }
};

export default function Button({
  children,
  type = "button",
  onClick = () => {},
  bg = "bg-my-violet",
  textColor = "text-gray-800",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bg} ${textColor} button`}
    >
      {children}
    </button>
  );
}
