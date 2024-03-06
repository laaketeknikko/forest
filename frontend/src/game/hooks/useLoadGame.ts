import { loadGame } from "../../services/saveAndLoadGame"
import { buildStateFromSave } from "../util/buildStateFromSave"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useAtom } from "jotai"
import { useCallback, useState } from "react"
import { ZSaveConfig } from "../../../../shared/types/types"

/**
 *
 *
 * @return  An object with the following functions:
 * - getSaveData: returns data from activeSaveGameConfigAtom
 * - updateSaveData: fetches save data from server. Sets save data in activeSaveGameConfigAtom
 *    and also returns the data.
 * - loadTheGame: loads the game data passed as argument, or, if not passed, from activeSaveGameConfigAtom.
 *
 */
const useLoadGame = () => {
   const [saveGame, setSaveGame] = useAtom(activeSaveGameConfigAtom)
   const [isLoading, setIsLoading] = useState(false)

   const getSaveData = useCallback(() => {
      return saveGame
   }, [saveGame])

   const updateSaveData = useCallback(
      async (keyString: string) => {
         if (!isLoading) {
            setIsLoading(true)
            const gameData = await loadGame(keyString)
            setSaveGame(gameData)
            setIsLoading(false)
            return gameData
         }
      },
      [isLoading, setSaveGame]
   )

   /** If saveData is given, load from it, otherwise load from global state. */
   const loadTheGame = useCallback(
      (saveData: ZSaveConfig | null = null) => {
         if (saveData) {
            return buildStateFromSave(saveData)
         } else {
            return buildStateFromSave(saveGame)
         }
      },
      [saveGame]
   )

   return {
      loadTheGame: loadTheGame,
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
   }
}

export { useLoadGame }
