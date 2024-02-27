import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import {
   activeSaveGameConfigAtom,
   gameExecutionStateAtom,
} from "../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { MainWindowDisplayStatus } from "../../config/types"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Divider from "@mui/material/Divider"
import { theme } from "../../styles/mui/theme"

const Debriefing = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const [saveGame] = useAtom(activeSaveGameConfigAtom)

   return (
      <Container>
         <Typography variant="h3" color="primary" textAlign={"center"}>
            Debriefing
         </Typography>
         <Grid2 columns={24} container justifyItems={"center"}>
            <Grid2 xs={12}>
               <Typography variant="h5" textAlign={"center"}>
                  {saveGame.scenario.name}
               </Typography>
               <Divider
                  variant="middle"
                  color="primary"
                  aria-hidden="true"
                  sx={{ borderColor: theme.palette.primary.main }}
               />
               <Typography variant="h6">
                  Result:{" "}
                  {gameExecutionState.scenario.won ? (
                     <Typography
                        variant="body1"
                        component="span"
                        background-color="primary"
                     >
                        Victory
                     </Typography>
                  ) : (
                     <Typography
                        variant="body1"
                        component="span"
                        color="primary"
                     >
                        Defeat
                     </Typography>
                  )}
               </Typography>

               <Typography variant="h5">Enemies defeated</Typography>
            </Grid2>

            <Grid2 xs={12}>
               <Typography variant="h5" textAlign={"center"}>
                  Participating characters
               </Typography>
               <Divider
                  variant="middle"
                  color="primary"
                  aria-hidden="true"
                  sx={{ borderColor: theme.palette.primary.main }}
               />
            </Grid2>
         </Grid2>

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
