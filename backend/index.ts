import { config } from "dotenv"
config()

import express from "express"
import cors from "cors"

import { configsRouter } from "./routers/configsRouter"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/configs", configsRouter)

const PORT = process.env.PORT

app.get("/ping", (_req, res) => {
   console.log("someone pinged here")
   res.send("pong")
})

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
