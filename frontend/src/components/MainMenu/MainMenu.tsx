import Paper from "@mui/material/Paper"

import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Unstable_Grid2"

import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"

import { useState } from "react"

import { NewGame } from "./NewGame"
import { ScenarioSelection } from "./ScenarioSelection"
import { CharacterSelection } from "./CharacterSelection/CharacterSelection"
import { ScenarioStartConfirmation } from "./ScenarioStartConfirmation"

const MainMenu = () => {
   const [chosenTab, setChosenTab] = useState("0")

   const [gameConfigLoaded, setGameConfigLoaded] = useState(false)
   const [scenarioSelected, setScenarioSelected] = useState(false)
   const [charactersSelected, setCharactersSelected] = useState(false)
   const [, setScenarioStarted] = useState(false)

   return (
      <Box component="div" sx={{ height: "100%" }}>
         <Paper sx={{ height: "100%" }}>
            <TabContext value={chosenTab}>
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
                     <TabList
                        onChange={(_e, newTab) => setChosenTab(newTab)}
                        orientation="vertical"
                     >
                        <Tab label="New game" value="0"></Tab>
                        <Tab
                           label="Select scenario"
                           value="1"
                           disabled={!gameConfigLoaded}
                        ></Tab>
                        <Tab
                           label="Select characters"
                           value="2"
                           disabled={!scenarioSelected}
                        ></Tab>
                        <Tab
                           label="Start scenario"
                           value="3"
                           disabled={!charactersSelected}
                        ></Tab>
                     </TabList>
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
                     <TabPanel value="0">
                        <NewGame setNavigationState={setGameConfigLoaded} />
                     </TabPanel>
                     <TabPanel value="1">
                        <ScenarioSelection
                           setNavigationState={setScenarioSelected}
                        />
                     </TabPanel>
                     <TabPanel value="2">
                        <CharacterSelection
                           setNavigationState={setCharactersSelected}
                        />
                     </TabPanel>
                     <TabPanel
                        value="3"
                        sx={{ height: "100%", overflowY: "scroll" }}
                     >
                        <ScenarioStartConfirmation
                           setNavigationState={setScenarioStarted}
                        />
                     </TabPanel>
                  </Grid>
               </Grid>
            </TabContext>
         </Paper>
      </Box>
   )
}

export { MainMenu }
