const express = require('express')
const forecast = require('../utils/forecast')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())

app.get('/', (req, res) => {
    const search = req.query.search;

    if (!search)
            return res.send({error: 'You must provide a location'})
    return forecast(search, (error, place, forecastData) => {
        if (error)
            return res.send({error})
        res.send({place, forecastData})
    })
})

app.listen(port, () => {
    console.log(`The server is starting at port ${port}`)
})
