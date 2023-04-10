import React from "react";
import { CurrentLanguage } from "../context/LangContext";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { text } from "../assets/lang";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Button from "../components/UI/Button";

export default function TodoPage() {
  const { userLanguage } = CurrentLanguage();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const { id } = useParams();

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "todos", id));
    navigate(-1);
  };

  return (
    <>
      <h2>{"Todo"}</h2>
      <div className="mt-4">
        <Button
          onClick={deleteTodo}
          textColor="text-black"
          variant="secondary"
          bg={"bg-red-400"}
        >
          {text.deleteTodo[userLanguage]}
        </Button>
      </div>
    </>
  );
}
