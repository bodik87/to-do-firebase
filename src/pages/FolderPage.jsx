import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { CurrentLanguage } from "../context/LangContext";
import { UserAuth } from "../context/AuthContext";
import Todo from "../components/Todo";
import Form from "../components/Form";

export default function FolderPage() {
  const { userLanguage } = CurrentLanguage();
  const { user } = UserAuth();
  const { id } = useParams();

  const [currentTodos, setCurrentTodos] = useState([]);

  const fetchCurrentTodos = async () => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      const curFolderTodosArr = todosArr.filter((todo) => todo.folderId === id);
      setCurrentTodos(curFolderTodosArr);
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
      folderId: id,
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

  return (
    <>
      <Form userLanguage={userLanguage} onSubmit={createTodo} />
      {currentTodos
        .sort((a, b) => (a.date < b.date) - (a.date > b.date))
        // .reverse()
        .map((todo) => (
          <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
        ))}
    </>
  );
}
