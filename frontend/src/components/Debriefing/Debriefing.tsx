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
import { selectedPartyAtom } from "../../game/state/jotai/characters"
import { DebriefingEntityCard } from "./DebriefingEntityCard"
import { selectedScenarioEnemiesAtom } from "../../game/state/jotai/enemies"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

const Debriefing = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const [saveGame] = useAtom(activeSaveGameConfigAtom)
   const [characterAtoms] = useAtom(selectedPartyAtom)
   const [enemyAtoms] = useAtom(selectedScenarioEnemiesAtom)

   const scenarioStatistics = saveGame.scenarioStatistics.find((stat) => {
      return stat.scenarioName === saveGame.scenario.name
   })

   return (
      <Container
         sx={{
            overflowY: "auto",
            height: "100%",
         }}
      >
         <Typography variant="h3" color="primary" textAlign={"center"}>
            Debriefing
         </Typography>

         <Typography variant="h5" textAlign={"center"}>
            {saveGame.scenario.name}
         </Typography>
         <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"center"}
            marginTop={3}
         >
            <Typography variant="h6">
               Result:{" "}
               {gameExecutionState.scenario.won ? (
                  <Typography variant="body1" component="span" color="primary">
                     Victory
                  </Typography>
               ) : (
                  <Typography variant="body1" component="span" color="primary">
                     Defeat
                  </Typography>
               )}
            </Typography>

            <Typography variant="h6">
               Times attempted:{" "}
               <Typography component="span" color="primary">
                  {scenarioStatistics?.timesAttempted}
               </Typography>
            </Typography>

            <Typography variant="h6">
               Wins:{" "}
               <Typography component="span" color="primary">
                  {scenarioStatistics?.wins}
               </Typography>
            </Typography>

            <Typography variant="h6">
               Losses:{" "}
               <Typography component="span" color="primary">
                  {scenarioStatistics?.losses}
               </Typography>
            </Typography>
         </Stack>
         <Grid2
            columns={24}
            container
            justifyItems={"center"}
            sx={{ marginTop: 3 }}
         >
            <Grid2 xs={12}>
               <Typography variant="h5">Enemies defeated</Typography>
               <Divider
                  variant="middle"
                  color="primary"
                  aria-hidden="true"
                  sx={{ borderColor: theme.palette.primary.main }}
               />
               {enemyAtoms.map((atom) => {
                  return (
                     <DebriefingEntityCard
                        key={atom.toString()}
                        entityAtom={atom}
                        direction="vertical"
                     />
                  )
               })}
            </Grid2>

            {/** Party section*/}
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
               <Stack>
                  {characterAtoms.map((atom) => {
                     return (
                        <Box component="div" key={atom.toString()}>
                           <DebriefingEntityCard
                              entityAtom={atom}
                              direction="vertical"
                           />
                        </Box>
                     )
                  })}
               </Stack>
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
