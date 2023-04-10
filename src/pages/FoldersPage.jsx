import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { useLocation } from "react-router-dom";
import { CurrentLanguage } from "../context/LangContext";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import Folder from "../components/Folder";

export default function FoldersPage() {
  const { userLanguage } = CurrentLanguage();
  const { user } = UserAuth();

  const [folders, setFolders] = useState([]);
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
      setFolders(curUserFodersArr);
      setLoading(false);
    });
    return () => unsubscribe();
  };

  const createFolder = async (text) => {
    if (text === "") {
      alert("Please enter a valid folder name");
      return;
    }
    await addDoc(collection(db, "folders"), {
      title: text,
      owner: user.uid,
      date: Date(),
    });
  };

  useEffect(() => {
    fetchFolders();
  }, [user]);

  return (
    <>
      <Form userLanguage={userLanguage} onSubmit={createFolder} />

      <div className="mt-1 flex flex-col gap-1">
        {folders
          .sort((a, b) => (a.date < b.date) - (a.date > b.date))
          .map((folder) => (
            <Folder key={folder.date} folder={folder} />
          ))}
      </div>
    </>
  );
}
