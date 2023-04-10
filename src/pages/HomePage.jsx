import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { CurrentLanguage } from "../context/LangContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import Todo from "../components/Todo";

export default function HomePage() {
  const { user } = UserAuth();
  const { userLanguage } = CurrentLanguage();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const createTodo = async (text) => {
    if (text === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: text,
      completed: false,
      owner: user.uid,
      folderId: "Home",
      date: Date(),
    });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  return (
    <>
      <Form userLanguage={userLanguage} onSubmit={createTodo} />
      {todos
        .sort((a, b) => (a.date < b.date) - (a.date > b.date))
        // .reverse()
        .map((todo) => (
          <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
        ))}
    </>
  );
}
