// src/components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const likesObject = post.likes;
  const likesArray = Object.keys(likesObject);
  const noOfLikes = likesArray.length;

  return (
    <Link to={`/posts/${[post._id]}`}>
      <button style={{ border: "solid black" }}>
        <h3>{post.title}</h3>
        <p>{post.createdAt}</p>
        <p>By {post.author.username}</p>
        <p>{post.author.email}</p>
        <p>Likes: {noOfLikes}</p>
      </button>
    </Link>
  );
};

export default PostCard;
