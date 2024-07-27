// routes/postRouter.js
const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

postRouter.get("/", postController.getAllPosts);

postRouter.get("/:postId", postController.getPostById);

postRouter.post("/createPost", authMiddleware, postController.createPost);

postRouter.put(
  "/updatePost/:postId",
  authMiddleware,
  postController.updatePost
);

postRouter.delete(
  "/deletePost/:postId",
  authMiddleware,
  postController.deletePost
);

postRouter.put("/likePost/:postId", authMiddleware, postController.likePost);

postRouter.get("/admin/:userId", postController.getPostOfAdmin);

module.exports = postRouter;
