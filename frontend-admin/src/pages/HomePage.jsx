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
    console.log("Hey");
  }, [posts]);

  return (
    <div>
      <Navbar />
      <h2>Home Page</h2>
      <Link to="/homepage/createPost">
        <button>Create Post</button>
      </Link>
      <Footer />
    </div>
  );
};

export default HomePage;
