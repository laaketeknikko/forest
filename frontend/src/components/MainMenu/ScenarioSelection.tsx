import { useAtom } from "jotai"
import { allScenarioConfigsAtom } from "../../game/state/jotai/scenarios"
import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { ScenarioInfoCard } from "./ScenarioInfoCard"

import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import Grid from "@mui/material/Unstable_Grid2"
import { ScenarioDetails } from "./ScenarioDetails"
import { SetNavigationState } from "./types"
import { useState } from "react"

interface ScenerioSelectionProps {
   setNavigationState: SetNavigationState
}

const ScenarioSelection = ({ setNavigationState }: ScenerioSelectionProps) => {
   const [allScenarioConfigs] = useAtom(allScenarioConfigsAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [, setScenarioSelected] = useState(false)

   const handleScenerioSelected = () => {
      setScenarioSelected(true)
      setNavigationState(true)
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
