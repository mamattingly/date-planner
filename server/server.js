const express = require("express");
const db = require("./config/connection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(require("./controllers"));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`API URL: http://localhost:${PORT}/api`);
    });
  });
};

startServer();
