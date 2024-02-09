import { useState } from "react"
import { loadGame } from "../../services/saveAndLoadGame"

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

   const updateSaveData = (keyString: string) => {
      loadGame(keyString).then((gameData) => setSaveGame(gameData))
   }

   const loadTheGame = (_keyString: string) => {
      // TODO: Turn save data into game state.
   }

   return {
      loadTheGame: loadTheGame,
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
   }
}

export { useLoadGame }
