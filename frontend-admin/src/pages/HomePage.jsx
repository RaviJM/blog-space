// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/postCard/PostCard";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get("http://localhost:3000/posts");
      // console.log(res.data.posts);
      setPosts(res.data.posts);
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Home Page</h2>
      <Link to="/homepage/createPost">
        <button>Create Post</button>
      </Link>

      <div className="posts-container">
        {posts.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
