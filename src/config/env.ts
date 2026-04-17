import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: Number(process.env.PORT),
    DATABASE_URL: process.env.DATABASE_URL,
    CORS_WHITELIST: process.env.CORS_WHITELIST
        ? process.env.CORS_WHITELIST.split(",").map((origin) => origin.trim())
        : [],
}
