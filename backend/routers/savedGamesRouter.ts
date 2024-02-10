/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express"

import { loadGame, saveGame } from "../services/savedGames"
import { ISaveGameConfigModel } from "../mongoose/models/modelTypes"
const savedGamesRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
savedGamesRouter.post("/", async (req, res) => {
   const saveData = req.body as ISaveGameConfigModel

   try {
      const saveResult = await saveGame(saveData)
      res.json({
         keyString: saveResult.keyString,
         data: saveResult,
      })
   } catch (error) {
      console.error(error)
      res.status(500).send("Could not save game")
   }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
savedGamesRouter.get("/:keyString", async (req, res) => {
   if (
      !req.params.keyString ||
      typeof req.params.keyString !== "string" ||
      req.params.keyString === ""
   ) {
      res.status(400).send("Missing key string")
      return
   }
   const keyString = req.params.keyString

   try {
      const saveGame = await loadGame(keyString)
      if (saveGame) {
         res.json(saveGame)
      } else {
         res.status(404).send(`Game with key ${keyString} not found`)
      }
   } catch (error) {
      console.error(error)
      res.status(500).json(error)
   }
})

export { savedGamesRouter }
