// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const stateType = "update"; //used for update post button

  // const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);

  const [likesArray, setLikesArray] = useState([]);

  const navigate = useNavigate();

  async function handleDeletePost() {
    // for authorization purposes
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      // if they aren't logged in
      navigate("/login");
      return;
    }

    const cnf = confirm("Are you sure you want to delete the post?");
    if (cnf) {
      const res = await axios.delete(
        `http://localhost:3000/posts/deletePost/${postId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 404) {
        alert("Post not found!");
      } else if (res.status === 500) {
        alert("Error deleting post!");
      } else {
        alert("Post Deleted Successfully");
        navigate("/homepage");
      }
    }
    return;
  }

  async function handleUpdatePost() {
    navigate("/homepage/createPost", {
      state: {
        stateType: stateType,
        title: post.title,
        content: post.content,
        postId: postId,
      },
    });
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/${postId}`
        );
        setPost(response.data);
        setIsLoading(false);

        // set likesArray
        if (post) {
          const likesObject = post.likes;
          const likesArray = Object.keys(likesObject);
          setLikesArray(likesArray);
        }

        // const commentsResponse = await axios.get(`/api/comments/${postId}`);
        // setComments(commentsResponse.data.allComments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId, likesArray, post]);

  // const handleLike = async () => {
  //   try {
  //     await axios.put(`/api/posts/likePost/${postId}`, { username: "user" }); // Replace 'user' with actual username
  //     setPost({ ...post, likes: !post.likes });
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       `/api/comments/createComment/${postId}`,
  //       { content: comment }
  //     );
  //     setComments(response.data.allComments);
  //     setComment("");
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  return (
    <div>
      <Navbar />

      {isLoading && <p>Loading...</p>}
      {post && (
        <div>
          <button onClick={handleDeletePost}>Delete Post</button>
          <button onClick={handleUpdatePost}>Update Post</button>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.createdAt}</p>
          <p>{post.updatedAt}</p>
          <p>Likes: {likesArray.length}</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PostPage;
