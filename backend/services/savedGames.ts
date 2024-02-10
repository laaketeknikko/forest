import * as modelTypes from "../mongoose/models/modelTypes"

import { SaveGameModel } from "../mongoose/models/SaveGame"

const saveGame = async (saveGameData: modelTypes.ISaveGameConfigModel) => {
   console.dir(saveGameData, { depth: null })

   let saveGame = await SaveGameModel.findOne({
      keyString: saveGameData.keyString,
   })

   if (saveGame) {
      console.log("replacing save data", saveGame.toJSON())
      saveGame.characters = saveGameData.characters
      saveGame.enemies = saveGameData.enemies
      saveGame.scenario = saveGameData.scenario
      console.log("Replaced save data", saveGame.toJSON())
   } else {
      saveGame = new SaveGameModel(saveGameData)
   }

   await saveGame.save()

   return saveGame.toObject()
}

const loadGame = async (keyString: string) => {
   const saveGame = await SaveGameModel.findOne({ keyString })
   return saveGame
}

export { saveGame, loadGame }
