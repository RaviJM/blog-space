// controllers/commentController.js
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// sends newly create comment for the post
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.userId; //provided by authMiddleware
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

    const createdComment = await Comment.findOne({
      postId: postId,
      _id: newComment._id,
    }).populate("userId", "username");

    res.status(201).json({ createdComment });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while creating a comment: ${err.message}` });
  }
};

// sends a successful message and postId (to redirect the person to that post page)
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

    const postId = updatedComment.postId;

    res
      .status(200)
      .json({ message: "Comment Updated Successfully", postId: postId });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error while updating the comment: ${err.message} ` });
  }
};

// just sends successful message (frontend deletion for instantaneous display is handled separately in frontend)
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

    res.status(200).json({ message: "Comment deleted successfully" });
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
