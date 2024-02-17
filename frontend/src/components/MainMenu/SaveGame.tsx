import Button from "@mui/material/Button"

import { useSaveGame } from "../../game/hooks/useSaveGame"
import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import { useAtomValue } from "jotai"

const SaveGame = () => {
   const { updateSaveData, saveTheGame } = useSaveGame()
   const menuState = useAtomValue(gameExecutionStateAtom)

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
      <Button
         disabled={!menuState.mainMenu.scenarioStarted}
         onClick={handleSaveGame}
      >
         Save
      </Button>
   )
}

export { SaveGame }
