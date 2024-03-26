const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const router = require("./controllers/index.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(router);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`starting on port ${PORT}`);
  app.listen(PORT);
});
