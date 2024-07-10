// src/components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div>
      <Link to={`/posts/${post._id}`}>
        <h3>{post.title}</h3>
        <p>{post.createdAt}</p>
        <p>By {post.author.username}</p>
      </Link>
    </div>
  );
};

export default PostCard;
