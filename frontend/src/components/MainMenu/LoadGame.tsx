import Button from "@mui/material/Button"
import { useLoadGame } from "../../game/hooks/useLoadGame"

import { useState } from "react"
import Input from "@mui/material/Input"

interface LoadGameProps {
   startGame: (value: boolean) => void
}

const LoadGame = ({ startGame }: LoadGameProps) => {
   const loader = useLoadGame()

   const [keyString, setKeyString] = useState<string>(
      window.location.pathname.substring(1).trim()
   )

   const handleOnClick = async () => {
      // TODO: Implement setting the keystring to address and reading.
      try {
         const saveData = await loader.updateSaveData(keyString)
         console.log("SaveData in handleOnClick of loadGame:", saveData)

         loader.loadTheGame(saveData)

         startGame(true)
      } catch (error) {
         console.error(`Error loading game with key ${keyString}`, error)
      }
   }

   return (
      <>
         <Button onClick={handleOnClick}>Load</Button>

         <Input
            onChange={(e) => setKeyString(e.target.value)}
            placeholder="Enter save key"
            fullWidth
            type="text"
            slotProps={{
               input: {
                  sx: {
                     textAlign: "center",
                  },
               },
            }}
         ></Input>
      </>
   )
}

export { LoadGame }
