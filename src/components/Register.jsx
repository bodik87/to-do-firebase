import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Register = () => {
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
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="formWrapper layout p-10">
      <h1 className="text-2xl py-2">Register</h1>
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
          Register
        </button>
        <p className="mt-4 text-xs text-right">
          Already have an account yet?{" "}
          <Link to="/" className="text-[#D8D35E]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
