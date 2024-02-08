import express from "express"

import { saveGame } from "../services/savedGames"

const savedGamesRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
savedGamesRouter.post("/", async (req, res) => {
   const saveData = req.body as SaveGameConfig

   try {
      const saveResult = await saveGame(saveData)
      res.json(
         `Game saved. Keystring for this save: ${saveData.keyString}. Saved game:` +
            JSON.stringify(saveResult)
      )
   } catch (error) {
      console.error(error)
   }
})

export { savedGamesRouter }
