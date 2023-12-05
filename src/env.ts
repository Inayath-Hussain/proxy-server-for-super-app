import dotenv from "dotenv";

dotenv.config()

const env = {
    newsApiKey: process.env.NEWS_API_KEY,
    weatherApiKey: process.env.WEATHER_API_KEY
}

type Ikeys = keyof typeof env
const keys = Object.keys(env) as Ikeys[]

for (let i of keys) {
    if (env[i] === undefined) {
        throw Error('env variable' + " " + i + " " + 'is undefined');
    }
}

export default env;