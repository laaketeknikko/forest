import { useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import Grid from "@mui/material/Unstable_Grid2"
import { ScenarioDetails } from "./ScenarioDetails"
import Box from "@mui/material/Box"
import { ScenarioList } from "./ScenarioList"

/**
 * The main scenario selection component.
 *
 * Contains the list of scenarios and the scenario details of
 * selected scenario.
 *
 * Calls setNavigationState(true) when scenario selected. The selected scenario is set
 * in selectedScenarioConfigAtom.
 */
const ScenarioSelection = () => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   return (
      <Box component="div">
         <Grid container>
            <Grid xs={4} md={3}>
               <ScenarioList />
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
