const mongoose = require("mongoose");
require('dotenv').config();

const dev = process.env.MODE;

if (!dev) {
    mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to production database.")
} else {
    mongoose.connect("mongodb://127.0.0.1:27017/date-planner")
    console.log("Connected to development database.")
}

module.exports = mongoose.connection;