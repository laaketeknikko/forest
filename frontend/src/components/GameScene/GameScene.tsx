import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TurnOrderView } from "./TurnOrderView/TurnOrderView"
import { Suspense, useEffect } from "react"
import { R3FCanvasWrapper } from "../r3f/R3FCanvasWrapper"
import { SelectedCharacterCards } from "./SelectedCharacterCards/SelectedCharacterCards"

import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import {
   GlobalExecutionState,
   MainWindowDisplayStatus,
} from "../../config/types"
import { useScenarioVictoryConditions } from "../../game/hooks/useScenarioVictoryConditions"

import { PopupInfo } from "./PopupInfo.tsx/PopupInfo"
import { useScenarioLossConditions } from "../../game/hooks/useScenarioLossConditions"

import { useScenarioStatsUpdater } from "../../game/hooks/useScenarioStatsUpdater"
import Box from "@mui/material/Box"
import { InGameMenuToggle } from "./InGameMenu.tsx/InGameMenuToggle"
import Typography from "@mui/material/Typography"

/**
 * Top level wrapper when game is running. Contains three main components:
 * - Turn order
 * - The game scene (the canvas)
 * - Action card list
 *
 * Also contains a MUI/drawer to display in-game menu.
 *
 * GameScene is the main component keeping track of the scenario state
 * and whether scenario should end or not.
 *
 * A few hooks are involved in updating the state:
 * - useScenarioVictoryConditions
 * - useScenarioLossConditions
 * - useScenarioStatsUpdater
 *
 * We only have victory and one loss condition type. The hooks keep
 * track of these by subscribing to the relevant states
 * (such as defeatedEnemies).
 *
 * The update sequence as is follows:
 * - First a victory or loss condition dependency changes,
 *    such as defeatedEnemies array being modified
 * - useVictory- or useLossCondition hook updates the scenario
 *    conditions state in save config and marks scenario as lost or won
 * - useScenarioStatsUpdater is subscribed to the scenario state
 *    changes. It checks whether scenario is won or lost.
 *    If either is true, it updates the scenario statistics and marks
 *    the result as recorded
 * - finally, if the scenario result is recorded, an effect in GameScene
 *    marks the game execution state as stopped and shows
 *    after-scenario scene.
 */
const GameScene = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   useScenarioVictoryConditions()
   useScenarioLossConditions()
   useScenarioStatsUpdater()

   useEffect(() => {
      if (gameExecutionState.scenario.resultRecorded) {
         setGameExecutionState({
            ...gameExecutionState,
            global: GlobalExecutionState.stopped,
            mainDisplay: MainWindowDisplayStatus.showDebriefing,
         })
      }
   }, [gameExecutionState, setGameExecutionState])

   return (
      <>
         {/** In-game menu button and turn order
          *
          */}
         <Grid container columns={36} sx={{ height: "100vh" }}>
            <Grid xs={4} md={3} lg={2} item>
               <Paper elevation={0} sx={{ height: "100vh", overflowY: "auto" }}>
                  <InGameMenuToggle />
                  <TurnOrderView />
               </Paper>
            </Grid>

            {/**Main game scene
             *
             */}
            <Grid
               xs={22}
               sm={23}
               md={25}
               lg={28}
               xl={29}
               item
               style={{ position: "relative" }}
            >
               {/**
                * Position popup info on top of scene
                */}
               <div
                  style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     zIndex: 100,
                  }}
               >
                  <PopupInfo />
               </div>

               <Suspense
                  fallback={
                     <Typography variant="h3" textAlign="center">
                        Starting game...
                     </Typography>
                  }
               >
                  <R3FCanvasWrapper />
               </Suspense>
            </Grid>

            {/** Cards display
             *
             */}
            <Grid xs={10} sm={9} md={8} lg={6} xl={5} item>
               <Box component="div" sx={{ height: "100%" }}>
                  <SelectedCharacterCards />
               </Box>
            </Grid>
         </Grid>
      </>
   )
}

export { GameScene }
