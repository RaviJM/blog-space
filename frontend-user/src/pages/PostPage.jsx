// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Comments from "../components/comments/Comments";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likesArray, setLikesArray] = useState([]);
  const [likeAction, setLikeAction] = useState("removed");
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        // send them to login page
        navigate("/login");
        return;
      }

      const res0 = await axios.get(`http://localhost:3000/user/${userId}`);
      const username = res0.data.userDetails.username;

      const res = await axios.put(
        `http://localhost:3000/posts/likePost/${postId}`,
        { username: username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const action = res.data.action;
      const likesObject = res.data.likes;

      const likesArray = Object.keys(likesObject);
      setLikesArray(likesArray);

      setLikeAction(action);
    } catch (err) {
      console.log(`An error occurred while liking post: ${err}`);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/${postId}`
        );
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post) {
      const likesObject = post.likes;
      const likesArray = Object.keys(likesObject);
      setLikesArray(likesArray);

      const userId = localStorage.getItem("userId");
      const fetchUser = async () => {
        try {
          const res0 = await axios.get(`http://localhost:3000/user/${userId}`);
          const username = res0.data.userDetails.username;

          if (username in likesObject) {
            setLikeAction("added");
          } else {
            setLikeAction("removed");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      if (userId) {
        fetchUser();
      }
    }
  }, [post]);

  return (
    <div>
      <Navbar />

      {isLoading && <p>Loading...</p>}
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.createdAt}</p>
          <p>{post.updatedAt}</p>

          <div>
            <button onClick={handleLike}>
              {likeAction === "removed" ? (
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 122.88"
                  height={"2.4rem"}
                >
                  <title>Like Button</title>
                  <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0ZM35,54.09h9.64a2,2,0,0,1,2,2V82.5a2,2,0,0,1-2,2H35a2,2,0,0,1-2-2V56.08a2,2,0,0,1,2-2ZM60.3,34.28C61.35,29,70,33.86,70.61,42.41a36.58,36.58,0,0,1-.74,9.07H82.29c5.16.2,9.67,3.9,6.49,10,.72,2.65.83,5.75-1.14,7,.25,4.17-.91,6.76-3.07,8.8A10.53,10.53,0,0,1,83,82.61C81.31,85,80,84.4,77.33,84.4h-21c-3.32,0-5.14-.91-7.31-3.64V57.41c6.25-1.69,9.58-10.24,11.25-15.86V34.28Zm37-8.7a50.72,50.72,0,1,0,14.85,35.86A50.59,50.59,0,0,0,97.3,25.58Z" />
                </svg>
              ) : (
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 122.88"
                  height={"2.4rem"}
                >
                  <defs>
                    <style>{`
                      .cls-1 { fill: #33a867; }
                      .cls-1, .cls-2 { fill-rule:evenodd; }
                      .cls-2 { fill:#fff; }
                    `}</style>
                  </defs>
                  <title>Like Button</title>
                  <path
                    className="cls-1"
                    d="M61.44,0A61.44,61.44,0,1,1,0,61.44,61.44,61.44,0,0,1,61.44,0Z"
                  />
                  <path
                    className="cls-2"
                    d="M32.5,53.39H43.06a2.18,2.18,0,0,1,2.17,2.18V84.52a2.19,2.19,0,0,1-2.17,2.18H32.5a2.19,2.19,0,0,1-2.18-2.18V55.57a2.19,2.19,0,0,1,2.18-2.18ZM60.2,31.68c1.14-5.82,10.66-.46,11.29,8.91a40.41,40.41,0,0,1-.81,9.93H84.29c5.65.23,10.59,4.28,7.1,10.93.8,2.9.92,6.3-1.24,7.65.27,4.57-1,7.41-3.37,9.65A11.42,11.42,0,0,1,85,84.63c-1.83,2.58-3.31,2-6.19,2h-23c-3.64,0-5.62-1-8-4V57C54.72,55.17,58.36,45.8,60.2,39.65v-8Z"
                  />
                </svg>
              )}

              {likesArray.length}
            </button>
          </div>

          <Comments postId={postId} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PostPage;
