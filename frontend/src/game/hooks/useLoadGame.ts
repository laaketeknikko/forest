import { loadGame } from "../../services/saveAndLoadGame"
import { buildStateFromSave } from "../util/buildStateFromSave"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useAtom } from "jotai"

const useLoadGame = () => {
   const [saveGame, setSaveGame] = useAtom(activeSaveGameConfigAtom)

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
