import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { text } from "../assets/lang";
import { CurrentLanguage } from "../context/LangContext";
import LanguageToogle from "./UI/LanguageToogle";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const { userLanguage, changeLanguages } = CurrentLanguage();

  return (
    <div className="p-4 flex gap-2 justify-between items-center">
      <span className="hidden sm:inline">{user && user.email}</span>
      <h1 className="font-bold text-lg">Todo</h1>
      <div>
        <button onClick={handleLogout} className="border px-6 py-2 my-4">
          {text.logout[userLanguage]}
        </button>
        <LanguageToogle />
      </div>
    </div>
  );
}
