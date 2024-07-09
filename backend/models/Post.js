// /models/Post.js
const User = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: { type: Map, of: Boolean, default: {} },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

postSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

postSchema.virtual("justId").get(function () {
  return `${this._id}`;
});

module.exports = mongoose.model("Posts", postSchema);
