const express = require("express");
const router = express.Router();
const placesRoutes = require("./api/places");
const usersRoutes = require("./api/users");

router.use("/api/places", placesRoutes);
router.use("/api/users", usersRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

module.exports = router;