import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { CurrentLanguage } from "../../context/LangContext";
import LanguageToogle from "../../components/UI/LanguageToogle";
import { authTexts } from "./auth-lang";
import Logo from "../../components/UI/Icons/Logo";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      navigate("/account");
    } catch (e) {
      if (
        e.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError(authTexts.invalidPassword[userLanguage]);
      }
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        setError(authTexts.alreadyRegistered[userLanguage]);
      } else {
        setError(e.message);
      }
      console.log(e.message);
    }
  };

  const { userLanguage } = CurrentLanguage();

  return (
    <div className="absolute top-0 left-0 right-0 mx-auto bg-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] rounded-md p-10 w-[350px] my-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="font-bold text-xl">Todo</h1>
        </div>
        <LanguageToogle />
      </div>

      <h1 className="text-2xl mt-8 text-center">
        {authTexts.register[userLanguage]}
      </h1>

      <p className="mt-2 mb-4 text-sm text-red-400">{error}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 bg-white/10"
          type="email"
          placeholder={authTexts.emailPlaceholder[userLanguage]}
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 bg-white/10"
          type="password"
          placeholder={authTexts.password[userLanguage]}
          required
        />

        <button className="bg-my-violet w-full p-2 text-white hover:brightness-110 transition-all">
          {authTexts.register[userLanguage]}
        </button>

        <p className="text-xs text-right">
          {authTexts.isRegistered[userLanguage]}
          <Link to="/" className="text-my-yellow">
            {authTexts.login[userLanguage]}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
