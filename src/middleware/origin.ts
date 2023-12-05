import { Request, Response, NextFunction } from "express"
import { corsOptions } from "../cors"

export const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
    const requestOrigin = req.get('Origin')

    if (requestOrigin === undefined) {
        return res.status(400).json({ message: "missing Origin in header" })
    }
    console.log(requestOrigin)

    // when server is running locally
    if (corsOptions.origin instanceof RegExp) {
        if (corsOptions.origin.test(requestOrigin)) {
            return next();
        }
    }
    else {

        // when server is deployed
        if (Array.isArray(corsOptions.origin) && corsOptions.origin.some(o => o === requestOrigin)) {
            return next();
        }
    }

    return res.status(401).json({ message: "Unauthorized" })
}