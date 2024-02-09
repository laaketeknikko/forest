import { useState } from "react"
import { loadGame } from "../../services/saveAndLoadGame"
import { buildStateFromSave } from "../util/buildStateFromSave"

const useLoadGame = () => {
   const [saveGame, setSaveGame] = useState<SaveGameConfig>({
      characters: [],
      enemies: [],
      scenario: {} as ScenarioConfig,
      keyString: "",
   })

   const getSaveData = () => {
      return saveGame
   }

   const updateSaveData = async (keyString: string) => {
      const gameData = await loadGame(keyString)
      setSaveGame(gameData)
      return gameData
   }

   const loadTheGame = (saveData: SaveGameConfig | null = null) => {
      if (saveData) {
         return buildStateFromSave(saveData)
      } else {
         return buildStateFromSave(saveGame)
      }
   }

   return {
      loadTheGame: loadTheGame,
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
   }
}

export { useLoadGame }
