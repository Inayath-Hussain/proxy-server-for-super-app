import { CorsOptions } from "cors"

export let corsOptions: CorsOptions;

console.log(process.env.NODE_ENV, "in cors.ts")
if (process.env.NODE_ENV === 'production') {
    corsOptions = {
        // set react deployed origin here
        origin: ["https://super-app-hazel-omega.vercel.app"]
    }
}
else {
    corsOptions = {
        origin: /http:\/\/localhost:.{4}/,
        allowedHeaders: []
    }
}