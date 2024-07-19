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
        "https://blog-space-backend-0s0v.onrender.com/posts/createPost",
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
        `https://blog-space-backend-0s0v.onrender.com/posts/updatePost/${postId}`,
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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col flex-grow items-center justify-center bg-gray-100 p-8">
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {stateType === "create" ? "Create Post" : "Update Post"}
          </h1>

          <form onSubmit={handleAddPost} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-lg font-medium">
                Post Title:{" "}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleOnChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></input>
            </div>

            <div>
              <label htmlFor="content" className="block text-lg font-medium">
                Post Content:{" "}
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                value={form.content}
                onChange={handleOnChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {stateType === "create" ? "Add Post" : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddPostPage;
