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

      // check if the person has a creater account or not by fetching their details(if not, that means they are just a user, not author, so deny access)
      // get the person's details
      const userId = localStorage.getItem("userId");
      axios
        .get(`https://blog-space-backend-0s0v.onrender.com/user/${userId}`)
        .then((response) => {
          const role = response.data.userDetails.role;
          if (role === "user") {
            // deny access
            // delete JWT token from local storage
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            alert("You do not have an Admin account!");

            // clear username and password fields
            setForm({ username: "", password: "" });
            return;
          } else {
            // allow login
            //   redirect to HomePage
            navigate("/homepage");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user info", error);
        });
    } catch (error) {
      console.error("Something went wrong:", error);
      setForm({ ...form, password: "" });
      alert("Invalid Credentials or Server down");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-20">Blog-Space - Creator Portal</h1>
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        className="flex flex-col items-center w-full max-w-xs"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="mb-4 p-2 w-full border border-gray-300 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-4 p-2 w-full border border-gray-300 rounded-md"
          required
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          type="submit"
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
    </div>
  );
};

export default LoginPage;
