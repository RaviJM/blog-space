// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`);
        setPost(response.data);
        const commentsResponse = await axios.get(`/api/comments/${postId}`);
        setComments(commentsResponse.data.allComments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      await axios.put(`/api/posts/likePost/${postId}`, { username: "user" }); // Replace 'user' with actual username
      setPost({ ...post, likes: !post.likes });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/comments/createComment/${postId}`,
        { content: comment }
      );
      setComments(response.data.allComments);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return post ? (
    <div>
      <Navbar />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{post.createdAt}</p>
      <p>{post.updatedAt}</p>
      <button onClick={handleLike}>Like</button>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Submit</button>
        </form>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
            <p>By {comment.userId.username}</p>
            {/* Add buttons for edit and delete if the comment belongs to the user */}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostPage;
