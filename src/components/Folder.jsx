import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./UI/Button";

export default function Folder({ folder }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() =>
        navigate(`/account/folders/${folder.id}`, { state: folder })
      }
      bg="bg-my-yellow"
    >
      <span className="py-1 text-lg group-hover:translate-x-1 transition-all">
        {folder.title}
      </span>
    </Button>
  );
}
