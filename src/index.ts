import express from "express";
import cors from "cors";
import { corsOptions } from "./cors"
import newsRoute from "./routes/news";
import weatherRoute from "./routes/weather";
import { checkOrigin } from "./middleware/origin";

const PORT = process.env.PORT || 3000
const app = express()


app.listen(PORT, () => { console.log(`app listening on PORT ${PORT} in ${process.env.NODE_ENV}`); })

// middlewares
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(checkOrigin)

// routes
app.use('/api/news', newsRoute);
app.use('/api/weather', weatherRoute);

// block browsers
// setting up cors dev✔, prod ✔

// block other devices ✔

// npm rm rf ?