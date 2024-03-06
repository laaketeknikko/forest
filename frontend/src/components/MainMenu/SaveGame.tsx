import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"

const SaveGame = () => {
   const { updateSaveData, saveTheGame } = useSaveGame()

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

   return <Button onClick={handleSaveGame}>Save</Button>
}

export { SaveGame }
