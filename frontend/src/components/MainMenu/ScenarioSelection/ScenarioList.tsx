import List from "@mui/material/List"
import Box from "@mui/material/Box"
import { useCallback, useEffect } from "react"
import { theme } from "../../../styles/mui/theme"
import { ScenarioInfoCard } from "./ScenarioInfoCard"
import { useIsScenarioSelectable } from "../../../hooks/useIsScenarioSelectable"
import { useAtom } from "jotai"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"
import {
   allScenarioConfigsAtom,
   selectedScenarioConfigAtom,
} from "../../../game/state/jotai/scenarios"

const ScenarioList = () => {
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

   /** Select first scenario on load. */
   useEffect(() => {
      setSelectedScenarioConfig(allScenarioConfigs[0])
      handleScenarioSelected()
   }, [allScenarioConfigs, handleScenarioSelected, setSelectedScenarioConfig])

   return (
      <List sx={{ overflowY: "auto", height: "100vh" }}>
         {allScenarioConfigs.map((config) => {
            return (
               /** Add border if scenario selected */
               <Box
                  component="div"
                  key={config._id}
                  sx={{
                     borderStyle: "solid",
                     borderColor: theme.palette.primary.main,
                     borderRadius: "1rem",
                     borderWidth:
                        config.name === selectedScenarioConfig.name ? 1 : 0,

                     padding:
                        config.name === selectedScenarioConfig.name ? 3 : 0,
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
   )
}

export { ScenarioList }
