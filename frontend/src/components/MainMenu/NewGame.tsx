import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useInitializeDefaultConfigs } from "../../game/hooks/useInitializeDefaultGameState"

import { SaveGame } from "./SaveGame"
import { LoadGame } from "./LoadGame"
import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import { useAtom } from "jotai"

interface NewGameProps {
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
 *
 */
const NewGame = ({ startLoadedScenario }: NewGameProps) => {
   const initializeDefaultGameState = useInitializeDefaultConfigs()
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   const handleNewGameClick = async () => {
      // TODO: Maybe make result matter in some way.
      const result = await initializeDefaultGameState()

      if (!result) {
         throw new Error("Error initializing game config")
      }

      setGameExecutionState({
         ...gameExecutionState,
         mainMenu: {
            ...gameExecutionState.mainMenu,
            gameConfigLoaded: result,
         },
      })
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
