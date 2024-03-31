const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = {
  checkAuth: function ({ req, res, next}) {
    let token = req.headers.authorization || "";

    if (token) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.exp <= Math.floor(Date.now() / 1000)) {
        res.status(401).json({ message: "Token expired" });
      }

      req.user = decoded;
      next();
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRATION,
    });
  },
};
