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

      // check if the person has a creater account or not by fetching their details(if not, that means they are just a user, not author, so deny access)
      // get the person's details
      const userId = localStorage.getItem("userId");
      axios
        .get(`http://localhost:3000/user/${userId}`)
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
    </div>
  );
};

export default LoginPage;
