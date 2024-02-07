import { useState } from "react"
import { buildSaveGame } from "../util/buildSaveGame"

import { saveGame } from "../../services/saveAndLoadGame"

const useSaveGame = () => {
   const [saveGameData, setSaveGameData] = useState({})

   const updateSaveData = () => {
      const saveData = buildSaveGame()
      setSaveGameData(saveData)
   }

   const getSaveData = () => {
      return saveGameData
   }

   const saveTheGame = () => {
      const jsonSaveData = JSON.stringify(saveGameData)
      const response = saveGame(jsonSaveData)
      console.log("response form saving", response)
   }

   return {
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
      saveTheGame: saveTheGame,
   }
}

export { useSaveGame }
