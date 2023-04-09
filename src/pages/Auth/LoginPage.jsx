import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { CurrentLanguage } from "../../context/LangContext";
import LanguageToogle from "../../components/UI/LanguageToogle";
import { authTexts } from "./auth-lang";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, loginWithGoogle } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      if (e.message === "Firebase: Error (auth/user-not-found).") {
        setError(authTexts.noUser[userLanguage]);
      }
      if (e.message === "Firebase: Error (auth/wrong-password).") {
        setError(authTexts.wrongPassword[userLanguage]);
      } else {
        setError(e.message);
      }
      console.log(e.message);
    }
  };

  const handleLoginWithGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const { userLanguage } = CurrentLanguage();

  return (
    <div className="absolute top-0 left-0 right-0 mt-16 mx-auto bg-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] rounded-md p-10 w-[350px]">
      <div className="flex justify-between">
        <h1 className="text-2xl py-2">{authTexts.login[userLanguage]}</h1>
        <LanguageToogle />
      </div>

      <button
        onClick={handleLoginWithGoogle}
        type="button"
        className="w-full mt-6 inline-flex justify-center text-white bg-blue-600 hover:bg-blue-500 focus:outline-none font-medium text-sm px-5 py-2.5 text-center items-center transition-all rounded-sm"
      >
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        {authTexts.withGoogle[userLanguage]}
      </button>

      {/* Form */}
      <div className="mt-8 border-t border-gray-600">
        <p className="font-semibold mt-5">
          {authTexts.withEmail[userLanguage]}
        </p>
        <p className="mt-2 text-sm text-red-400">{error}</p>

        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mt-2 p-2 bg-white/10"
            type="email"
            placeholder={authTexts.emailPlaceholder[userLanguage]}
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mt-2 p-2 bg-white/10"
            type="password"
            placeholder={authTexts.password[userLanguage]}
            required
          />

          <button className="bg-my-violet w-full p-2 mt-3 text-white hover:brightness-110 transition-all">
            {authTexts.login[userLanguage]}
          </button>

          <p className="mt-4 text-xs text-right">
            {authTexts.isUnregistered[userLanguage]}
            <Link to="/register" className="text-my-yellow">
              {authTexts.register[userLanguage]}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
