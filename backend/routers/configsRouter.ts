import express from "express"

import {
   loadDamageTypes,
   loadActionTypes,
   loadEnemyConfigs,
   loadScenarioConfigs,
} from "../services/configsLoader"
import { loadCharacterConfigs } from "../services/configsLoader"

const configsRouter = express.Router()

configsRouter.get("/actiontypes", (_req, res) => {
   res.json(loadActionTypes())
})

configsRouter.get("/damagetypes", (_req, res) => {
   res.json(loadDamageTypes())
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configsRouter.get("/characters", async (_req, res) => {
   try {
      const characterConfigs = await loadCharacterConfigs()
      console.log(characterConfigs)

      res.json(characterConfigs)
   } catch (error) {
      /* empty */
   }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configsRouter.get("/enemies", async (_req, res) => {
   try {
      const enemyConfigs = await loadEnemyConfigs()

      res.json(enemyConfigs)
   } catch (error) {
      console.log(error)
   }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configsRouter.get("/scenarios", async (_req, res) => {
   const scenarioConfigs = await loadScenarioConfigs()
   return res.json(scenarioConfigs)
})

export { configsRouter }
