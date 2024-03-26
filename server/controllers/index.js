const express = require("express");
const router = express.Router();
const placesRoutes = require("./api/places");
const usersRoutes = require("./api/users");

router.use("/api/places", placesRoutes);
router.use("/api/users", usersRoutes);

module.exports = router;