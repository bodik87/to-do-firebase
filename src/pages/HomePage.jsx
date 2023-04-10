import React from "react";
import Content from "../components/Content";
import useGetLocation from "../hooks/useGetLocation";
// import Todo from "./Todo/Todo";
// import { db } from "../../../firebase";
// import {
//   query,
//   collection,
//   onSnapshot,
//   updateDoc,
//   doc,
//   addDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { text } from "../../assets/lang";
// import { CurrentLanguage } from "../../context/LangContext";
// import { Link } from "react-router-dom";
// import { UserAuth } from "../../context/AuthContext";
// import FolderIcon from "../UI/Icons/FolderIcon";
// import Plus from "../UI/Icons/Plus";

export default function HomePage() {
  const option = useGetLocation();

  // const [folderMenu, setFolderMenu] = useState(false);
  // const [newFolderInput, setNewFolderInput] = useState(false);

  // const createFolder = async (e) => {
  //   e.preventDefault(e);
  //   if (input === "") {
  //     alert("Please enter a valid folder name");
  //     return;
  //   }
  //   await addDoc(collection(db, "folders"), {
  //     title: input,
  //     owner: user.uid,
  //     date: Date(),
  //   });
  //   setInput("");
  // };

  // const createTodo = async (e) => {
  //   e.preventDefault(e);
  //   if (input === "") {
  //     alert("Please enter a valid todo");
  //     return;
  //   }
  //   await addDoc(collection(db, "todos"), {
  //     text: input,
  //     completed: false,
  //     owner: user.uid,
  //     folderId: "Home",
  //     date: Date(),
  //   });
  //   setInput("");
  // };

  // // Update todo in firebase

  return (
    <Content option={option} />
    // <div className="max-w-lg w-full mt-4 relative">

    //   {newFolderInput && (
    //     <form
    //       onSubmit={createFolder}
    //       className="flex justify-between gap-2 mb-4"
    //     >
    //       <input
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         className="bg-white/10 py-4 px-4 w-full outline-none focus:bg-white/20"
    //         type="text"
    //         placeholder={text.addFolder[userLanguage]}
    //       />
    //       <button className="bg-my-yellow p-4 text-gray-800 hover:brightness-105 transition-all">
    //         <Plus />
    //       </button>
    //     </form>
    //   )}

    //   {folderMenu ? (
    //     <>
    //       {folders
    //         .sort((a, b) => (a.date < b.date) - (a.date > b.date))
    //         .map((folder) => (
    //           <Folder key={folder.date} folder={folder} />
    //         ))}
    //     </>
    //   ) : (
    //     <>
    //       {todos
    //         .sort((a, b) => (a.date < b.date) - (a.date > b.date))
    //         // .reverse()
    //         .map((todo) => (
    //           <Todo
    //             key={todo.id}
    //             todo={todo}
    //             toggleComplete={toggleComplete}
    //             deleteTodo={deleteTodo}
    //           />
    //         ))}
    //     </>
    //   )}

    //   {folderMenu || todos.length < 1 ? null : (
    //     <p className="text-center pt-4">
    //       {text.todosLength[userLanguage]} {todos.length}
    //     </p>
    //   )}
    // </div>
  );
}
