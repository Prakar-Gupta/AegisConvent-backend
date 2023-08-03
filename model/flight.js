const mongoose = require('mongoose')

const FlightSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const flight = mongoose.model('Flight', FlightSchema)

module.exports = flight