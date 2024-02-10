import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"

const SaveGame = () => {
   const { getSaveData, updateSaveData, saveTheGame } = useSaveGame()

   const handleSaveGame = () => {
      const saveData = updateSaveData()
      saveTheGame(saveData).then((data) => {
         history.pushState(
            { keyString: data.keyString },
            "",
            `/${data.keyString}`
         )
      })
   }

   return <Button onClick={handleSaveGame}>Save</Button>
}

export { SaveGame }
