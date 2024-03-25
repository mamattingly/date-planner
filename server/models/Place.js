const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Category: { type: String, required: true },
    Cost: { type: String, required: true },
    Address: { type: String, required: true },
    Notes: { type: String }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;