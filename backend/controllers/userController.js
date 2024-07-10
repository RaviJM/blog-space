// controllers/userController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // checking if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: `Username already exists` });
    }

    // create a new user
    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: `User registered successfully` });
  } catch (err) {
    res.status(500).json({ message: `Error during signup: ${err.message}` });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: `Invalid Credentials` });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Credentials` });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET_KEY
    );

    // send it in response
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: `Error during login: ${err.message}` });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  return res.status(200).json({ message: `Logged out successfully` });
  // we still have to remove the token from the local storage of frontend
};

exports.getUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.params.userId });

    if (userDetails) {
      return res.status(200).json({ userDetails: userDetails });
    }
    return res.status(400).json({ message: "User not found" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching user details: ${err.message}` });
  }
};
