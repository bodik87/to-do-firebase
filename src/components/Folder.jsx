import React from "react";
import MyLink from "./UI/MyLink";
import FolderIcon from "./UI/Icons/FolderIcon";

export default function Folder({ folder }) {
  return (
    <MyLink bg="bg-my-yellow" to={`/account/folders/${folder.id}`}>
      <FolderIcon />
      <span className="group-hover:translate-x-1 transition-all ml-4">
        {folder.title}
      </span>
    </MyLink>
  );
}
