import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { text } from "../assets/lang";
import { CurrentLanguage } from "../context/LangContext";
import LanguageToogle from "./UI/LanguageToogle";
import MenuIcon from "./UI/Icons/MenuIcon";
import FolderIcon from "./UI/Icons/FolderIcon";
import Button from "./UI/Button";
import MyLink from "./UI/MyLink";
import Logo from "./UI/Icons/Logo";
import BackIcon from "./UI/Icons/BackIcon";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const home = location.pathname === "/account";
  const folder = location.pathname.includes("/account/folders/");
  const isVisibleFolderIcon = home || folder;

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
    <div className="mt-2 flex gap-2 justify-between items-center relative">
      <div className="flex items-center gap-3">
        <Logo />
        <h1 className="font-bold text-xl">Todo</h1>
      </div>

      <div className="flex gap-2">
        {!home && (
          <MyLink
            bg="bg-white/10"
            textColor="white"
            to={"/account"}
            variant="secondary"
          >
            <BackIcon />
          </MyLink>
        )}
        {/* {isVisibleFolderIcon && (
          <MyLink
            bg="bg-white/10"
            textColor="white"
            to={"/account/folders"}
            variant="secondary"
          >
            <FolderIcon />
          </MyLink>
        )} */}
        <Button
          bg="bg-white/10"
          textColor="white"
          className="secondaryButton"
          onClick={() => setVisible(!visible)}
          variant="secondary"
        >
          <MenuIcon />
        </Button>
      </div>
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setVisible(false)}
              className={`fixed inset-0 bg-black/50 z-10`}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`absolute top-12 right-0 flex flex-col gap-4 p-4 pl-4 pr-6 bg-white text-gray-800 rounded-lg z-20 shadow-xl`}
            >
              <div className="flex items-center gap-4">
                {user.photoURL && (
                  <div className="w-8 rounded-full overflow-hidden object-cover">
                    <img
                      className="scale-105"
                      src={user.photoURL}
                      alt="Avatar"
                    />
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
