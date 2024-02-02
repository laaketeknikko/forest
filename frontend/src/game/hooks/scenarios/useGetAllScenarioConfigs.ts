import { allScenarioConfigsAtom } from "../../state/jotai/scenarios"
import { scenarioConfigFolders } from "../../../config/paths"
import { useAtom } from "jotai"
import { scenarioLoader } from "../../loaders/scenarioLoader"
import { useEffect } from "react"

const useLoadAllScenariosConfig = async () => {
   const [, setAllScenarioConfigs] = useAtom(allScenarioConfigsAtom)

   useEffect(() => {
      const wrapperFunc = async () => {
         const scenarios: Array<ScenarioConfig> = []

         for (const folder of scenarioConfigFolders) {
            const scenario: ScenarioConfig = await scenarioLoader(folder)
            /*const loadScenario = async () => {
         scenario = await scenarioLoader(folder)
      }*/
            //await loadScenario()

            // TODO: Fix typing
            scenarios.push(scenario)
         }

         // TODO: Fix for actual code
         setAllScenarioConfigs(Array(10).fill(scenarios[0]))
      }
      wrapperFunc()

      return () => {
         setAllScenarioConfigs([])
      }
   }, [setAllScenarioConfigs])
}

export { useLoadAllScenariosConfig }
