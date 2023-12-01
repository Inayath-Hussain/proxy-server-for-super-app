import express from "express";
import cors from "cors";
import { corsOptions } from "./cors"
import newsRoute from "./routes/news";
import weatherRoute from "./routes/weather";
import dotenv from "dotenv";
import cryp from "crypto";
dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()


app.listen(PORT, () => { console.log('app listening on PORT', PORT); })

// middlewares
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

// routes
app.use('/api/news', newsRoute);
app.use('/api/weather', weatherRoute);

// api key implementation, key expected in req header
// key should be encrypted along with timeStamp from browser, if timestamp is within 2min from current in server then accept else reject

// setting up cors dev✔, prod ✔