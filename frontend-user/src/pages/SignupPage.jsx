// src/pages/SignupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setForm({ password: "", confirmPassword: "" });
      return alert("Passwords do not match");
    }
    try {
      const res = await axios.post("http://localhost:3000/user/signup", form);

      if (res.status === 201) {
        alert("Signup Successful");
        // redirecting to login page
        navigate("/login");
      } else {
        alert("User already exists! Try another username");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("User already exists! Try another username");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-20">Blog-Space - User Portal</h1>
      <h1 className="text-3xl font-bold mb-10">Signup</h1>
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
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
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
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="mb-4 p-2 w-full border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Signup
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
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

export default SignupPage;
