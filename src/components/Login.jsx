import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
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
      setError(e.message);
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

  return (
    <div className="formWrapper layout p-10">
      <h1 className="text-2xl py-2">Login</h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="py-2">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 p-2"
            type="email"
          />
        </div>
        <div className="flex flex-col">
          <label className="py-2">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 p-2"
            type="password"
          />
        </div>
        <button className="bg-[#6146C1] w-full p-2 mt-4 text-white">
          Login
        </button>
        <p className="mt-4 text-xs text-right">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-[#D8D35E]">
            Register
          </Link>
        </p>
      </form>

      <div className="mt-8 text-center border-t border-gray-600">
        <button
          onClick={handleLoginWithGoogle}
          type="button"
          className="mt-8 inline-flex text-white bg-blue-600 hover:bg-blue-500 focus:outline-none font-medium text-sm px-5 py-2.5 text-center items-center transition-all rounded-sm"
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
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
