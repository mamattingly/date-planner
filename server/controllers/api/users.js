const { User } = require("../../models");
const router = require("express").Router();
const authMiddleware = require("../../utils/auth");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "No user with that username!" });
    }

    const validPassword = await user.checkPassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect password!" });
    }
    const token = authMiddleware.signToken(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res) => {
  req.status(200).json({ message: "You are now logged out!" });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    const token = authMiddleware.signToken(user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

module.exports = router;
