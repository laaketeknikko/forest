import { buildSaveFromState } from "../util/buildSaveFromState"

import { saveGame } from "../../services/saveAndLoadGame"
import { v4 } from "uuid"

import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useAtom } from "jotai"

import { useCallback, useState } from "react"
import { ZSaveConfig } from "../../../../shared/types/types"

/**
 * Hook used for saving the game.
 *
 * @returns An object with the following functions:
 * - getSaveData: returns data from activeSaveGameConfigAtom
 * - updateSaveData: Builds a save state from the current game state.
 *    Returns the state and sets it to activeSaveGameConfigAtom.
 *    The function accepts partial save game config updates, which
 *    can be used to override other updates.
 *    Updates data for: enemies, characters, scenario
 * - saveTheGame: Saves the game data passed as argument,
 *    or, if not passed, from activeSaveGameConfigAtom.
 *
 * Note that the hook uses state functionality to store the save data.
 * This means the updated save data is NOT available during the same render
 * cycle in which it is updated.
 *
 * Also note that other components update the save data as well.
 * This hook is used for updating the enemy, character and scenario data.
 */
const useSaveGame = () => {
   const [saveGameData, setSaveGameData] = useAtom(activeSaveGameConfigAtom)
   const [isSaving, setIsSaving] = useState(false)

   /**
    * Updates save data.
    */
   const updateSaveData = useCallback(
      (partialSaveUpdates: Partial<ZSaveConfig> = {}) => {
         const saveData = {
            ...saveGameData,
            ...buildSaveFromState(),
            keyString: "",
            ...partialSaveUpdates,
         }

         /** If no key string is provided, generate one */
         if (
            !saveGameData.keyString ||
            saveGameData.keyString.length === 0 ||
            saveGameData.keyString === "empty"
         ) {
            saveData.keyString = v4()
         } else {
            saveData.keyString = saveGameData.keyString
         }
         setSaveGameData(saveData)

         /**Update URL save key */
         history.pushState(
            { keyString: saveData.keyString },
            "",
            `/${saveData.keyString}`
         )

         return saveData
      },
      [saveGameData, setSaveGameData]
   )

   const getSaveData = useCallback(() => {
      return saveGameData
   }, [saveGameData])

   const setScenarioInProgress = useCallback(
      (inProgress: boolean) => {
         setSaveGameData({
            ...saveGameData,
            isScenarioInProgress: inProgress,
         })
      },
      [saveGameData, setSaveGameData]
   )

   const saveTheGame = useCallback(
      async (saveData: ZSaveConfig | null = null) => {
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
      },
      [isSaving, saveGameData]
   )

   return {
      getSaveData: getSaveData,
      updateSaveData: updateSaveData,
      setScenarioInProgress: setScenarioInProgress,
      saveTheGame: saveTheGame,
   }
}

export { useSaveGame }
