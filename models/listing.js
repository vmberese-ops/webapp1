const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;