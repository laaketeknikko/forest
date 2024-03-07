import { getDefaultStore } from "jotai"
import { allScenarioConfigsAtom } from "../state/jotai/scenarios"
import { loadScenarioByName } from "../../services/configs"

const getScenarioConfigByName = async (scenarioName: string) => {
   const jotaiStore = getDefaultStore()

   const scenarioConfigs = jotaiStore.get(allScenarioConfigsAtom)
   let config = scenarioConfigs.find((config) => {
      return config.name.toLowerCase() === scenarioName.toLowerCase()
   })

   if (!config) {
      config = await loadScenarioByName(scenarioName)
   }

   return config
}

export { getScenarioConfigByName }
