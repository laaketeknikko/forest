import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useInitializeDefaultGameState } from "../../game/hooks/useInitializeDefaultGameState"

import type { SetNavigationState } from "./types"
import { useEffect, useState } from "react"
import { SaveGame } from "./SaveGame"
import { LoadGame } from "./LoadGame"

interface NewGameProps {
   setNavigationState: SetNavigationState
   startGame: (value: boolean) => void
}

const NewGame = ({ setNavigationState, startGame }: NewGameProps) => {
   const initializeDefaultGameState = useInitializeDefaultGameState()
   const [gameInitialized, setGameInitialized] = useState(false)

   const handleNewGameClick = () => {
      const asyncWrapper = async () => {
         // TODO: Maybe make result matter in some way.
         const result = await initializeDefaultGameState()
         setGameInitialized(result)
      }
      asyncWrapper()
   }

   useEffect(() => {
      setNavigationState(gameInitialized)
   }, [gameInitialized, setNavigationState])

   return (
      <Stack>
         <Button onClick={handleNewGameClick}>New game</Button>
         <SaveGame />
         <LoadGame startGame={startGame} />
      </Stack>
   )
}

export { NewGame }
