import { useAtom } from "jotai"
import { allScenarioConfigsAtom } from "../../game/state/jotai/scenarios"
import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { ScenarioInfoCard } from "./ScenarioInfoCard"

import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import Grid from "@mui/material/Unstable_Grid2"
import { ScenarioDetails } from "./ScenarioDetails"

const ScenarioSelection = () => {
   const [allScenarioConfigs] = useAtom(allScenarioConfigsAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   return (
      <Paper>
         <Grid container>
            <Grid xs={3}>
               <List sx={{ overflowY: "scroll", height: "100vh" }}>
                  {allScenarioConfigs.map((config) => {
                     return (
                        <ScenarioInfoCard
                           scenarioInfo={config}
                           key={config.id}
                        />
                     )
                  })}
               </List>
            </Grid>
            <Grid
               xs={9}
               sx={{ alignItems: "center", justifyContent: "center" }}
            >
               <ScenarioDetails scenarioConfig={selectedScenarioConfig} />
            </Grid>
         </Grid>
      </Paper>
   )
}

export { ScenarioSelection }
