import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"
import { useState } from "react"

/**
 * Display save game button.
 *
 * When clicked, uses useSaveGame to update the save state
 * and save the game to server.
 */
const SaveGame = () => {
   const { updateSaveData, saveTheGame } = useSaveGame()
   const [saveKey] = useState<string | null>(
      window.location.pathname.substring(1).trim()
   )

   const handleSaveGame = () => {
      const saveData = updateSaveData()

      try {
         saveTheGame(saveData).then((data) => {
            if (data?.keyString) {
               history.pushState(
                  { keyString: data.keyString },
                  "",
                  `/${data.keyString}`
               )
            }
         })
      } catch (error) {
         console.error("Error saving game", error)
      }
   }

   return (
      <Button
         onClick={handleSaveGame}
         disabled={saveKey === "" || !saveKey ? true : false}
      >
         Save
      </Button>
   )
}

export { SaveGame }
