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
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import FolderIcon from "../UI/Icons/FolderIcon";
import Plus from "../UI/Icons/Plus";

export default function HomeContainer() {
  const { userLanguage } = CurrentLanguage();
  const { user } = UserAuth();

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);

  const [folderMenu, setFolderMenu] = useState(false);
  const [newFolderInput, setNewFolderInput] = useState(false);

  // /////////////////////////////////////////////

  // const fetchUserData = async () => {
  //   const userRef = doc(db, "users", user.uid);
  //   const docSnap = await getDoc(userRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  const fetchFolders = async () => {
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
      const curUserTodosArr = todosArr.filter(
        (todo) => todo.owner === user.uid
      );
      setTodos(curUserTodosArr);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    fetchTodos();
    fetchFolders();
  }, [user]);

  const createFolder = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid folder name");
      return;
    }
    await addDoc(collection(db, "folders"), {
      title: input,
      owner: user.uid,
      date: Date(),
    });
    setInput("");
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
      date: Date(),
    });
    setInput("");
  };

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
    <div className="max-w-lg w-full mt-4 relative">
      <div className="flex pb-4">
        <button
          onClick={() => {
            setFolderMenu(!folderMenu);
            setNewFolderInput(false);
          }}
          className="text-sm bg-[#333] rounded-sm px-4 py-2 hover:bg-[#999]transition-all z-10 flex"
        >
          <FolderIcon />
        </button>
        <button
          onClick={() => setNewFolderInput(!newFolderInput)}
          className={`${
            folderMenu ? "translate-x-0 pl-5" : "-translate-x-full pl-3"
          } -ml-1 pr-4 py-2 text-sm bg-[#222] rounded-sm hover:bg-[#666] transition-all`}
        >
          <Plus />
        </button>
      </div>

      {/* New folder input */}
      {newFolderInput && (
        <form
          onSubmit={createFolder}
          className="flex justify-between gap-2 mb-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-white/10 py-4 px-4 w-full outline-none focus:bg-white/20"
            type="text"
            placeholder={text.addFolder[userLanguage]}
          />
          <button className="bg-my-yellow p-4 text-gray-800 hover:brightness-105 transition-all">
            <Plus />
          </button>
        </form>
      )}

      {/* Todo input */}
      {!folderMenu && (
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
      )}

      {folderMenu ? (
        <>
          {folders
            .sort((a, b) => (a.date < b.date) - (a.date > b.date))
            .map((folder) => (
              <Folder key={folder.date} folder={folder} />
            ))}
        </>
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

      {folderMenu || todos.length < 1 ? null : (
        <p className="text-center pt-4">
          {text.todosLength[userLanguage]} {todos.length}
        </p>
      )}
    </div>
  );
}

function Folder({ folder }) {
  return (
    <Link
      className="w-full mb-1 p-4 bg-my-yellow flex items-center gap-4 group hover:bg-my-yellow/90 transition-all text-gray-800 font-semibold"
      to={`/account/folder/${folder.id}`}
    >
      <FolderIcon />
      <span className="group-hover:translate-x-1 transition-all">
        {folder.title}
      </span>
    </Link>
  );
}
