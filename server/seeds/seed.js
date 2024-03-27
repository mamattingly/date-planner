const Place = require('../models/Place');
const data = require('./data.json');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    try {
        await Place.deleteMany({});
        await Place.insertMany(data);
        console.log(`Data successfully seeded to database.`);
        await mongoose.connection.close();
        console.log(`Connection closed to database.`)
    } catch (err) {
        console.error(err);
    }
});