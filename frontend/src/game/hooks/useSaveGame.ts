import { buildSaveFromState } from "../util/buildSaveFromState"

import { saveGame } from "../../services/saveAndLoadGame"
import { v4 } from "uuid"

import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useAtom } from "jotai"

import { useState } from "react"
import { ZSaveConfig } from "../../../../shared/types/types"

/**
 * Hook used for saving the game.
 *
 * @returns An object with the following functions:
 * - getSaveData: returns data from activeSaveGameConfigAtom
 * - updateSaveData: Builds a save state from the current game state.
 *    Returns the state and sets it to activeSaveGameConfigAtom
 * - saveTheGame: Saves the game data passed as argument, or, if not passed, from activeSaveGameConfigAtom.
 */
const useSaveGame = () => {
   const [saveGameData, setSaveGameData] = useAtom(activeSaveGameConfigAtom)
   const [isSaving, setIsSaving] = useState(false)

   const updateSaveData = () => {
      const saveData = {
         ...saveGameData,
         ...buildSaveFromState(),
         keyString: "",
      }
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

   const saveTheGame = async (saveData: ZSaveConfig | null = null) => {
      let result: ZSaveConfig

      if (!isSaving) {
         setIsSaving(true)
         if (saveData) {
            result = await saveGame(saveData)
         } else {
            result = await saveGame(saveGameData)
         }
         setIsSaving(false)
         return result
      }
   }

   return {
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
      saveTheGame: saveTheGame,
   }
}

export { useSaveGame }
