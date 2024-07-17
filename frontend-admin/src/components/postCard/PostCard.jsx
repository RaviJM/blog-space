// src/components/PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const likesObject = post.likes;
  const likesArray = Object.keys(likesObject);
  const noOfLikes = likesArray.length;

  return (
    <Link to={`/posts/${[post._id]}`}>
      <div className="border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4 bg-white">
        <h2 className="text-xl fonr-semibold mb-2">{post.title}</h2>
        <p className="text-gray-500 mb-1">
          Created at: {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-500 mb-1">By: {post.author.username}</p>
        <p className="text-gray-500 mb-1">Email: {post.author.email}</p>
        <p className="text-gray-500 mb-1">Likes: {noOfLikes}</p>
      </div>
    </Link>
  );
};

export default PostCard;
