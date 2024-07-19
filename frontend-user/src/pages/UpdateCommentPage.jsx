// src/pages/UpdateCommentPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

// /comments/updateComment

function UpdateCommentPage() {
  const [comment, setComment] = useState("");
  const location = useLocation();
  const commentId = location.state.commentId;
  const prevComment = location.state.comment;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const content = comment;

      if (!userId) {
        navigate("/login");
        return;
      }
      const res = await axios.put(
        `https://blog-space-backend-0s0v.onrender.com/comments/updateComment/${commentId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        const postId = res.data.postId;
        alert("Comment Updated");
        navigate(`/posts/${postId}`);
        return;
      }
    } catch (err) {
      console.log(`An error occurred while updating comment: ${err}`);
    }
  }

  useEffect(() => {
    function fetchExistingComment() {
      setComment(prevComment);
    }
    fetchExistingComment();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Update Comment Page</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Comment
            </label>

            <input
              name="comment"
              id="comment"
              onChange={handleOnChange}
              value={comment}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateCommentPage;
