import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { CurrentLanguage } from "../context/LangContext";
import { UserAuth } from "../context/AuthContext";
import Todo from "../components/Todo";
import Form from "../components/Form";
import Button from "../components/UI/Button";
import { text } from "../assets/lang";
import Skeleton from "../components/UI/Loader";

export default function FolderPage() {
  const { userLanguage } = CurrentLanguage();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const { state } = useLocation();

  const [currentTodos, setCurrentTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCurrentTodos = async () => {
    setLoading(true);
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      const curFolderTodosArr = todosArr.filter(
        (todo) => todo.folderId === state.id
      );
      setCurrentTodos(curFolderTodosArr);
      setLoading(false);
    });
    return () => unsubscribe();
  };

  const createTodo = async (text) => {
    if (text === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: text,
      completed: false,
      owner: user.uid,
      folderId: state.id,
      date: Date(),
    });
  };

  useEffect(() => {
    fetchCurrentTodos();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteFolder = async () => {
    if (currentTodos.length > 0) {
      alert(text.canNotDeleteFolder[userLanguage]);
      return;
    }
    await deleteDoc(doc(db, "folders", state.id));
    navigate("/account");
  };

  return (
    <>
      <h2 className="mt-4 -mb-2 font-semibold text-xl text-my-yellow">
        {state.title}
      </h2>

      <Form userLanguage={userLanguage} onSubmit={createTodo} />
      {currentTodos
        .sort((a, b) => (a.date < b.date) - (a.date > b.date))
        // .reverse()
        .map((todo) => (
          <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
        ))}

      {loading && <Skeleton />}

      <div className={`${currentTodos.length > 0 && "opacity-50"} mt-4`}>
        <Button
          onClick={deleteFolder}
          textColor="text-black"
          variant="secondary"
          bg={"bg-red-400"}
        >
          {text.deleteFolder[userLanguage]}
        </Button>
      </div>
    </>
  );
}
