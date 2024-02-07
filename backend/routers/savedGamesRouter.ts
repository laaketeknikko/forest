import express from "express"

const savedGamesRouter = express.Router()

savedGamesRouter.post("/", (req, res) => {
   const saveData = req.body as SaveGameConfig

   console.log("saving game", saveData)

   res.json(`Game saved. Keystring for this save: ${saveData.keyString}`)
})

export { savedGamesRouter }
