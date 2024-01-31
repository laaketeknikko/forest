import { scenarioConfigRoot } from "../../config/paths"
import { v4 } from "uuid"

const scenarioLoader = async (scenarioConfigFolder: string) => {
   const scenarioConfig: ScenarioConfig = (
      await import(
         `${scenarioConfigRoot}/${scenarioConfigFolder}/scenarioconfig`
      )
   ).scenarioConfig

   scenarioConfig.id = v4()

   return scenarioConfig
}

export { scenarioLoader }
