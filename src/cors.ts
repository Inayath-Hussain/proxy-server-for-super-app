import { CorsOptions } from "cors"

export let corsOptions: CorsOptions;

if (process.env.NODE_ENV === 'production') {
    corsOptions = {
        // set react deployed origin here
        origin: ["https://super-app-hazel-omega.vercel.app/"]
    }
}

corsOptions = {
    origin: /http:\/\/localhost:.{4}/,
    allowedHeaders: []
}