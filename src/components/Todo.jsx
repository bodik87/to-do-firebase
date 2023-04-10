import React from "react";
import CheckIcon from "./UI/Icons/CheckIcon";
import UncheckIcon from "./UI/Icons/UncheckIcon";
import MenuIcon from "./UI/Icons/MenuIcon";
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";

export default function Todo({ todo, toggleComplete }) {
  const navigate = useNavigate();
  const currentButtonColor = todo.completed ? "" : "bg-white/10";

  return (
    <div
      className={`${
        todo.completed
          ? "bg-white/5 hover:bg-white/10"
          : "bg-white/10 hover:bg-white/20"
      } mt-1 flex justify-between w-full rounded-md `}
    >
      <div
        className="w-full max-w-xs overflow-hidden flex items-center gap-2 py-2 pl-3 cursor-pointer"
        onClick={() => toggleComplete(todo)}
      >
        <div>{todo.completed ? <CheckIcon /> : <UncheckIcon />}</div>
        <p className={`${todo.completed && "cursor-pointer text-[#757474]"}`}>
          {todo.text.length > 55 ? todo.text.slice(0, 55) + "..." : todo.text}
          {/* {new Date(todo.date).toLocaleDateString() */}
        </p>
      </div>
      <Button
        onClick={() => navigate(`/account/todos/${todo.id}`, { state: todo })}
        textColor="white"
        bg={currentButtonColor}
      >
        <MenuIcon />
      </Button>
    </div>
  );
}
