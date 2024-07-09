// routes/commentRouter.js
const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

commentRouter.get("/:postId", commentController.getCommentsOfPost);

commentRouter.post(
  "/createComment/:postId",
  authMiddleware,
  commentController.createComment
);

commentRouter.put(
  "/updateComment/:commentId",
  authMiddleware,
  commentController.updateComment
);

commentRouter.delete(
  "/deleteComment/:commentId",
  authMiddleware,
  commentController.deleteComment
);

module.exports = commentRouter;
