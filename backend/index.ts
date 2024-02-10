import { config } from "dotenv"
config()

import express from "express"
import cors from "cors"

import mongoose from "mongoose"

import { configsRouter } from "./routers/configsRouter"
import { savedGamesRouter } from "./routers/savedGamesRouter"
import { newGameRouter } from "./routers/newGameRouter"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/configs", configsRouter)
app.use("/api/savedgames", savedGamesRouter)
app.use("/api/newgame", newGameRouter)

mongoose.set("strictQuery", false)
mongoose
   .connect(process.env.MONGODB_URL)
   .then(() => console.log("Connected to MongoDB"))
   .catch((error) => console.log("Could not connect to MongoDB", error.message))

const PORT = process.env.PORT

app.get("/ping", (_req, res) => {
   console.log("someone pinged here")
   res.send("pong")
})

// Not sure this'll work.
// Attempt to cleanly disconnect on close.
for (const code of [
   `exit`,
   `SIGINT`,
   `SIGUSR1`,
   `SIGUSR2`,
   `uncaughtException`,
   `SIGTERM`,
]) {
   process.on(code, () => {
      void mongoose.disconnect()
      process.exit()
   })
}

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
