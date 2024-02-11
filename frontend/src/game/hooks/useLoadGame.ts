import { loadGame } from "../../services/saveAndLoadGame"
import { buildStateFromSave } from "../util/buildStateFromSave"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useAtom } from "jotai"
import { useState } from "react"
import { ZSaveConfig } from "../../../../shared/types/types"

const useLoadGame = () => {
   const [saveGame, setSaveGame] = useAtom(activeSaveGameConfigAtom)
   const [isLoading, setIsLoading] = useState(false)

   const getSaveData = () => {
      return saveGame
   }

   const updateSaveData = async (keyString: string) => {
      if (!isLoading) {
         setIsLoading(true)
         const gameData = await loadGame(keyString)
         setSaveGame(gameData)
         setIsLoading(false)
         return gameData
      }
   }

   const loadTheGame = (saveData: ZSaveConfig | null = null) => {
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
