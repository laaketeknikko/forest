import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TurnOrderView } from "./TurnOrderView/TurnOrderView"
import { Suspense, useEffect, useState } from "react"
import { R3FCanvasWrapper } from "../r3f/R3FCanvasWrapper"
import { SelectedCharacterCards } from "./SelectedCharacterCards/SelectedCharacterCards"

import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Drawer from "@mui/material/Drawer"

import { SaveGame } from "../MainMenu/SaveGame"
import { LoadGame } from "../MainMenu/LoadGame"
import {
   activeSaveGameConfigAtom,
   gameExecutionStateAtom,
} from "../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import {
   GlobalExecutionState,
   MainWindowDisplayStatus,
} from "../../config/types"
import { useScenarioVictoryConditions } from "../../game/hooks/useScenarioVictoryConditions"
import { ZSaveConfigScenarioStatistics } from "../../../../shared/types/types"
import { PopupInfo } from "./PopupInfo.tsx/PopupInfo"
import { useScenarioLossConditions } from "../../game/hooks/useScenarioLossConditions"

/**
 * Top level wrapper when game is running. Contains three main components:
 * - Turn order
 * - The game scene (the canvas)
 * - Action card list
 *
 * Also contains a MUI/drawer to display in-game menu.
 */
const GameScene = () => {
   const [showInGameMenu, setShowInGameMenu] = useState(false)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const victoryConditions = useScenarioVictoryConditions()
   const lossConditions = useScenarioLossConditions()
   const [saveGame, setSaveGame] = useAtom(activeSaveGameConfigAtom)

   // TODO: Move this somewhere.
   useEffect(() => {
      if (
         !(gameExecutionState.scenario.won || gameExecutionState.scenario.lost)
      ) {
         let scenarioStat: ZSaveConfigScenarioStatistics | undefined =
            saveGame.scenarioStatistics.find((stat) => {
               return stat.scenarioName === saveGame.scenario.name
            })
         if (!scenarioStat) {
            scenarioStat = {
               scenarioName: saveGame.scenario.name,
               wins: 0,
               losses: 0,
               timesAttempted: 0,
            }
         }

         let scenarioWon = victoryConditions.allConditionsMet()

         let scenarioLost = lossConditions.isConditionMet()

         if (scenarioWon || scenarioLost) {
            scenarioStat.timesAttempted++

            if (scenarioWon) {
               scenarioStat.wins++
               scenarioWon = true
               /** If you won, you can't lose */
               scenarioLost = false
            } else if (scenarioLost) {
               scenarioStat.losses++
               scenarioLost = true
            }

            setSaveGame({
               ...saveGame,
               scenarioStatistics: [
                  ...saveGame.scenarioStatistics.filter((stat) => {
                     stat.scenarioName !== scenarioStat?.scenarioName
                  }),
                  scenarioStat,
               ],
            })
            setGameExecutionState({
               ...gameExecutionState,
               global: GlobalExecutionState.stopped,
               mainDisplay: MainWindowDisplayStatus.showDebriefing,
               scenario: {
                  won: scenarioWon,
                  lost: scenarioLost,
               },
            })
         }
      }
   }, [
      gameExecutionState,
      lossConditions,
      saveGame,
      setGameExecutionState,
      setSaveGame,
      victoryConditions,
   ])

   const handleGameLoaded = (startGame: boolean) => {
      if (startGame) {
         setGameExecutionState({
            ...gameExecutionState,
            global: GlobalExecutionState.running,
            mainDisplay: MainWindowDisplayStatus.showGameScene,
         })
      }
   }

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
            <SaveGame />
            <LoadGame startGame={handleGameLoaded} />
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
