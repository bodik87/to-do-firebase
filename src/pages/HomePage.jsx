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
import { text } from "../assets/lang";
import Skeleton from "../components/UI/Loader";
import ImportantIcon from "../components/UI/Icons/ImportantIcons";

export default function HomePage() {
  const { user } = UserAuth();
  const { userLanguage } = CurrentLanguage();

  const [todos, setTodos] = useState([]);
  const [importantTodos, setImportantTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      const curUserTodosArr = todosArr.filter(
        (todo) =>
          todo.owner === user.uid &&
          todo.folderId === "Home" &&
          todo.important !== true
      );
      setTodos(curUserTodosArr);
      const importantTodos = todosArr.filter((todo) => todo.important === true);
      setImportantTodos(importantTodos);
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

      {loading && <Skeleton />}

      {importantTodos.length > 0 && (
        <h2 className="mt-4 font-semibold text-lg text-orange-300 flex items-center gap-2">
          <ImportantIcon /> {text.important[userLanguage]}
        </h2>
      )}

      {importantTodos &&
        importantTodos
          .sort((a, b) => (a.date < b.date) - (a.date > b.date))
          .map((todo) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
          ))}

      {todos.length > 0 && (
        <h2 className="mt-4">
          {importantTodos.length > 0
            ? text.otherTodos[userLanguage]
            : text.todos[userLanguage]}
        </h2>
      )}
      {todos
        .sort((a, b) => (a.date < b.date) - (a.date > b.date))
        // .reverse()
        .map((todo) => (
          <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
        ))}

      {todos.length > 0 && (
        <div className="mt-4 w-full text-center text-sm">
          {text.todosLength[userLanguage]}
          {todos.length}
        </div>
      )}
    </>
  );
}
