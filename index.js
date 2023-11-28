const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv")
dotenv.config()

const PORT = 3000
const app = express()


app.listen(PORT, () => { console.log('app listening on PORT', PORT) })

app.get('/news', async (req, res) => {
    try {
        const result = await fetch(`https://newsapi.org/v2/everything?q=tech&apiKey=${process.env.NEWS_API_KEY}`, {
            method: 'GET',
            header: {
                "content-type": "application/json"
            }
        })

        console.log(result)
        const data = await result.json()
        // console.log(data)

        res.status(200).json(data)
    }
    catch (ex) {
        res.status(500).json({ message: "unable to fetch data from newsapi.org" })
    }
})