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
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p>Or</p>
      <p>
        Visit as Guest? <Link to="/homepage">Guest</Link>
      </p>
    </div>
  );
};

export default SignupPage;
