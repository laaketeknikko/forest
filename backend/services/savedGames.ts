import * as modelTypes from "../mongoose/models/modelTypes"

import mongoose from "mongoose"

import { SaveGameModel } from "../mongoose/models/SaveGame"

const saveGame = async (saveGameData: modelTypes.ISaveGameConfigModel) => {
   let saveGame = await SaveGameModel.findOne({
      keyString: saveGameData.keyString,
   })

   if (saveGame) {
      saveGame.characters = saveGameData.characters
      saveGame.enemies = saveGameData.enemies
      saveGame.scenario = saveGameData.scenario
   }

   // TODO: Continue from here
}

export { saveGame }
