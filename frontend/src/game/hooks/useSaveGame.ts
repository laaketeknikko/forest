import { useState } from "react"
import { buildSaveFromState } from "../util/buildSaveGame"

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
      const saveData = { ...buildSaveFromState(), keyString: "" }
      if (!saveGameData.keyString || saveGameData.keyString.length === 0) {
         saveData.keyString = v4()
      } else {
         saveData.keyString = saveGameData.keyString
      }
      setSaveGameData(saveData)

      return saveData
   }

   const getSaveData = () => {
      return saveGameData
   }

   const saveTheGame = (saveData: SaveGameConfig | null = null) => {
      if (saveData) {
         return saveGame(saveData)
      } else {
         return saveGame(saveGameData)
      }
   }

   return {
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
      saveTheGame: saveTheGame,
   }
}

export { useSaveGame }
