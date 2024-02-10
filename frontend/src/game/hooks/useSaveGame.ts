import { buildSaveFromState } from "../util/buildSaveFromState"

import { saveGame } from "../../services/saveAndLoadGame"
import { v4 } from "uuid"

import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useAtom } from "jotai"

const useSaveGame = () => {
   const [saveGameData, setSaveGameData] = useAtom(activeSaveGameConfigAtom)

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
