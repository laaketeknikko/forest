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

      res.json(characterConfigs)
   } catch (error) {
      console.error("Error loading characters.")
      res.status(500).json(error)
   }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configsRouter.get("/enemies", async (_req, res) => {
   try {
      const enemyConfigs = await loadEnemyConfigs()

      res.json(enemyConfigs)
   } catch (error) {
      console.log(error)
      res.status(500).json(error)
   }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configsRouter.get("/scenarios", async (_req, res) => {
   try {
      const scenarioConfigs = await loadScenarioConfigs()
      return res.json(scenarioConfigs)
   } catch (error) {
      console.error(error)
      return res.status(500).json(error)
   }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
configsRouter.get("/scenarios/:name", async (req, res) => {
   const scenarioConfigs = await loadScenarioConfigs()

   const scenario = scenarioConfigs.find(
      (scenario) =>
         scenario.name.toLowerCase() === req.params.name.toLowerCase()
   )
   if (!scenario) {
      return res.status(404).send("Scenario not found")
   }
   return res.json(scenario)
})

export { configsRouter }
