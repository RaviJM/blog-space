// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: `No JWT token, authorization denied` });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // appending the req with decoded information about the user (username, email)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: `Token Invalid` });
  }
};

module.exports = authMiddleware;
