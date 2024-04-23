import { allScenarioConfigsAtom } from "../state/jotai/scenarios"
import { loadScenarioByName } from "../../services/configs"
import { getDefaultJotaiStore } from "../state/jotai/store"

/** Loads a scenario config by name.
 *
 * Looks first in allScenarioConfigsAtom and if not found,
 * requests from the server.
 */
const getScenarioConfigByName = async (scenarioName: string) => {
   const jotaiStore = getDefaultJotaiStore()

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
