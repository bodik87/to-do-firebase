import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { languages, text } from "../assets/lang";
import { CurrentLanguage } from "../context/LangContext";

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
  const handleLanguagesChange = (language) => changeLanguages(language);

  return (
    <div className="px-4 sm:px-8 py-4 flex gap-2 justify-between items-center">
      <span className="hidden sm:inline">{user && user.email}</span>
      <h1 className="font-bold text-lg">Todo app</h1>
      <div>
        <button onClick={handleLogout} className="border px-6 py-2 my-4">
          {text.logout[userLanguage]}
        </button>
        <select
          value={userLanguage}
          onChange={(e) => handleLanguagesChange(e.target.value)}
          className="bg-transparent ml-4"
        >
          <option className="text-black" value={languages[0]}>
            {languages[0]}
          </option>
          <option className="text-black" value={languages[1]}>
            {languages[1]}
          </option>
        </select>
      </div>
    </div>
  );
}
