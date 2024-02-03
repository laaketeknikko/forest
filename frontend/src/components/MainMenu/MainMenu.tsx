import Paper from "@mui/material/Paper"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Unstable_Grid2"

import { useState } from "react"

import { NewGame } from "./NewGame"
import { ScenarioSelection } from "./ScenarioSelection"
import { CharacterSelection } from "./CharacterSelection/CharacterSelection"

const MainMenu = () => {
   const [chosenTab, setChosenTab] = useState(0)

   return (
      <Box component="div" sx={{ height: "100%" }}>
         <Paper sx={{ height: "100%" }}>
            <Grid container sx={{ height: "100%" }}>
               <Grid
                  xs={2}
                  sx={{
                     height: "100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  <Tabs
                     value={chosenTab}
                     onChange={(_e, newTab) => setChosenTab(newTab)}
                     orientation="vertical"
                  >
                     <Tab label="New game"></Tab>
                     <Tab label="Scenario selection"></Tab>
                     <Tab label="Character selection"></Tab>
                  </Tabs>
               </Grid>
               <Grid
                  xs={10}
                  sx={{
                     height: "100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  {chosenTab === 0 && <NewGame />}
                  {chosenTab === 1 && <ScenarioSelection />}
                  {chosenTab === 2 && <CharacterSelection />}
               </Grid>
            </Grid>
         </Paper>
      </Box>
   )
}

export { MainMenu }
