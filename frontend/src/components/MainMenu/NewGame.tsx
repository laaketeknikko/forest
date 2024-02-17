import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useInitializeDefaultGameState } from "../../game/hooks/useInitializeDefaultGameState"

import type { SetNavigationState } from "./types"
import { SaveGame } from "./SaveGame"
import { LoadGame } from "./LoadGame"

interface NewGameProps {
   setNavigationState: SetNavigationState
   startLoadedScenario: (value: boolean) => void
}

const NewGame = ({ setNavigationState, startLoadedScenario }: NewGameProps) => {
   const initializeDefaultGameState = useInitializeDefaultGameState()

   const handleNewGameClick = () => {
      const asyncWrapper = async () => {
         // TODO: Maybe make result matter in some way.
         const result = await initializeDefaultGameState()
         setNavigationState(result)
      }
      asyncWrapper()
   }

   return (
      <Stack width={"100%"}>
         <Button onClick={handleNewGameClick}>New game</Button>
         <SaveGame />
         <LoadGame startGame={startLoadedScenario} />
      </Stack>
   )
}

export { NewGame }
