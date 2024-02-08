import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TurnOrderView } from "./TurnOrderView/TurnOrderView"
import { Suspense, useState } from "react"
import { R3FCanvasWrapper } from "../r3f/R3FCanvasWrapper"
import { SelectedCharacterCards } from "./SelectedCharacterCards/SelectedCharacterCards"

import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Drawer from "@mui/material/Drawer"
import { InGameMenu } from "./InGameMenu"

const GameScene = () => {
   const [showInGameMenu, setShowInGameMenu] = useState(false)

   return (
      <>
         <Drawer
            anchor="left"
            open={showInGameMenu}
            onClose={() => setShowInGameMenu(false)}
         >
            <InGameMenu />
         </Drawer>
         <Grid container sx={{ height: "100vh" }}>
            <Grid xs={1} item>
               <Paper elevation={1} sx={{ height: "100%" }}>
                  <IconButton
                     sx={{
                        width: "100%",
                     }}
                     color="primary"
                     onClick={() => setShowInGameMenu(true)}
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
      </>
   )
}

export { GameScene }
