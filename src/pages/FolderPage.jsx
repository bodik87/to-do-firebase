import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { text } from "../assets/lang";
import { CurrentLanguage } from "../context/LangContext";
import Plus from "../components/UI/Icons/Plus";
import FolderIcon from "../components/UI/Icons/FolderIcon";

export default function FolderPage() {
  const { id } = useParams();
  const [folder, setFolder] = useState({});
  const [input, setInput] = useState("");
  const { userLanguage } = CurrentLanguage();

  return (
    <div>
      <h1 className="text-center">{folder.title}</h1>
      <div>
        <FolderIcon />
      </div>

      <form onSubmit={() => {}} className="flex justify-between gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-white/10 py-4 px-4 w-full outline-none focus:bg-white/20"
          type="text"
          placeholder={text.addTodo[userLanguage]}
        />
        <button className="bg-my-yellow p-4 text-gray-800 hover:brightness-105 transition-all">
          <Plus />
        </button>
      </form>
    </div>
  );
}
