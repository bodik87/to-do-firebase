import React, { useEffect, useState } from "react";
import { CurrentLanguage } from "../context/LangContext";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { text } from "../assets/lang";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../components/UI/Button";
import Skeleton from "../components/UI/Loader";
import ImportantIcon from "../components/UI/Icons/ImportantIcons";

export default function TodoPage() {
  const { user } = UserAuth();
  const { state } = useLocation();
  const { userLanguage } = CurrentLanguage();
  const [input, setInput] = useState(state?.text);
  const navigate = useNavigate();

  const [availableFolders, setAvailableFolder] = useState([]);
  const [visible, setVisible] = useState(false);
  const [important, setImportant] = useState(state?.important || false);
  const [loading, setLoading] = useState(true);

  const fetchFolders = async () => {
    setLoading(true);
    const q = query(collection(db, "folders"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const foldersArr = [];
      querySnapshot.forEach((doc) => {
        foldersArr.push({ ...doc.data(), id: doc.id });
      });
      const curUserFodersArr = foldersArr.filter(
        (folder) => folder.owner === user.uid
      );
      setAvailableFolder(curUserFodersArr);
      setLoading(false);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    fetchFolders();
  }, [user]);

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "todos", state.id));
    navigate(-1);
  };

  const toggleTitleUpdate = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      text: input,
      important: important,
    });
    navigate(-1);
  };

  const toggleFolderUpdate = async (todo, folder) => {
    await updateDoc(doc(db, "todos", todo.id), {
      folderId: folder.id,
    });
    // navigate(-1);
    navigate(`/account/folders/${folder.id}`, { state: folder });
    setVisible(false);
  };

  return (
    <div>
      <div className="py-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          type="text"
        />
      </div>

      {loading && <Skeleton />}

      <div className="relative flex gap-4">
        {availableFolders.length > 0 && (
          <>
            <Button
              onClick={() => setVisible(!visible)}
              variant="secondary"
              textColor="white"
              bg="bg-[#37383A]"
            >
              {text.moveTo[userLanguage]}
            </Button>
            <Button
              onClick={() => setImportant(!important)}
              variant="secondary"
              textColor="white"
              bg={important ? "bg-[#B28D30]" : "bg-[#37383A]"}
            >
              <ImportantIcon />
              <span className="mx-3">{text.important[userLanguage]}</span>
            </Button>
          </>
        )}
        {availableFolders && visible && (
          <>
            <div
              onClick={() => setVisible(false)}
              className={`fixed inset-0 bg-black/50`}
            >
              <div className="min-w-[200px] max-w-lg absolute top-12 left-0 bg-white text-gray-900 rounded-md z-10"></div>
            </div>

            <div className="min-w-[200px] max-w-lg absolute top-12 left-0 bg-white text-gray-900 rounded-md z-10">
              {availableFolders.map((folder, i) => (
                <div
                  key={folder + i}
                  onClick={() => toggleFolderUpdate(state, folder)}
                  className="p-4 cursor-pointer last:border-none border-b border-gray-300 hover:font-semibold"
                >
                  {folder.title}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        <Button
          onClick={deleteTodo}
          textColor="text-black"
          variant="secondary"
          bg={"bg-red-400"}
        >
          {text.deleteTodo[userLanguage]}
        </Button>

        <Button
          onClick={() => toggleTitleUpdate(state)}
          textColor="text-white"
          variant="secondary"
        >
          {text.saveChanges[userLanguage]}
        </Button>
      </div>
    </div>
  );
}
