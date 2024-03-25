const Place = require('../models/Place');
const data = require('./data.json');
const db = require('../config/connection');
require('dotenv').config();

db.once('open', async () => {
    try {
        const mode = process.env.MODE !== 'dev' ? 'production' : 'development'
        await Place.deleteMany({});
        await Place.insertMany(data);
        console.log(`Data successfully seeded to ${mode} database.`);
        await db.close();
        console.log(`Connection closed to ${mode} database.`)
    } catch (err) {
        console.error(err);
    }
});