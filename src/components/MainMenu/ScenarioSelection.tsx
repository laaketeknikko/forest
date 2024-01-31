import Box from "@mui/material/Box"

import { useAtom } from "jotai"
import { allScenarioConfigsAtom } from "../../game/state/jotai/scenarios"
import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { ScenarioInfoCard } from "./ScenarioInfoCard"

import Stack from "@mui/material/Stack"
import { List } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"

const ScenarioSelection = () => {
   const [allScenarioConfigs] = useAtom(allScenarioConfigsAtom)
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   return (
      <List sx={{ overflowY: "scroll", height: "100vh" }}>
         {allScenarioConfigs.map((config) => {
            return <ScenarioInfoCard scenarioInfo={config} key={config.id} />
         })}
      </List>
   )
}

export { ScenarioSelection }
