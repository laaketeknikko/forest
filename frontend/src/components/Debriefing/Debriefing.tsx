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
            justifyContent={"space-around"}
            marginTop={10}
            marginBottom={10}
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
         <Grid2 columns={24} container sx={{ marginTop: 3 }}>
            {/** Enemies section
             *
             */}
            <Grid2 xs={12} container columns={24}>
               <Grid2 xs={24} height={"min-content"}>
                  <Typography variant="h5" textAlign="center">
                     Enemies
                  </Typography>
                  <Divider
                     variant="middle"
                     color="primary"
                     aria-hidden="true"
                     sx={{ borderColor: theme.palette.primary.main }}
                  />
               </Grid2>
               <Grid2 container columns={24} justifyContent={"center"} xs={24}>
                  {enemyAtoms.map((atom) => {
                     return (
                        <Grid2 key={atom.toString()} xs={12} sm={8} lg={6}>
                           <DebriefingEntityCard
                              entityAtom={atom}
                              direction="vertical"
                           />
                        </Grid2>
                     )
                  })}
               </Grid2>
            </Grid2>

            {/** Party section
             *
             */}
            <Grid2 xs={12} container columns={24}>
               <Grid2 xs={24}>
                  <Typography variant="h5" textAlign={"center"}>
                     Party
                  </Typography>

                  <Divider
                     variant="middle"
                     color="primary"
                     aria-hidden="true"
                     sx={{ borderColor: theme.palette.primary.main }}
                  />
               </Grid2>
               <Grid2 container columns={24} alignItems="end">
                  {characterAtoms.map((atom) => {
                     return (
                        <Grid2 key={atom.toString()} xs={12} sm={8} lg={6}>
                           <Box component="div">
                              <DebriefingEntityCard
                                 entityAtom={atom}
                                 direction="vertical"
                              />
                           </Box>
                        </Grid2>
                     )
                  })}
               </Grid2>
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
