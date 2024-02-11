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
         // TODO: Fix types or move to database
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const module = await import(
            `${cwd}/${characterConfigRoot}/${folder}/characterconfig`
         )

         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const config = clone(module.characterConfig, false)
         if (!config._id) {
            config._id = new mongoose.Types.ObjectId()
         }

         for (const card of config.cards) {
            if (!card._id) {
               card._id = new mongoose.Types.ObjectId()
            }

            for (const action of card.actions) {
               if (!action._id) {
                  action._id = new mongoose.Types.ObjectId()
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
         // TODO: Fix types or move to database
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const module = await import(
            `${cwd}/${enemyConfigRoot}/${folder}/enemyconfig`
         )
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const config = clone(module.enemyConfig, false)
         if (!config._id) {
            config._id = new mongoose.Types.ObjectId()
         }

         for (const card of config.cards) {
            if (!card._id) {
               card._id = new mongoose.Types.ObjectId()
            }

            for (const action of card.actions) {
               if (!action._id) {
                  action._id = new mongoose.Types.ObjectId()
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
         // TODO: Fix
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const module = await import(
            `${cwd}/${scenarioConfigRoot}/${folder}/scenarioconfig`
         )
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const config = clone(module.scenarioConfig, false)

         if (!config._id) {
            config._id = new mongoose.Types.ObjectId()
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
