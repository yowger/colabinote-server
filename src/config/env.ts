import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: process.env.PORT ?? "3000",
    DATABASE_URL: process.env.DATABASE_URL,
    HOCUSFOCUS_PORT: Number(process.env.HOCUSFOCUS_PORT) || 1234,
    CORS_WHITELIST: process.env.CORS_WHITELIST
        ? process.env.CORS_WHITELIST.split(",").map((origin) => origin.trim())
        : [],
}
