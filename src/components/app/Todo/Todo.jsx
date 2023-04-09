import React from "react";
import styles from "./Todo.module.scss";

export default function Todo({ todo, toggleComplete, deleteTodo }) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <li
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: "spring", bounce: 0.4, duration: 1 }}
      className={todo.completed ? styles.liComplete : styles.li}
    >
      <div className={styles.row} onClick={() => toggleComplete(todo)}>
        <input
          id="checkbox"
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          className="hidden"
        />
        <label htmlFor="checkbox">
          {todo.completed ? <Check /> : <Uncheck />}
        </label>
        <p className={todo.completed ? styles.textComplete : styles.text}>
          {todo.text}
          {/* {new Date(todo.date).toLocaleDateString() */}
        </p>
      </div>
      <button
        className={todo.completed ? styles.buttonComplete : styles.button}
        onClick={() => deleteTodo(todo.id)}
      >
        {<Trash />}
      </button>
    </li>
  );
}

function Check() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
      <path
        fill="#666"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16Z"
      />
      <defs>
        <path fill="#fff" d="M0 0h24v24H0z" />
      </defs>
    </svg>
  );
}

function Uncheck() {
  return (
    <svg
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
    >
      <path
        stroke="#ccc"
        d="M12 21.5A9.5 9.5 0 0 1 2.5 12 9.5 9.5 0 0 1 12 2.5a9.5 9.5 0 0 1 9.5 9.5 9.5 9.5 0 0 1-9.5 9.5Z"
      />
      <defs>
        <path fill="#fff" d="M0 0h24v24H0z" />
      </defs>
    </svg>
  );
}

function Trash() {
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
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}
