import Paper from "@mui/material/Paper"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Unstable_Grid2"

import { useState } from "react"

import { NewGame } from "./NewGame"
import { ScenarioSelection } from "./ScenarioSelection"
import { CharacterSelection } from "./CharacterSelection"

const MainMenu = () => {
   const [chosenTab, setChosenTab] = useState(0)

   return (
      <Box component="div" sx={{ height: "100%" }}>
         <Paper sx={{ height: "100%" }}>
            <Grid container sx={{ height: "100%" }}>
               <Grid
                  xs={3}
                  sx={{
                     height: "100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <Box component="div">
                     <Tabs
                        value={chosenTab}
                        onChange={(_e, newTab) => setChosenTab(newTab)}
                        orientation="vertical"
                     >
                        <Tab label="New game"></Tab>
                        <Tab label="Scenario selection"></Tab>
                        <Tab label="Character selection"></Tab>
                     </Tabs>
                  </Box>
               </Grid>
               <Grid
                  xs={9}
                  sx={{
                     height: "100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  {chosenTab === 0 && (
                     <Box component="div">
                        <NewGame />
                     </Box>
                  )}
                  {chosenTab === 1 && (
                     <Box component="div">
                        <ScenarioSelection />
                     </Box>
                  )}
                  {chosenTab === 2 && (
                     <Box component="div">
                        <CharacterSelection />
                     </Box>
                  )}
               </Grid>
            </Grid>
         </Paper>
      </Box>
   )
}

export { MainMenu }
