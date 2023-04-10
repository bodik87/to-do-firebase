import React from "react";
import CheckIcon from "./UI/Icons/CheckIcon";
import UncheckIcon from "./UI/Icons/UncheckIcon";
import MenuIcon from "./UI/Icons/MenuIcon";
import MyLink from "./UI/MyLink";

export default function Todo({ todo, toggleComplete }) {
  const currentButtonColor = todo.completed ? "" : "bg-white/10";

  return (
    <div
      className={`${
        todo.completed ? "bg-white/5" : "bg-white/10"
      } mt-1 flex justify-between mb-[1px] w-full`}
    >
      <div
        className="w-full flex p-4 cursor-pointer"
        onClick={() => toggleComplete(todo)}
      >
        <input
          id="checkbox"
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          className="hidden"
        />
        <label htmlFor="checkbox">
          {todo.completed ? <CheckIcon /> : <UncheckIcon />}
        </label>
        <p
          className={`${
            todo.completed && "cursor-pointer text-[#757474]"
          } ml-4`}
        >
          {todo.text}
          {/* {new Date(todo.date).toLocaleDateString() */}
        </p>
      </div>
      <MyLink
        to={`/account/todos/${todo.id}`}
        textColor="white"
        bg={currentButtonColor}
      >
        <MenuIcon />
      </MyLink>
    </div>
  );
}
