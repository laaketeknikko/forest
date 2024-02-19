/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express"

import {
   loadCharacterConfigs,
   loadEnemyConfigs,
   loadScenarioConfigs,
} from "../services/configsLoader"
import { saveGame } from "../services/savedGames"
import { ISaveGameConfigModel } from "../mongoose/models/modelTypes"

const newGameRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
newGameRouter.get("/", async (_req, res) => {
   try {
      const characterConfigs = await loadCharacterConfigs()
      const enemyConfigs = await loadEnemyConfigs()
      const scenarioConfigs = (await loadScenarioConfigs())[0]

      const initialSaveConfig: ISaveGameConfigModel = {
         keyString: "",
         characters: characterConfigs,
         enemies: enemyConfigs,
         scenario: scenarioConfigs,
         scenarioStatistics: [],
      }

      const result = await saveGame(initialSaveConfig)

      res.json(result)
   } catch (error) {
      console.error(error)
      res.status(400).json("Could not create new game" + error)
   }
})

export { newGameRouter }
