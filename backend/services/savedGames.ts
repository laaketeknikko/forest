import { SaveConfigSchema } from "../../shared/zod/schemas"

import { SaveGameModel } from "../mongoose/models/SaveGame"

const saveGame = async (saveGameData: unknown) => {
   const parsedConfig = SaveConfigSchema.safeParse(saveGameData)

   if (!parsedConfig.success) {
      console.log("Invalid save data", parsedConfig.error)
      throw new Error("Provided save data is invalid")
   }

   let saveGame = await SaveGameModel.findOne({
      keyString: parsedConfig.data.keyString,
   })

   if (saveGame) {
      await saveGame.updateOne(parsedConfig.data)
   } else {
      saveGame = new SaveGameModel(parsedConfig.data)
      await saveGame.save()
   }

   return saveGame.toObject()
}

const loadGame = async (keyString: string) => {
   const saveGame = await SaveGameModel.findOne({ keyString })
   return saveGame
}

export { saveGame, loadGame }
