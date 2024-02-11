import { buildSaveFromState } from "../util/buildSaveFromState"

import { saveGame } from "../../services/saveAndLoadGame"
import { v4 } from "uuid"

import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useAtom } from "jotai"

import { useState } from "react"
import { ISaveGameConfig } from "../../../../shared/types/types"

const useSaveGame = () => {
   const [saveGameData, setSaveGameData] = useAtom(activeSaveGameConfigAtom)

   const [isSaving, setIsSaving] = useState(false)

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

   const saveTheGame = (saveData: ISaveGameConfig | null = null) => {
      if (!isSaving) {
         let result
         setIsSaving(true)
         if (saveData) {
            result = saveGame(saveData)
         } else {
            result = saveGame(saveGameData)
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
