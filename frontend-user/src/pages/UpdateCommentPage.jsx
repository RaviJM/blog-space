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
        `http://localhost:3000/comments/updateComment/${commentId}`,
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
    <div>
      <Navbar />
      <h1>Update Comment Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="comment"
          id="comment"
          onChange={handleOnChange}
          value={comment}
        ></input>
        <button type="submit">Update</button>
      </form>
      <Footer />
    </div>
  );
}

export default UpdateCommentPage;
