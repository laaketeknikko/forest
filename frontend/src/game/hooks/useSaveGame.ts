import { useState } from "react"
import { buildSaveGame } from "../util/buildSaveGame"

import { saveGame } from "../../services/saveAndLoadGame"
import { v4 } from "uuid"

const useSaveGame = () => {
   const [saveGameData, setSaveGameData] = useState<SaveGameConfig>({
      characters: [],
      enemies: [],
      scenario: {} as ScenarioConfig,
      keyString: "",
   })

   const updateSaveData = () => {
      const saveData = { ...buildSaveGame(), keyString: "" }
      if (!saveGameData.keyString || saveGameData.keyString.length === 0) {
         saveData.keyString = v4()
      } else {
         saveData.keyString = saveGameData.keyString
      }
      setSaveGameData(saveData)
   }

   const getSaveData = () => {
      return saveGameData
   }

   const saveTheGame = () => {
      const response = saveGame(saveGameData)
      console.log("response form saving", response)
   }

   return {
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
      saveTheGame: saveTheGame,
   }
}

export { useSaveGame }
