import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { MainWindowDisplayStatus } from "../../config/types"

const Debriefing = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   return (
      <Container>
         <Typography variant="h3">You won!!!!!!</Typography>
         <Button
            onClick={() => {
               setGameExecutionState({
                  ...gameExecutionState,
                  scenario: {
                     lost: false,
                     won: false,
                  },
                  mainDisplay: MainWindowDisplayStatus.showMainMenu,
                  mainMenu: {
                     showMainmenu: true,
                     gameConfigLoaded: true,
                     scenarioSelected: false,
                     charactersSelected: false,
                     scenarioStarted: false,
                  },
               })
            }}
         >
            Accept
         </Button>
      </Container>
   )
}

export { Debriefing }
