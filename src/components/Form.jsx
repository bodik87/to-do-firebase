import React, { useState } from "react";
import { text } from "../assets/lang";
import Button, { getButtonColor, getButtonTextColor } from "./UI/Button";
import Plus from "./UI/Icons/Plus";
import { useLocation } from "react-router-dom";

export default function Form({ userLanguage, onSubmit }) {
  const location = useLocation();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(e);
    onSubmit(input);
    setInput("");
  };

  const home = location.pathname === "/account";
  const folder = location.pathname.includes("/account/folders/");
  const foldersPage = location.pathname === "/account/folders";

  const getInputPlaceholder = () => {
    if (home) return text.addTodo[userLanguage];
    if (folder) return text.addTodo[userLanguage];
    if (foldersPage) return text.addFolder[userLanguage];
  };

  const currentInputPlaceholder = getInputPlaceholder();
  const currentButtonColor = getButtonColor(location);
  const currentButtonTextColor = getButtonTextColor(location);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between gap-2 mt-4 pb-1"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input"
        type="text"
        placeholder={currentInputPlaceholder}
      />
      <Button
        bg={currentButtonColor}
        type="submit"
        textColor={currentButtonTextColor}
      >
        <Plus />
      </Button>
    </form>
  );
}
