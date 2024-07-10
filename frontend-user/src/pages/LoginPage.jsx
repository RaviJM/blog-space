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
      const res = await axios.post("http://localhost:3000/user/login", form);

      //   save the JWT token from res.data into local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      console.log("Login success:", res.data);

      //   redirect to HomePage
      navigate("/homepage");
    } catch (error) {
      console.error("Login failed:", error);
      setForm({ ...form, password: "" });
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/signup">Signup</Link>
      </p>
      <p>Or</p>
      <p>
        Visit as Guest? <Link to="/homepage">Guest</Link>
      </p>
    </div>
  );
};

export default LoginPage;
