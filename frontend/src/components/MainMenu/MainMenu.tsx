import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Tab from "@mui/material/Tab"
import Grid from "@mui/material/Unstable_Grid2"
import { useAtom } from "jotai"
import { useCallback, useEffect, useState } from "react"
import { ZSaveConfig } from "../../../../shared/types/types"
import {
   GlobalExecutionState,
   MainWindowDisplayStatus,
} from "../../config/types"
import { useInitializeNewScenario } from "../../game/hooks/useInitializeNewScenario"
import { useSaveGame } from "../../game/hooks/useSaveGame"
import { gameExecutionStateAtom } from "../../game/state/jotai/gameState"
import { CharacterSelection } from "./CharacterSelection/CharacterSelection"
import { NewGame } from "./NewGame"
import { ScenarioSelection } from "./ScenarioSelection/ScenarioSelection"
import { ScenarioStartConfirmation } from "./ScenarioStartConfirmation"

/**
 * The main menu wrapper component.
 *
 * Contains the tabs for main menu navigation, and the contents
 * of the tabs.
 */
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
   const startNewScenario = useCallback(
      (value: boolean) => {
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
      },
      [gameExecutionState, initializeScenario, saveGame, setGameExecutionState]
   )

   /**
    * Called when starting scenario from load button.
    *
    */
   const startLoadedScenario = useCallback(
      (start: boolean, saveData: ZSaveConfig) => {
         if (start) {
            if (saveData.isScenarioInProgress) {
               setGameExecutionState({
                  ...gameExecutionState,
                  global: GlobalExecutionState.running,
                  mainDisplay: MainWindowDisplayStatus.showGameScene,
                  mainMenu: {
                     ...gameExecutionState.mainMenu,
                     scenarioStarted: start,
                  },
               })
            } else {
               setGameExecutionState({
                  ...gameExecutionState,
                  global: GlobalExecutionState.stopped,
                  mainDisplay: MainWindowDisplayStatus.showMainMenu,
                  mainMenu: {
                     scenarioStarted: false,
                     gameConfigLoaded: true,
                     scenarioSelected: false,
                     charactersSelected: false,
                     showMainmenu: true,
                  },
               })
            }
         }
      },
      [gameExecutionState, setGameExecutionState]
   )

   return (
      <Container
         sx={{
            height: "100%",

            padding: "0 !important",
         }}
      >
         <Paper sx={{ height: "100%", margin: 0, padding: 0 }}>
            <TabContext value={chosenTab}>
               <Grid container alignItems={"center"} height={"100%"}>
                  <Grid
                     xs={2}
                     sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                     }}
                  >
                     {/**
                      * Tab buttons list.
                      */}
                     <TabList
                        onChange={(_e, newTab) => setChosenTab(newTab)}
                        orientation="vertical"
                     >
                        <Tab
                           label="Main Menu"
                           value="0"
                           sx={{ margin: 2, padding: 2 }}
                        ></Tab>

                        <Tab
                           label="Select scenario"
                           value="1"
                           disabled={
                              !gameExecutionState.mainMenu.gameConfigLoaded
                           }
                           sx={{ margin: 2, padding: 2 }}
                        ></Tab>

                        <Tab
                           label="Select characters"
                           value="2"
                           disabled={
                              !gameExecutionState.mainMenu.scenarioSelected
                           }
                           sx={{ margin: 2, padding: 2 }}
                        ></Tab>

                        <Tab
                           label="Confirm"
                           value="3"
                           disabled={
                              !gameExecutionState.mainMenu.charactersSelected
                           }
                           sx={{ margin: 2, padding: 2 }}
                        ></Tab>
                     </TabList>
                  </Grid>

                  {/**
                   * Tab contents.
                   */}
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
                        sx={{
                           width: "100%",
                           maxWidth: "40rem",
                           margin: 0,
                           padding: 0,
                        }}
                     >
                        <NewGame startLoadedScenario={startLoadedScenario} />
                     </TabPanel>

                     <TabPanel value="1" sx={{ margin: 0, padding: 0 }}>
                        <ScenarioSelection />
                     </TabPanel>

                     <TabPanel
                        value="2"
                        sx={{ margin: 0, marginRight: 2, padding: 0 }}
                     >
                        <CharacterSelection />
                     </TabPanel>

                     <TabPanel
                        value="3"
                        sx={{
                           height: "100%",
                           overflowY: "scroll",
                           overflowX: "hidden",
                           margin: 0,
                           marginRight: 2,
                           padding: 0,
                        }}
                     >
                        <ScenarioStartConfirmation
                           setNavigationState={startNewScenario}
                        />
                     </TabPanel>
                  </Grid>
               </Grid>
            </TabContext>
         </Paper>
      </Container>
   )
}

export { MainMenu }
