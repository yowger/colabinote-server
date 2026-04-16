import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT: process.env.PORT ?? "3000",
    DATABASE_URL: process.env.DATABASE_URL,
    HOCUSFOCUS_PORT: (process.env.HOCUSFOCUS_PORT as unknown as number) || 1234,
}
