import clone from "clone"
import mongoose from "mongoose"

import { actionTypes } from "../assets/configs/actions/actionTypes"
import { damageTypes } from "../assets/configs/actions/damageTypes"

import {
   getCharacterConfigFolders,
   getEnemyConfigFolders,
   getScenarioConfigFolders,
} from "../utils/fileUtils"

import {
   characterConfigRoot,
   enemyConfigRoot,
   scenarioConfigRoot,
} from "../config/paths"

import {
   SaveConfigCharacterSchema,
   SaveConfigEnemySchema,
   ScenarioConfigSchema,
} from "../../shared/zod/schemas"

const cwd = process.cwd()

const loadDamageTypes = () => {
   return damageTypes
}

const loadActionTypes = () => {
   return actionTypes
}

const loadCharacterConfigs = async () => {
   const configs = []
   const configFolders = getCharacterConfigFolders()

   if (configFolders) {
      for (const folder of configFolders) {
         const module = (await import(
            `${cwd}/${characterConfigRoot}/${folder}/characterconfig`
         )) as unknown

         if (
            !(
               module &&
               typeof module === "object" &&
               "characterConfig" in module
            )
         ) {
            throw new Error(
               "Invalid character config. \
               1. Make sure your character config is a named export 'characterConfig' \
               2. Make sure your character config is in file 'characterconfig.ts'"
            )
         }

         const validatedConfig = SaveConfigCharacterSchema.safeParse(
            clone(module.characterConfig, false)
         )

         if (!validatedConfig.success) {
            throw new Error(
               "Invalid character config. \
            The config object is not valid."
            )
         }

         const config = validatedConfig.data

         if (!config._id) {
            config._id = new mongoose.Types.ObjectId().toString()
         }

         for (const card of config.cards) {
            if (!card._id) {
               card._id = new mongoose.Types.ObjectId().toString()
            }

            for (const action of card.actions) {
               if (!action._id) {
                  action._id = new mongoose.Types.ObjectId().toString()
               }
            }
         }

         configs.push(config)
      }
   }

   return configs
}

const loadEnemyConfigs = async () => {
   const configs = []
   const configFolders = getEnemyConfigFolders()

   if (configFolders) {
      for (const folder of configFolders) {
         const module = (await import(
            `${cwd}/${enemyConfigRoot}/${folder}/enemyconfig`
         )) as unknown

         if (
            !(module && typeof module === "object" && "enemyConfig" in module)
         ) {
            throw new Error(
               "Invalid enemy config. \
            1. Make sure your enemy config is a named export 'enemyConfig' \
            2. Make sure your enemy config is in file 'enemyconfig.ts'"
            )
         }

         const validatedConfig = SaveConfigEnemySchema.safeParse(
            clone(module.enemyConfig, false)
         )

         if (!validatedConfig.success) {
            throw new Error("Enemy config object is invalid.")
         }

         const config = validatedConfig.data

         if (!config._id) {
            config._id = new mongoose.Types.ObjectId().toString()
         }

         for (const card of config.cards) {
            if (!card._id) {
               card._id = new mongoose.Types.ObjectId().toString()
            }

            for (const action of card.actions) {
               if (!action._id) {
                  action._id = new mongoose.Types.ObjectId().toString()
               }
            }
         }

         configs.push(config)
      }
   }

   return configs
}

const loadScenarioConfigs = async () => {
   const configs = []

   const configFolders = getScenarioConfigFolders()

   if (configFolders) {
      for (const folder of configFolders) {
         const module = (await import(
            `${cwd}/${scenarioConfigRoot}/${folder}/scenarioconfig`
         )) as unknown

         if (
            !(
               module &&
               typeof module === "object" &&
               "scenarioConfig" in module
            )
         ) {
            throw new Error("Invalid scenario config.")
         }

         const validatedConfig = ScenarioConfigSchema.safeParse(
            clone(module.scenarioConfig, false)
         )

         if (!validatedConfig.success) {
            throw new Error("Scenario config object is invalid.")
         }

         const config = validatedConfig.data

         if (!config._id) {
            config._id = new mongoose.Types.ObjectId().toString()
         }

         configs.push(config)
      }
   }

   return configs
}

export {
   loadDamageTypes,
   loadActionTypes,
   loadCharacterConfigs,
   loadEnemyConfigs,
   loadScenarioConfigs,
}
