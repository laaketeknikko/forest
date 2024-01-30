import { scenarioConfigRoot } from "../../config/paths"
import { scenarioConfigFolders } from "../../config/paths"
import { atom } from "jotai"

const scenarioLoader = async (scenarioConfigFolder) => {
   const scenarioConfig = (
      await import(
         `${scenarioConfigRoot}/${scenarioConfigFolder}/scenarioconfig`
      )
   ).scenarioConfig

   // TODO: Continue from here
}

export { scenarioLoader }
