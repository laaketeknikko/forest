import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TurnOrderView } from "./TurnOrderView/TurnOrderView"
import { Suspense, useEffect, useState } from "react"
import { R3FCanvasWrapper } from "../r3f/R3FCanvasWrapper"
import { SelectedCharacterCards } from "./SelectedCharacterCards/SelectedCharacterCards"

import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Drawer from "@mui/material/Drawer"

import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import {
   GlobalExecutionState,
   MainWindowDisplayStatus,
} from "../../config/types"
import { useScenarioVictoryConditions } from "../../game/hooks/useScenarioVictoryConditions"

import { PopupInfo } from "./PopupInfo.tsx/PopupInfo"
import { useScenarioLossConditions } from "../../game/hooks/useScenarioLossConditions"
import { InGameMenu } from "./InGameMenu.tsx/InGameMenu"
import { useScenarioStatsUpdater } from "../../game/hooks/useScenarioStatsUpdater"

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
 *    conditions state in save config
 * - an effect in GameScene subscribes to victory and loss conditions.
 *    If either is met, it marks the scenario as won or lost
 * - useScenarioStatsUpdater is subscribed to the scenario state
 *    changes. It checks whether scenario is won or lost.
 *    If either is true, it updates the scenario statistics and marks
 *    the result as recorded
 * - finally, if the scenario result is recorded, an effect in GameScene
 *    marks the game execution state as stopped and shows
 *    after-scenario scene.
 */
const GameScene = () => {
   const [showInGameMenu, setShowInGameMenu] = useState(false)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const victoryConditions = useScenarioVictoryConditions()
   const lossConditions = useScenarioLossConditions()
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

   useEffect(() => {
      if (
         victoryConditions.allConditionsMet &&
         !gameExecutionState.scenario.won
      ) {
         setGameExecutionState({
            ...gameExecutionState,
            scenario: {
               ...gameExecutionState.scenario,
               won: true,
            },
         })
      } else if (
         lossConditions.isLossConditionMet &&
         !gameExecutionState.scenario.lost
      ) {
         setGameExecutionState({
            ...gameExecutionState,
            scenario: {
               ...gameExecutionState.scenario,
               lost: true,
            },
         })
      }
   }, [
      gameExecutionState,
      lossConditions.isLossConditionMet,
      setGameExecutionState,
      victoryConditions.allConditionsMet,
   ])

   return (
      <>
         <Drawer
            PaperProps={{
               sx: {
                  width: "50vw",
               },
            }}
            anchor="left"
            open={showInGameMenu}
            onClose={() => setShowInGameMenu(false)}
         >
            <InGameMenu />
         </Drawer>

         {/** In-game menu button and turn order */}
         <Grid container columns={36} sx={{ height: "100vh" }}>
            <Grid xs={4} md={3} lg={2} item>
               <Paper elevation={0} sx={{ height: "100vh", overflowY: "auto" }}>
                  <IconButton
                     sx={{
                        width: "100%",
                     }}
                     color="primary"
                     onClick={() => setShowInGameMenu(true)}
                     className="in-game-menu-button"
                  >
                     <MenuIcon
                        sx={{
                           height: "100%",
                           width: "100%",
                           fontSize: "100%",
                           margin: 0,
                           padding: 0,
                        }}
                     />
                  </IconButton>

                  <TurnOrderView />
               </Paper>
            </Grid>

            {/**Main game scene */}
            <Grid
               xs={22}
               sm={23}
               md={25}
               lg={28}
               xl={29}
               item
               style={{ position: "relative" }}
            >
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

               <Suspense>
                  <R3FCanvasWrapper />
               </Suspense>
            </Grid>

            {/** Cards display */}
            <Grid xs={10} sm={9} md={8} lg={6} xl={5} item>
               <Paper elevation={1} sx={{ height: "100%" }}>
                  <SelectedCharacterCards />
               </Paper>
            </Grid>
         </Grid>
      </>
   )
}

export { GameScene }
