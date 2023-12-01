import { CorsOptions } from "cors"

export let corsOptions: CorsOptions;

if (process.env.NODE_ENV === 'production') {
    corsOptions = {
        // set react deployed origin here
        origin: []
    }
}

corsOptions = {
    origin: ['http://localhost:5174'],
    allowedHeaders: []
}