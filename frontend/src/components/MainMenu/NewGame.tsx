import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useInitializeDefaultConfigs } from "../../game/hooks/useInitializeDefaultGameState"

import type { SetNavigationState } from "./types"
import { SaveGame } from "./SaveGame"
import { LoadGame } from "./LoadGame"

interface NewGameProps {
   setNavigationState: SetNavigationState
   startLoadedScenario: (value: boolean) => void
}

/**
 * A function that handles the start of a new game. It initializes the default game state and updates the navigation state.
 * Calls setNavigationState(true) after loading initial config on new game.
 *
 * startLoadedScenario is passed to LoadGame component.
 *
 * @param setNavigationState - A function to set the navigation state
 * @param startLoadedScenario - The function to start a loaded scenario
 * @return {void} This function does not return anything
 */
const NewGame = ({ setNavigationState, startLoadedScenario }: NewGameProps) => {
   const initializeDefaultGameState = useInitializeDefaultConfigs()

   const handleNewGameClick = async () => {
      // TODO: Maybe make result matter in some way.
      const result = await initializeDefaultGameState()
      setNavigationState(result)
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
