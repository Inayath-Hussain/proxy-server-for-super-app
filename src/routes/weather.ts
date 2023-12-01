import express, { Request } from "express";
import nodeFetch from "node-fetch";

const router = express.Router();

interface IReqParam { }
interface IResBody { }
interface IReqBody { }
interface IReqQuery {
    location?: string
}

type IRequest = Request<IReqParam, IResBody, IReqBody, IReqQuery>
router.get('/', async (req: IRequest, res) => {
    const location = req.query.location || 'kurnool';

    const weather_api_key = process.env.WEATHER_API_KEY;

    if (!weather_api_key) {
        console.log('weather_api_key is empty')
        return res.status(500).json({ message: "Internal Server Error. Check server logs" })
    }

    try {
        const result = await nodeFetch(`https://api.weatherapi.com/v1/current.json?key=${weather_api_key}&q=${location}&aqi=no`, {
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


export default router;