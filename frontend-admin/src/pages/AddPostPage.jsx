// src/pages/AddPostPage.jsx

// This page is used for both: Adding and Updating a post
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/postCard/PostCard";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddPostPage = () => {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const stateType = location.state;

  // used to fill the form in case of 'update' request
  useEffect(() => {
    if (stateType !== "create") {
      // perform update operation
      setForm({ title: stateType.title, content: stateType.content });
    }
  }, []);

  function handleOnChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // used for both adding or updating post
  async function handleAddPost(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      // if they aren't logged in
      navigate("/login");
      return;
    }

    // handle post creation
    if (stateType === "create") {
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

    // handle post updation
    else {
      let formToSubmit = {};
      formToSubmit.title = form.title;
      formToSubmit.content = form.content;

      const postId = stateType.postId;

      const res = await axios.put(
        `http://localhost:3000/posts/updatePost/${postId}`,
        formToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // clear fields and redirect to that PostPage
      if (res.status === 200) {
        setForm({ title: "", content: "" });

        navigate(`/posts/${postId}`);
        alert("Post Updated Successfully");
        return;
      } else {
        alert("An error occurred while updating the post");
        return;
      }
    }
  }

  return (
    <div>
      <Navbar />

      {stateType === "create" ? (
        <h1>Create Post Page</h1>
      ) : (
        <h1>Update Post Page</h1>
      )}

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
        {stateType === "create" ? (
          <button type="submit">Add Post</button>
        ) : (
          <button type="submit">Update Post</button>
        )}
      </form>

      <Footer />
    </div>
  );
};

export default AddPostPage;
