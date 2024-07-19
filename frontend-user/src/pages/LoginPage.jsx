// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://blog-space-backend-0s0v.onrender.com/user/login",
        form
      );

      //   save the JWT token from res.data into local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      //   redirect to HomePage
      navigate("/homepage");
    } catch (error) {
      console.error("Login failed:", error);
      setForm({ ...form, password: "" });
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-20">Blog-Space - User Portal</h1>
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-xs"
      >
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="mb-4 p-2 w-full border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="mb-4 p-2 w-full border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <p className="mt-4">
        New user?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </p>
      <p>Or</p>
      <p>
        Visit as Guest?{" "}
        <Link to="/homepage" className="text-blue-500 hover:underline">
          Guest
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
