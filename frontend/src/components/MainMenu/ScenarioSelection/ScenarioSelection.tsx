import { useAtom } from "jotai"
import { allScenarioConfigsAtom } from "../../../game/state/jotai/scenarios"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { ScenarioInfoCard } from "./ScenarioInfoCard"

import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import Grid from "@mui/material/Unstable_Grid2"
import { ScenarioDetails } from "./ScenarioDetails"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"
import { useIsScenarioSelectable } from "../../../hooks/useIsScenarioSelectable"

/**
 * Calls setNavigationState(true) when scenario selected. The selected scenario is set
 * in selectedScenarioConfigAtom.
 
 */
const ScenarioSelection = () => {
   const [allScenarioConfigs] = useAtom(allScenarioConfigsAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   const { isScenarioSelectable } = useIsScenarioSelectable()

   const handleScenerioSelected = () => {
      setGameExecutionState({
         ...gameExecutionState,
         mainMenu: {
            ...gameExecutionState.mainMenu,
            scenarioSelected: true,
         },
      })
   }

   return (
      <Paper>
         <Grid container>
            <Grid xs={3}>
               <List sx={{ overflowY: "scroll", height: "100vh" }}>
                  {allScenarioConfigs.map((config) => {
                     return (
                        <ScenarioInfoCard
                           setScenarioSelected={handleScenerioSelected}
                           scenarioInfo={config}
                           key={config._id}
                           isSelectable={isScenarioSelectable(config)}
                        />
                     )
                  })}
               </List>
            </Grid>
            <Grid
               xs={9}
               sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                  overflowY: "scroll",
               }}
            >
               <ScenarioDetails scenarioConfig={selectedScenarioConfig} />
            </Grid>
         </Grid>
      </Paper>
   )
}

export { ScenarioSelection }
