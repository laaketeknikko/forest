import { ZSaveConfig } from "../../shared/types/types"
import { SaveConfigSchema } from "../../shared/zod/schemas"

import { SaveGameModel } from "../mongoose/models/SaveGame"

const saveGame = async (saveGameData: unknown) => {
   // TODO: Fix these errors somehow.
   const parsedConfig = SaveConfigSchema.safeParse(saveGameData)

   console.dir(parsedConfig, { depth: null })

   if (!parsedConfig.success) {
      console.log("Invalid save data", parsedConfig.error)
      throw new Error("Invalid save data")
   }

   let saveGame = await SaveGameModel.findOne({
      keyString: parsedConfig.data.keyString,
   })

   if (saveGame) {
      saveGame.characters = parsedConfig.data.characters
      saveGame.enemies = parsedConfig.data.enemies
      saveGame.scenario = parsedConfig.data.scenario
   } else {
      saveGame = new SaveGameModel(parsedConfig.data)
   }

   await saveGame.save()

   return saveGame.toObject()
}

const loadGame = async (keyString: string) => {
   const saveGame = await SaveGameModel.findOne({ keyString })
   return saveGame
}

export { saveGame, loadGame }
