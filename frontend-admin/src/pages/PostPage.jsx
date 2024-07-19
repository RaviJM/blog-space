// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Comments from "../components/comments/Comments";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const stateType = "update"; //used for update post button

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
        `https://blog-space-backend-0s0v.onrender.com/posts/deletePost/${postId}`,
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
          `https://blog-space-backend-0s0v.onrender.com/posts/${postId}`
        );
        setPost(response.data);
        setIsLoading(false);

        // set likesArray
        if (post) {
          const likesObject = post.likes;
          const likesArray = Object.keys(likesObject);
          setLikesArray(likesArray);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId, likesArray, post]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-grow items-center justify-center bg-gray-100 p-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          post && (
            <div className="max-w-2xl w-full bg-white p-6 rounded-lg shodow-lg">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleDeletePost}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete Post
                </button>
                <button
                  onClick={handleUpdatePost}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Update Post
                </button>
              </div>
              <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <p className="text-sm text-gray-500">{post.createdAt}</p>
              <p className="text-sm text-gray-500">{post.updatedAt}</p>
              <p className="text-sm text-gray-500 mt-2">
                Likes: {likesArray.length}
              </p>
              <Comments postId={postId} />
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
