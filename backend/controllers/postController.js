// controllers/postController.js
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

// sends all posts [not comments]
exports.getAllPosts = async (req, res) => {
  try {
    //replace the author field's value with the username of the user [because the author is a user afterall]
    // and then selects specific fields
    const posts = await Post.find()
      .populate("author", "username")
      .select("title content createdAt likes");

    res.status(200).json({ posts });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while getting posts: ${err.message} ` });
  }
};

// sends specific post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "author",
      "username"
    );

    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while getting post: ${err.message} ` });
  }
};

// sends all posts (with new created post in it)
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    authorId = req.user.userId;

    const newPost = new Post({
      title,
      content,
      author: authorId,
    });

    await newPost.save();

    const allPosts = await Post.find();

    res.status(201).json({ allPosts });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while creating post: ${err.message} ` });
  }
};

// sends updated post
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { title, content, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate("author", "username");

    res.status(200).json(updatedPost);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while updating post: ${err.message} ` });
  }
};

// sends a message that post is deleted successfully
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // delete associated comments
    await Comment.deleteMany({ postId: postId });

    res.status(200).json({ message: "Post deleted Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while deleting post: ${err.message} ` });
  }
};

// sends message Post Liked
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { username } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.get(username)) {
      post.likes.delete(username); //remove like if already liked
    } else {
      post.likes.set(username, true); //add like if not already liked
    }

    // save the updated Post with modified likes field
    await post.save();

    res.status(200).json({ message: "Post Liked" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while adding like to post: ${err.message}` });
  }
};
