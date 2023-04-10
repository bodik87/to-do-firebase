import React from "react";
import MyLink from "./UI/MyLink";
import useGetLocation from "../hooks/useGetLocation";
import FolderIcon from "./UI/Icons/FolderIcon";
import CheckIcon from "./UI/Icons/CheckIcon";

export default function ActionsRow() {
  const option = useGetLocation();
  const getLinkIcon = () => {
    switch (option) {
      case "folder":
        return <CheckIcon fill="#BDBDBD" />;
      default:
        return <FolderIcon />;
    }
  };

  const getCurrentPath = () => {
    switch (option) {
      case "folder":
        return "/account";
      default:
        return "/account/folders";
    }
  };

  const currentLinkIcon = getLinkIcon();
  const currentPath = getCurrentPath();

  return (
    <div className="mt-2 flex justify-between">
      <MyLink to={currentPath} bg="bg-[#333]" textColor="white">
        {currentLinkIcon}
      </MyLink>
      <h2>{option}</h2>
    </div>
  );
}
