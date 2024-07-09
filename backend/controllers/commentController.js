// controllers/commentController.js
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// sends all comments for the post (updated with the added one)
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId;
    const postId = req.params.postId;

    const newComment = new Comment({
      postId,
      userId,
      content,
    });

    await newComment.save();

    // add the comment to the array of Post's comment field
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    const allComments = await Comment.find({ postId: postId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(201).json({ allComments });
  } catch (err) {
    res.status(500).json({ message: "Error while creating a comment" });
  }
};

// sends all comments after updating the comment
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { content } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // find the postId from the comment (so that you can fetch all comments for that postId)
    const postId = updatedComment.postId;

    const allComments = await Comment.find({ postId: postId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ allComments });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while updating the comment: ${err.message} ` });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: `Comment not found` });
    }

    //remove the comment from the post's comment array
    await Post.findByIdAndUpdate(deletedComment.postId, {
      $pull: { comments: commentId },
    });

    const allComments = await Comment.find({ postId: deletedComment.postId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ allComments });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while deleting the comment: ${err.message}` });
  }
};

// sends all comments of a post
exports.getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const allComments = await Comment.find({ postId: postId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ allComments });
  } catch (err) {
    res.status(404).json({ message: `No Comments found: ${err.message}` });
  }
};
