// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/postCard/PostCard";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  function handleOnChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAddPost(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      // if they aren't logged in
      navigate("/login");
      return;
    }

    let formToSubmit = {};
    formToSubmit.title = form.title;
    formToSubmit.content = form.content;
    formToSubmit.author = userId;

    const res = await axios.post(
      "http://localhost:3000/posts/createPost",
      formToSubmit,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // clear fields and redirect to HomePage
    if (res.status === 201) {
      setForm({ title: "", content: "" });
      navigate("/homepage");
      alert("Post Created Successfully");
      return;
    } else {
      alert("An error occurred while creating the post");
      return;
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Create Post Page</h1>

      <form onSubmit={handleAddPost}>
        <label htmlFor="title">Post Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleOnChange}
          required
        ></input>
        <br></br>
        <label htmlFor="content">Post Content: </label>
        <textarea
          type="text"
          id="content"
          name="content"
          value={form.content}
          onChange={handleOnChange}
          required
        ></textarea>
        <br></br>
        <button type="submit">Add Post</button>
      </form>
      <div className="posts-container"></div>
      <Footer />
    </div>
  );
};

export default AddPostPage;
