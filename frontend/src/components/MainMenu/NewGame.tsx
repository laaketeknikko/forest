import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useInitializeDefaultGameState } from "../../game/hooks/useInitializeDefaultGameState"

import type { SetNavigationState } from "./types"
import { useEffect, useState } from "react"

interface NewGameProps {
   setNavigationState: SetNavigationState
}

const NewGame = ({ setNavigationState }: NewGameProps) => {
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
         <Button>Save</Button>
         <Button>Load</Button>
      </Stack>
   )
}

export { NewGame }
