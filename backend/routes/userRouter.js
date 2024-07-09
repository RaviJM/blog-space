// routes/userRouter.js
const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

commentRouter.post("/signup", userController.signup);
commentRouter.post("/login", userController.login);
commentRouter.post("/logout", userController.logout);

module.exports = userRouter;
