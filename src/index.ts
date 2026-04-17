import express from "express"
import expressWs from "express-ws"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"

import { hocusServer } from "./hocusfocus/hocuspocus"
import boardsRouter from "./modules/boards/boards.routes"
import { createCorsOptions } from "./config/cors"
import { whitelist } from "./config/whitelist"
import { errorHandler } from "./utils/errorHandler"
import { env } from "./config/env"

const { app } = expressWs(express())

app.ws("/collaboration", (websocket, request, context) => {
    console.log(
        `New connection attempt from ${request.ip} at ${new Date().toISOString()}`,
    )

    hocusServer.handleConnection(websocket, request, context)
})

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

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
})

process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection", error)
})

process.on("uncaughtException", (error) => {
    console.log("uncaughtException", error)
})

process.on("SIGINT", async () => {
    process.exit()
})
