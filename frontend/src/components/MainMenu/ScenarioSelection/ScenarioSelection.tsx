import { useAtom } from "jotai"
import { allScenarioConfigsAtom } from "../../../game/state/jotai/scenarios"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { ScenarioInfoCard } from "./ScenarioInfoCard"

import List from "@mui/material/List"
import Grid from "@mui/material/Unstable_Grid2"
import { ScenarioDetails } from "./ScenarioDetails"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"
import { useIsScenarioSelectable } from "../../../hooks/useIsScenarioSelectable"
import { useCallback, useEffect } from "react"
import Box from "@mui/material/Box"
import { theme } from "../../../styles/mui/theme"

/**
 * Calls setNavigationState(true) when scenario selected. The selected scenario is set
 * in selectedScenarioConfigAtom.
 
 */
const ScenarioSelection = () => {
   const [allScenarioConfigs] = useAtom(allScenarioConfigsAtom)
   const [selectedScenarioConfig, setSelectedScenarioConfig] = useAtom(
      selectedScenarioConfigAtom
   )
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   const { isScenarioSelectable } = useIsScenarioSelectable()

   /**
    * Currently don't support unselecting scenarios.
    */
   const handleScenarioSelected = useCallback(() => {
      if (!gameExecutionState.mainMenu.scenarioSelected) {
         setGameExecutionState({
            ...gameExecutionState,
            mainMenu: {
               ...gameExecutionState.mainMenu,
               scenarioSelected: true,
            },
         })
      }
   }, [gameExecutionState, setGameExecutionState])

   useEffect(() => {
      setSelectedScenarioConfig(allScenarioConfigs[0])
      handleScenarioSelected()
   }, [allScenarioConfigs, handleScenarioSelected, setSelectedScenarioConfig])

   return (
      <Box component="div">
         <Grid container>
            <Grid xs={4} md={3}>
               <List sx={{ overflowY: "auto", height: "100vh" }}>
                  {allScenarioConfigs.map((config) => {
                     return (
                        <Box
                           component="div"
                           key={config._id}
                           sx={{
                              borderStyle: "solid",
                              borderColor: theme.palette.primary.main,
                              borderRadius: "1rem",
                              borderWidth:
                                 config.name === selectedScenarioConfig.name
                                    ? 1
                                    : 0,

                              padding:
                                 config.name === selectedScenarioConfig.name
                                    ? 3
                                    : 0,
                           }}
                        >
                           <ScenarioInfoCard
                              setScenarioSelected={handleScenarioSelected}
                              scenarioInfo={config}
                              isSelectable={isScenarioSelectable(config)}
                           />
                        </Box>
                     )
                  })}
               </List>
            </Grid>
            <Grid
               xs={8}
               md={9}
               sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                  overflowY: "auto",
               }}
            >
               <ScenarioDetails scenarioConfig={selectedScenarioConfig} />
            </Grid>
         </Grid>
      </Box>
   )
}

export { ScenarioSelection }
