import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { text } from "../assets/lang";
import { CurrentLanguage } from "../context/LangContext";
import LanguageToogle from "./UI/LanguageToogle";
import MenuIcon from "./UI/Icons/MenuIcon";
import BackIcon from "./UI/Icons/BackIcon";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const home = location.pathname === "/account";

  const { user, logout } = UserAuth();
  const [visible, setVisible] = useState(false);

  const handleLogout = async () => {
    try {
      if (confirm(`${text.logout[userLanguage]}?`)) {
        await logout();
        navigate("/");
        console.log("You are logged out");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const { userLanguage } = CurrentLanguage();

  return (
    <div className="flex gap-2 justify-between items-center relative">
      <h1 className="font-bold text-lg">Todo</h1>
      <div className="flex gap-2">
        {!home && (
          <Link
            to={"/account"}
            className="py-2 px-4 z-10 bg-white/10 hover:bg-white/20 transition-all rounded-sm"
          >
            <BackIcon />
          </Link>
        )}
        <button
          className="py-2 px-4 z-10 bg-white/10 hover:bg-white/20 transition-all rounded-sm"
          onClick={() => setVisible(!visible)}
        >
          <MenuIcon />
        </button>
      </div>

      {visible && (
        <>
          <div
            onClick={() => setVisible(false)}
            className={`fixed inset-0 bg-black/50`}
          />
          <div
            className={`absolute top-12 right-0 flex flex-col gap-4 p-4 pl-4 pr-6 bg-white text-gray-800 rounded-lg z-10 shadow-xl`}
          >
            <div className="flex items-center gap-4">
              {user.photoURL && (
                <div className="w-8 rounded-full overflow-hidden object-cover">
                  <img className="scale-105" src={user.photoURL} alt="Avatar" />
                </div>
              )}
              <span className="text-sm font-semibold">
                {user && user.displayName}
              </span>
            </div>

            <div className="flex justify-end">
              <LanguageToogle />
            </div>

            <div className="text-right mt-2">
              <button
                onClick={handleLogout}
                className="text-right border px-4 py-1 rounded-md"
              >
                {text.logout[userLanguage]}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
