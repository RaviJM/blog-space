// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/postCard/PostCard";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get("/api/posts");
  //       setPosts(response.data.posts);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div>
      <Navbar />
      <h2>Home</h2>
      {/* <div>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div> */}
      <Footer />
    </div>
  );
};

export default HomePage;
