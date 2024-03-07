import Button from "@mui/material/Button"
import { useLoadGame } from "../../game/hooks/useLoadGame"

import { useState } from "react"
import Input from "@mui/material/Input"
import { useInitializeDefaultConfigs } from "../../game/hooks/useInitializeDefaultGameState"
import { ZSaveConfig } from "../../../../shared/types/types"

interface LoadGameProps {
   startGame: (value: boolean, config: ZSaveConfig) => void
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

   /** By default set value of load key field to key from URL. */
   const [keyString, setKeyString] = useState<string>(
      window.location.pathname.substring(1).trim()
   )
   const stateLoader = useInitializeDefaultConfigs()

   const handleOnClick = async () => {
      try {
         const stateResult = await stateLoader()
         if (!stateResult) {
            throw new Error("Error loading configs from server.")
         }

         const saveData = await loader.updateSaveData(keyString)
         loader.loadTheGame(saveData)

         if (saveData && saveData.keyString) {
            history.pushState(
               { keyString: saveData.keyString },
               "",
               `/${saveData.keyString}`
            )
            startGame(true, saveData)
         }
      } catch (error) {
         console.error(`Error loading game with key ${keyString}`, error)
         startGame(false, loader.getSaveData())
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
            value={keyString}
         ></Input>
      </>
   )
}

export { LoadGame }
