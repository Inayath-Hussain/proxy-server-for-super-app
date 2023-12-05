import express, { Request } from "express";
import nodeFetch from "node-fetch";
import env from "../env";

const router = express.Router();

interface IReqParam { }
interface IResBody { }
interface IReqBody { }
interface IReqQuery {
    pageNumber?: number
}

type IRequest = Request<IReqParam, IResBody, IReqBody, IReqQuery>

router.get('/', async (req: IRequest, res) => {

    const news_api_key = env.newsApiKey

    if (!news_api_key) {
        console.log('News API Key is empty')
        return res.status(500).json({ message: "Internal Server Error. Check Server logs" })
    }

    const pageSize = 50
    const pageNumber = req.query.pageNumber || 1

    try {
        const result = await nodeFetch(`https://newsapi.org/v2/everything?q=tech&apiKey=${news_api_key}&page=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET'
        })

        if (!result.ok) {
            throw Error(`status code - ${result.status}; statusText - ${result.statusText}`)
        }

        const data = await result.json()

        return res.status(200).json(data)
    }
    catch (ex) {
        console.log('news endpoint error...', ex)
        return res.status(500).json({ message: "Unable to fetch data from newsapi.org" })
    }
})


export default router;