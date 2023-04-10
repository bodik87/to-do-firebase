import React, { useEffect, useState } from "react";
import { CurrentLanguage } from "../context/LangContext";
import { UserAuth } from "../context/AuthContext";
import { text } from "../assets/lang";
import Plus from "./UI/Icons/Plus";
import Button, { getButtonColor, getButtonTextColor } from "./UI/Button";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Skeleton from "./UI/Skeleton";
import Todo from "./Todo";
import Folder from "./Folder";

export default function Content({ option, onSubmit = () => {} }) {
  const { userLanguage } = CurrentLanguage();
  const { user } = UserAuth();

  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [input, setInput] = useState("");
  const getInputPlaceholder = () => {
    switch (option) {
      case "folder":
        return text.addFolder[userLanguage];
      default:
        return text.addTodo[userLanguage];
    }
  };

  const currentInputPlaceholder = getInputPlaceholder();
  const currentButtonColor = getButtonColor(option);
  const currentButtonTextColor = getButtonTextColor(option);

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

  const fetchTodos = async () => {
    setLoading(true);
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      const curUserTodosArr = todosArr
        .filter((todo) => todo.owner === user.uid)
        .filter((todo) => todo.folderId === "Home");
      setTodos(curUserTodosArr);
      setLoading(false);
    });
    return () => unsubscribe();
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  useEffect(() => {
    fetchTodos();
    fetchFolders();
  }, [user]);

  // console.log(option);

  return (
    <>
      <form
        onSubmit={onSubmit}
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

      <Skeleton loading={loading} text={text.loading[userLanguage]} />

      {option === "folder" ? (
        <div className="mt-1 flex flex-col gap-1">
          {folders
            .sort((a, b) => (a.date < b.date) - (a.date > b.date))
            .map((folder) => (
              <Folder key={folder.date} folder={folder} />
            ))}
        </div>
      ) : (
        <>
          {todos
            .sort((a, b) => (a.date < b.date) - (a.date > b.date))
            // .reverse()
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
        </>
      )}
    </>
  );
}
