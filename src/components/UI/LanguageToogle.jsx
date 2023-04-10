import React from "react";
import { CurrentLanguage } from "../../context/LangContext";
import { languages } from "../../assets/lang";

export default function LanguageToogle() {
  const { changeLanguages } = CurrentLanguage();
  const switchToUA = () => changeLanguages("ua");
  const switchToUK = () => changeLanguages("en");

  return (
    <div className="flex gap-6">
      <span onClick={switchToUA} className="cursor-pointer">
        <Ukraine />
      </span>
      <span onClick={switchToUK} className="cursor-pointer">
        <UnitedKingdom />
      </span>
    </div>
  );
}

function Ukraine() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none">
      <path fill="#FFDA2C" d="M0 0h32v22H0z" />
      <path fill="#3A99FF" d="M0 0h21v8H0V0Z" />
    </svg>
  );
}

function UnitedKingdom() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none">
      <path fill="#1A47B8" d="M0 0h21v15H0z" />
      <path fill="#fff" d="M2.234 0H0v2.5L18.754 15H21v-2.5L2.234 0Z" />
      <path fill="#F93939" d="M.745 0 21 13.535V15h-.728L0 1.45V0h.745Z" />
      <path fill="#fff" d="M19 0h2v2.5S8.01 10.828 2 15H0v-2.5L19 0Z" />
      <path fill="#F93939" d="M21 0h-.678L0 13.547V15h.745L21 1.462V0Z" />
      <path
        fill="#fff"
        d="M7.637 0h5.743v4.627H21v5.743h-7.62V15H7.637v-4.63H0V4.627h7.637V0Z"
      />
      <path
        fill="#F93939"
        d="M8.842 0h3.316v5.77H21v3.46h-8.842V15H8.842V9.23H0V5.77h8.842V0Z"
      />
    </svg>
  );
}
