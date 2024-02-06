import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TurnOrderView } from "./TurnOrderView/TurnOrderView"
import { Suspense } from "react"
import { R3FCanvasWrapper } from "../r3f/R3FCanvasWrapper"
import { SelectedCharacterCards } from "./SelectedCharacterCards/SelectedCharacterCards"

const GameScene = () => {
   return (
      <Grid container sx={{ height: "100vh" }}>
         <Grid xs={1} item>
            <Paper elevation={1} sx={{ height: "100%" }}>
               <TurnOrderView />
            </Paper>
         </Grid>
         <Grid xs={9} item>
            <Suspense>
               <R3FCanvasWrapper />
            </Suspense>
         </Grid>
         <Grid xs={2} item>
            <Paper elevation={1} sx={{ height: "100%" }}>
               <SelectedCharacterCards />
            </Paper>
         </Grid>
      </Grid>
   )
}

export { GameScene }
