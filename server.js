const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

const connectDB = require('./config/db')
connectDB()

const cors = require('cors')


const route = require('./route/flight')


const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', route)

app.listen(PORT, () => {
    console.log('server is running on', PORT)
})

