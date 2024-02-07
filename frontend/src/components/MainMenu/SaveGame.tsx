import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"

const SaveGame = () => {
   const { getSaveData, updateSaveData, saveTheGame } = useSaveGame()

   const handleSaveGame = () => {
      updateSaveData()
      saveTheGame()
   }

   return <Button onClick={handleSaveGame}>Save</Button>
}

export { SaveGame }
