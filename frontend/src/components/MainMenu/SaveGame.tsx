import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"

const SaveGame = () => {
   const { updateSaveData, saveTheGame } = useSaveGame()

   const handleSaveGame = () => {
      const saveData = updateSaveData()
      saveTheGame(saveData).then((data) => {
         if (data?.keyString) {
            history.pushState(
               { keyString: data.keyString },
               "",
               `/${data.keyString}`
            )
         }
      })
   }

   return (
      <Button disabled onClick={handleSaveGame}>
         Save
      </Button>
   )
}

export { SaveGame }
