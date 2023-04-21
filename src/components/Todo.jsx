import React from "react";
import CheckIcon from "./UI/Icons/CheckIcon";
import UncheckIcon from "./UI/Icons/UncheckIcon";
import MenuIcon from "./UI/Icons/MenuIcon";
import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";
import { CurrentLanguage } from "../context/LangContext";
import { text } from "../assets/lang";
import { motion } from "framer-motion";

export default function Todo({ todo, toggleComplete }) {
  const { userLanguage } = CurrentLanguage();
  const navigate = useNavigate();
  const currentButtonColor = todo.completed ? "" : "bg-white/10";

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        todo.completed
          ? "bg-white/5 hover:bg-white/10"
          : "bg-white/10 hover:bg-white/20"
      } mt-1 flex justify-between w-full rounded-md `}
    >
      <div
        className="w-full overflow-hidden flex items-center gap-2 py-2 pl-3 cursor-pointer relative"
        onClick={() => toggleComplete(todo)}
      >
        <div>{todo.completed ? <CheckIcon /> : <UncheckIcon />}</div>
        <div>
          <div
            className={`${
              todo.completed && "cursor-pointer text-[#757474]"
            } flex gap-1`}
          >
            {todo.important && (
              <span className="text-orange-200 font-semibold">!</span>
            )}
            {todo.text.length > 55 ? todo.text.slice(0, 55) + "..." : todo.text}
          </div>
          <p className="text-xs mt-1 text-[#757474]">
            {text.added[userLanguage]}
            {new Date(todo.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      {!todo.completed && (
        <Button
          onClick={() => navigate(`/account/todos/${todo.id}`, { state: todo })}
          textColor="white"
          bg={currentButtonColor}
        >
          <MenuIcon />
        </Button>
      )}
    </motion.div>
  );
}
