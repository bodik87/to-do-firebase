import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { CurrentLanguage } from "../context/LangContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../context/AuthContext";
import Todo from "../components/Todo";
import { text } from "../assets/lang";
import Skeleton from "../components/UI/Loader";
import ImportantIcon from "../components/UI/Icons/ImportantIcons";
import { nanoid } from "nanoid";
import Button from "../components/UI/Button";
import { AnimatePresence } from "framer-motion";

export default function HomePage() {
  const { user } = UserAuth();
  const { userLanguage } = CurrentLanguage();

  const [todos, setTodos] = useState([]);
  const [importantTodos, setImportantTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDocs = () => {
      setLoading(true);
      const unsub = onSnapshot(doc(db, "usersDocs", user.uid), (doc) => {
        const { todos } = doc.data();
        setTodos(todos);
        const importantTodos = todos?.filter((todo) => todo.important === true);
        setImportantTodos(importantTodos);
      });

      return () => {
        unsub();
      };
    };
    user.uid && getDocs();
    setLoading(false);
  }, [user.uid]);

  const createTodo = async (text) => {
    if (text === "") {
      // alert("Please enter a valid todo");
      return;
    }
    const docRef = doc(db, "usersDocs", user.uid);
    await updateDoc(docRef, {
      todos: arrayUnion({
        id: nanoid(),
        text: text,
        completed: false,
        folderId: "Home",
        date: Date(),
      }),
    });
  };

  const toggleComplete = async (todo) => {
    const docRef = doc(db, "usersDocs", user.uid);
    const docSnap = await getDoc(docRef);
    const { todos } = docSnap.data();
    const updatedTodos = todos.map((el) =>
      el.id === todo.id ? { ...el, completed: !todo.completed } : el
    );
    await updateDoc(docRef, { todos: updatedTodos });
  };

  const deleteCompletedTodos = async () => {
    const docRef = doc(db, "usersDocs", user.uid);
    const docSnap = await getDoc(docRef);
    const { todos } = docSnap.data();
    const uncomletedTodos = todos.filter((el) => !el.completed);
    // const updatedTodos = todos.map((el) =>
    //   el.id === todo.id ? { ...el, completed: !todo.completed } : el
    // );
    await updateDoc(docRef, { todos: uncomletedTodos });
  };

  return (
    <>
      <Form userLanguage={userLanguage} onSubmit={createTodo} />

      {importantTodos?.length > 0 && (
        <h2 className="mt-4 font-semibold text-lg text-orange-300 flex items-center gap-2">
          <ImportantIcon /> {text.important[userLanguage]}
        </h2>
      )}

      {importantTodos &&
        importantTodos
          ?.sort((a, b) => (a.date < b.date) - (a.date > b.date))
          ?.map((todo) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
          ))}

      {todos?.length > 0 && (
        <h2 className="mt-4">
          {importantTodos?.length > 0
            ? text.otherTodos[userLanguage]
            : text.todos[userLanguage]}
        </h2>
      )}

      <AnimatePresence>
        {todos
          ?.sort((a, b) => (a.date < b.date) - (a.date > b.date))
          // .reverse()
          ?.map((todo) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
          ))}
      </AnimatePresence>

      {todos?.length > 0 && (
        <div className="flex justify-between items-center mt-4 mb-1">
          <div className="text-center text-sm">
            {text.todosLength[userLanguage]}
            {todos.length}
          </div>
          <Button
            onClick={deleteCompletedTodos}
            textColor="text-black"
            bg={"bg-red-400"}
          >
            {text.deleteCompleted[userLanguage]}
          </Button>
        </div>
      )}

      {loading ? <Skeleton /> : <div className="h-1" />}
    </>
  );
}
