const express = require('express')
const flight = require('../model/flight')

const router = express.Router()

const flightsdata = require('../data.json')

router.post('/flights', async (req, res) => {
    try {
        for (const flightdata of flightsdata) {
            const create_flight = new flight({
                source: flightdata.source,
                destination: flightdata.destination,
                airline: flightdata.airline,
                price: flightdata.price
            })
            await create_flight.save()
        }
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})

router.post('/flight', async (req, res) => {
    const newFlight = new flight(req.body)
    try {
        const saveFlight = await newFlight.save()
        res.status(201).json(saveFlight)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.get('/flights', async (req, res) => {
    const { source, destination } = req.query
    if (!source || !destination) {
        return res.status(400).json({ error: 'Please provide both source and destination parameters.' });
    }
    try {
        const matchedFlights = await flight.find({ source: source, destination: destination })
        return res.status(200).json(matchedFlights)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router