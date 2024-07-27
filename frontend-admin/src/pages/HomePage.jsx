// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/postCard/PostCard";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const stateType = "create"; //used for create post button

  // get userId and token of admin
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchPosts() {
      const res = await axios.get(
        `http://localhost:3000/posts/admin/${userId}`
      );
      // console.log(res.data.posts);
      setPosts(res.data.posts);
      setIsLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100 p-4">
        <div className="self-end">
          <Link to="/homepage/createPost" state={stateType}>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mb-6">
              Create Post
            </button>
          </Link>
        </div>

        {isLoading && <p>Loading...</p>}

        {posts && (
          <div>
            {posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
