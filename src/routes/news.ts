import express from "express";
import nodeFetch from "node-fetch";

const router = express.Router();

router.get('/', async (req, res) => {

    const news_api_key = process.env.NEWS_API_KEY

    if (!news_api_key) {
        console.log('News API Key is empty')
        return res.status(500).json({ message: "Internal Server Error. Check Server logs" })
    }

    try {
        const result = await nodeFetch(`https://newsapi.org/v2/everything?q=tech&apiKey=${news_api_key}`, {
            method: 'GET'
        })

        const data = await result.json()

        res.status(200).json(data)
    }
    catch (ex) {
        console.log('news endpoint error...', ex)
        res.status(500).json({ message: "Unable to fetch data from newsapi.org" })
    }
})


export default router;