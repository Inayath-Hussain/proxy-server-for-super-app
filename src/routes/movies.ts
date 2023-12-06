import exress, { Request, Response } from "express";
import nodeFetch from "node-fetch"
import env from "../env";

const router = exress.Router()

interface IReqParam { }
interface IResBody { }
interface IReqBody { }
interface IReqQuery {
    genres: string
}

type IRequest = Request<IReqParam, IResBody, IReqBody, IReqQuery>

router.get("/", async (req: IRequest, res) => {
    const genres = req.query.genres

    if (genres === "") return res.status(400).json({ message: "Genres Required" })

    if (!env.moviesApiKey) {
        console.log("moviesApiKey is undefined or empty")
        return res.status(500).json({ message: "Internal Server Error" })
    }

    if (!env.moviesAuthToken) {
        console.log("moviesAuthToken is undefined or empty");
        return res.status(500).json({ message: "Internal Server Error" })
    }

    try {
        const result = await nodeFetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genres}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "Authorization": `Bearer ${env.moviesAuthToken}`
            }
        })

        if (!result.ok) {
            throw Error(`status code - ${result.status}; statusText - ${result.statusText}`)
        }

        const data = await result.json()

        return res.status(200).json(data)

    } catch (ex) {
        console.log("movies endpoint error...", ex);
        return res.status(500).json({ message: "Internal Server Error" })
    }
})

export default router;