import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { text } from "../assets/lang";
import { CurrentLanguage } from "../context/LangContext";
import Plus from "../components/UI/Icons/Plus";
import FolderIcon from "../components/UI/Icons/FolderIcon";
import { UserAuth } from "../context/AuthContext";
import Todo from "../components/Todo";

export default function FolderPage() {
  const { user } = UserAuth();
  const { userLanguage } = CurrentLanguage();
  const { id } = useParams();
  const [folder, setFolder] = useState({});
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchFolders = async () => {
    const q = query(collection(db, "folders"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const foldersArr = [];
      querySnapshot.forEach((doc) => {
        foldersArr.push({ ...doc.data(), id: doc.id });
      });
      const curUserFoder = foldersArr.filter((folder) => folder.id === id)[0];
      setFolder(curUserFoder);
    });
    return () => unsubscribe();
  };

  const fetchTodos = async () => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      const curFolderTodosArr = todosArr.filter((todo) => todo.folderId === id);
      setTodos(curFolderTodosArr);
    });
    return () => unsubscribe();
  };

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
      owner: user.uid,
      folderId: id,
      date: Date(),
    });
    setInput("");
  };

  useEffect(() => {
    fetchFolders();
    fetchTodos();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div>
      <form onSubmit={createTodo} className="flex justify-between gap-2 mb-4">
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

      {todos
        .sort((a, b) => (a.date < b.date) - (a.date > b.date))
        .map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
    </div>
  );
}
