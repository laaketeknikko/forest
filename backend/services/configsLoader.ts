import { v4 } from "uuid"

import { actionTypes } from "../assets/configs/actions/actionTypes"
import { damageTypes } from "../assets/configs/actions/damageTypes"

import {
   getCharacterConfigFolders,
   getEnemyConfigFolders,
   getScenarioConfigFolders,
   //getScenarioConfigFolders,
} from "../utils/fileUtils"

import {
   characterConfigRoot,
   enemyConfigRoot,
   scenarioConfigRoot,
   //scenarioConfigRoot,
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
         const config = module.characterConfig
         if (!config.id) {
            config.id = v4()
         }

         console.log("assigning card ids")
         for (const card of config.cards) {
            if (!card.id) {
               card.id = v4()
            }

            console.log("assinging action ids")
            for (const action of card.actions) {
               if (!action.id) {
                  action.id = v4()
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
         const config = module.enemyConfig
         if (!config.id) {
            config.id = v4()
         }

         for (const card of config.cards) {
            if (!card.id) {
               card.id = v4()
            }

            console.log("assinging action ids")
            for (const action of card.actions) {
               if (!action.id) {
                  action.id = v4()
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
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const module = await import(
            `${cwd}/${scenarioConfigRoot}/${folder}/scenarioconfig`
         )
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
         const config = module.scenarioConfig

         if (!config.id) {
            config.id = v4()
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
