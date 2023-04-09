import React, { useState, useEffect } from "react";
import Todo from "./Todo/Todo";
import { db } from "../../../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { text } from "../../assets/lang";
import { CurrentLanguage } from "../../context/LangContext";
import { AnimatePresence } from "framer-motion";
import BottomSheet from "../UI/BottomSheet";

export default function HomeContainer() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const { userLanguage } = CurrentLanguage();
  const [active, setActive] = useState(false);

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
      date: Date(),
    });
    setInput("");
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
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
    <div className="w-full relative">
      <form onSubmit={createTodo} className="flex justify-between gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-white/10 py-4 px-4 w-full outline-none focus:bg-white/20"
          type="text"
          placeholder={text.addTodo[userLanguage]}
        />
        <button className="bg-[#6146C1] p-4 text-white hover:brightness-105 transition-all">
          <Plus />
        </button>
      </form>

      <AnimatePresence>
        {todos
          .sort((a, b) => (a.date > b.date) - (a.date < b.date))
          .reverse()
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
      </AnimatePresence>
      {todos.length < 1 ? null : (
        <p className="text-center pt-4">
          {text.todosLength[userLanguage]} {todos.length}
        </p>
      )}

      <BottomSheet
        active={active}
        setActive={setActive}
        onSubmit={createTodo}
        placeholder={text.addTodo[userLanguage]}
      />
      <div
        onClick={() => setActive(!active)}
        className="bg-white text-gray-800 text-center p-4 fixed max-w-md mx-auto bottom-0 left-0 right-0 rounded-2xl cursor-pointer z-10"
      >
        ADD
      </div>
    </div>
  );
}

function Plus() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
