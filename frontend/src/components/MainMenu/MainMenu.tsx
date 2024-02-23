import Paper from "@mui/material/Paper"

import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Unstable_Grid2"

import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"

import { useEffect, useState } from "react"

import { NewGame } from "./NewGame"
import { ScenarioSelection } from "./ScenarioSelection/ScenarioSelection"
import { CharacterSelection } from "./CharacterSelection/CharacterSelection"
import { ScenarioStartConfirmation } from "./ScenarioStartConfirmation"
import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import {
   GlobalExecutionState,
   MainWindowDisplayStatus,
} from "../../config/types"
import { useAtom } from "jotai"
import { useInitializeNewScenario } from "../../game/hooks/useInitializeNewScenario"
import { useSaveGame } from "../../game/hooks/useSaveGame"

const MainMenu = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const [chosenTab, setChosenTab] = useState("0")
   const initializeScenario = useInitializeNewScenario()
   const saveGame = useSaveGame()

   /**
    * Switch to scenario selection automatically when new game config loaded.
    */
   useEffect(() => {
      if (gameExecutionState.mainMenu.gameConfigLoaded) {
         setChosenTab("1")
      }
   }, [gameExecutionState.mainMenu.gameConfigLoaded])

   /**
    * Called when starting new scenario by going through main menu.
    *
    */
   const startNewScenario = (value: boolean) => {
      if (!initializeScenario()) {
         throw new Error("Error initializing scenario.")
      }
      saveGame.updateSaveData({
         isScenarioInProgress: true,
      })

      setGameExecutionState({
         ...gameExecutionState,
         global: GlobalExecutionState.running,
         mainDisplay: MainWindowDisplayStatus.showGameScene,
         mainMenu: {
            ...gameExecutionState.mainMenu,
            scenarioStarted: value,
         },
      })
   }

   /**
    * Called when starting scenario from load button.
    *
    */
   const startLoadedScenario = (value: boolean) => {
      saveGame.updateSaveData()
      saveGame.setScenarioInProgress(true)
      setGameExecutionState({
         ...gameExecutionState,
         global: GlobalExecutionState.running,
         mainDisplay: MainWindowDisplayStatus.showGameScene,
         mainMenu: {
            ...gameExecutionState.mainMenu,
            scenarioStarted: value,
         },
      })
   }

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
                        <Tab label="Main Menu" value="0"></Tab>

                        <Tab
                           label="Select scenario"
                           value="1"
                           disabled={
                              !gameExecutionState.mainMenu.gameConfigLoaded
                           }
                        ></Tab>

                        <Tab
                           label="Select characters"
                           value="2"
                           disabled={
                              !gameExecutionState.mainMenu.scenarioSelected
                           }
                        ></Tab>

                        <Tab
                           label="Confirmation"
                           value="3"
                           disabled={
                              !gameExecutionState.mainMenu.charactersSelected
                           }
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
                     <TabPanel
                        value="0"
                        sx={{ width: "100%", maxWidth: "40rem" }}
                     >
                        <NewGame startLoadedScenario={startLoadedScenario} />
                     </TabPanel>
                     <TabPanel value="1">
                        <ScenarioSelection />
                     </TabPanel>
                     <TabPanel value="2">
                        <CharacterSelection />
                     </TabPanel>
                     <TabPanel
                        value="3"
                        sx={{ height: "100%", overflowY: "scroll" }}
                     >
                        <ScenarioStartConfirmation
                           setNavigationState={startNewScenario}
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
