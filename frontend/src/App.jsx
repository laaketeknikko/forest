import Grid from "@mui/material/Unstable_Grid2"
import { Suspense } from "react"

import { allPlayerCharactersAtom } from "./game/state/jotai/characters"

import { useAtom } from "jotai"
import { R3FCanvasWrapper } from "./components/r3f/R3FCanvasWrapper"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"

import { SelectedCharacterCards } from "./components/MainWindow/SelectedCharacterCards/SelectedCharacterCards"
import { TurnOrderView } from "./components/MainWindow/TurnOrderView/TurnOrderView"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { useInitializeGameState } from "./game/hooks/useInitializeGameState"

function App() {
   const [allCharacters] = useAtom(allPlayerCharactersAtom)
   const [showMainMenu, setShowMainMenu] = useState(true)

   useEffect(() => {
      console.log("all characteres", allCharacters)
   }, [allCharacters])

   useInitializeGameState()

   // TODO: IMplement changing the active action when action performed.
   const onActionTriggered = () => {
      console.log("Action triggered")
   }

   return (
      <Grid container sx={{ height: "100vh" }}>
         <Grid xs={1}>
            <Paper elevation={1} sx={{ height: "100%" }}>
               <TurnOrderView />
            </Paper>
         </Grid>
         <Grid xs={9}>
            {!showMainMenu && (
               <Suspense>
                  <R3FCanvasWrapper />
               </Suspense>
            )}
            {showMainMenu && <MainMenu />}
         </Grid>
         <Grid xs={2}>
            <Paper elevation={1} sx={{ height: "100%" }}>
               <SelectedCharacterCards onActionTriggered={onActionTriggered} />
            </Paper>
         </Grid>
      </Grid>
   )
}

export { App }
