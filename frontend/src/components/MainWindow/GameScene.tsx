import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TurnOrderView } from "./TurnOrderView/TurnOrderView"
import { Suspense, useState } from "react"
import { R3FCanvasWrapper } from "../r3f/R3FCanvasWrapper"
import { SelectedCharacterCards } from "./SelectedCharacterCards/SelectedCharacterCards"

import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Drawer from "@mui/material/Drawer"

import { CharacterPopupInfo } from "./CharacterPopupInfo"
import { SaveGame } from "../MainMenu/SaveGame"
import { LoadGame } from "../MainMenu/LoadGame"
import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { GlobalExecutionState } from "../../config/types"

const GameScene = () => {
   const [showInGameMenu, setShowInGameMenu] = useState(false)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   const handleGameLoaded = (startGame: boolean) => {
      if (startGame) {
         setGameExecutionState({
            ...gameExecutionState,
            global: GlobalExecutionState.running,
         })
      }
   }

   return (
      <>
         <Drawer
            anchor="left"
            open={showInGameMenu}
            onClose={() => setShowInGameMenu(false)}
         >
            <SaveGame />
            <LoadGame startGame={handleGameLoaded} />
         </Drawer>
         <Grid container columns={24} sx={{ height: "100vh" }}>
            <Grid xs={2} item>
               <Paper elevation={1} sx={{ height: "100%" }}>
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
            <Grid xs={16} lg={18} xl={19} item style={{ position: "relative" }}>
               <div
                  style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     zIndex: 100,
                  }}
               >
                  <CharacterPopupInfo />
               </div>

               <Suspense>
                  <R3FCanvasWrapper />
               </Suspense>
            </Grid>
            <Grid xs={6} lg={4} xl={3} item>
               <Paper elevation={1} sx={{ height: "100%" }}>
                  <SelectedCharacterCards />
               </Paper>
            </Grid>
         </Grid>
      </>
   )
}

export { GameScene }
