// /models/Comment.js
const Post = require("./Post");
const User = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

commentSchema.virtual("url").get(function () {
  return `/comments/${this._id}`;
});

commentSchema.virtual("justId").get(function () {
  return `${this._id}`;
});

module.exports = mongoose.model("Comment", commentSchema);
