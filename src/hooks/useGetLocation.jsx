import React from "react";
import { useLocation } from "react-router-dom";

export default function useGetLocation() {
  const location = useLocation();
  const getOptions = () => {
    switch (location.pathname) {
      case "/account":
        return "todo";
      case "/account/folders":
        return "folder";
    }
  };
  const option = getOptions();
  return option;
}
