import Button from "@mui/material/Button"
import { useLoadGame } from "../../game/hooks/useLoadGame"

import { useState } from "react"
import Input from "@mui/material/Input"

interface LoadGameProps {
   startGame: (value: boolean) => void
}

/**
 * Asks user to input save key. Fetches save data and loads it.
 * After loading save data, calls startGame(true).
 * If error occurs, calls startGame(false)
 *
 * @param startGame - the function to be called after game is loaded
 */
const LoadGame = ({ startGame }: LoadGameProps) => {
   const loader = useLoadGame()

   const [keyString, setKeyString] = useState<string>(
      window.location.pathname.substring(1).trim()
   )

   const handleOnClick = async () => {
      // TODO: Implement setting the keystring to address and reading.
      try {
         const saveData = await loader.updateSaveData(keyString)
         loader.loadTheGame(saveData)
         startGame(true)
      } catch (error) {
         console.error(`Error loading game with key ${keyString}`, error)
         startGame(false)
      }
   }

   return (
      <>
         <Button onClick={handleOnClick}>Load</Button>

         <Input
            onChange={(e) => setKeyString(e.target.value)}
            placeholder="Enter save key or load from URL"
            fullWidth
            type="text"
            slotProps={{
               input: {
                  sx: {
                     textAlign: "center",
                  },
               },
            }}
            value={keyString}
         ></Input>
      </>
   )
}

export { LoadGame }
