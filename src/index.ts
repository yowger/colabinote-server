import express from "express"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"

import { hocusServer } from "./hocusfocus/hocuspocus"
import boardsRouter from "./modules/boards/boards.routes"
import { createCorsOptions } from "./config/cors"
import { whitelist } from "./config/whitelist"
import { errorHandler } from "./helpers/errorHandler"
import { env } from "./config/env"

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors(createCorsOptions(whitelist)))
app.use(compression())
app.use(morgan("dev"))

app.use("/api/boards", boardsRouter)
app.use((req, res) => {
    res.status(404).json({ message: "Not Found", path: req.originalUrl })
})
app.use(errorHandler)

app.listen(3000, () => {
    console.log(`Server running on port ${env.PORT}`)
})

hocusServer.listen()

process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection", error)
})

process.on("uncaughtException", (error) => {
    console.log("uncaughtException", error)
})

process.on("SIGINT", async () => {
    await hocusServer.destroy()
    process.exit()
})
