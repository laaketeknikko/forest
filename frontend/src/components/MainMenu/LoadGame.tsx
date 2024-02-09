import Button from "@mui/material/Button"
import { useLoadGame } from "../../game/hooks/useLoadGame"

interface LoadGameProps {
   startGame: (value: boolean) => void
}

const LoadGame = ({ startGame }: LoadGameProps) => {
   const loader = useLoadGame()

   const handleOnClick = async () => {
      const saveData = await loader.updateSaveData(
         "e6444d4f-eb76-44ab-94d5-7109cfe60b42"
      )
      console.log("SaveData in handleOnClick of loadGame:", saveData)

      loader.loadTheGame(saveData)

      startGame(true)
   }

   return <Button onClick={handleOnClick}>Load</Button>
}

export { LoadGame }
