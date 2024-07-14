// routes/userRouter.js
const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/:userId", userController.getUserDetails);

module.exports = userRouter;
