import Button from "@mui/material/Button"
import { useLoadGame } from "../../game/hooks/useLoadGame"

interface LoadGameProps {
   startGame: (value: boolean) => void
}

const LoadGame = ({ startGame }: LoadGameProps) => {
   const loader = useLoadGame()

   const handleOnClick = async () => {
      // TODO: Implement setting the keystring to address and reading.
      const saveData = await loader.updateSaveData("")
      console.log("SaveData in handleOnClick of loadGame:", saveData)

      loader.loadTheGame(saveData)

      startGame(true)
   }

   return <Button onClick={handleOnClick}>Load</Button>
}

export { LoadGame }
