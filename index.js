const express = require("express");
const nodeFetch = require("node-fetch");
const dotenv = require("dotenv")
dotenv.config()

const PORT = 3000
const app = express()


app.listen(PORT, () => { console.log('app listening on PORT', PORT) })

app.get('/news', async (req, res) => {
    try {
        const result = await nodeFetch(`https://newsapi.org/v2/everything?q=tech&apiKey=${process.env.NEWS_API_KEY}`, {
            method: 'GET'
        })

        const data = await result.json()

        res.status(200).json(data)
    }
    catch (ex) {
        res.status(500).json({ message: "unable to fetch data from newsapi.org" })
    }
})

app.get('/weather', async (req, res) => {
    const location = req.query.location || 'kurnool';

    const weather_api_key = process.env.WEATHER_API_KEY;

    if (!weather_api_key) {
        console.log('weather_api_key is empty')
        return res.status(500).json({ message: "Internal Server Error. Check server logs" })
    }

    try {
        const result = await nodeFetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no`, {
            method: 'GET'
        })

        const data = await result.json()

        return res.status(200).json({ data })
    }
    catch (ex) {
        console.log('weather endpoint error...', ex)
        return res.status(500).json({ message: "Internal Server Error. Check server logs" })
    }
})