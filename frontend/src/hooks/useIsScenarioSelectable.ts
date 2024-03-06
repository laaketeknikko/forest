import { useAtomValue } from "jotai"
import { ZScenarioConfig } from "../../../shared/types/types"
import { activeSaveGameConfigAtom } from "../game/state/jotai/gameState"
import { useCallback } from "react"

/**
 * Returns a function isScenarioSelectable.
 * The function checks if the data available in the save config
 * allows for unlocking the scenario.
 *
 */
const useIsScenarioSelectable = () => {
   const saveGame = useAtomValue(activeSaveGameConfigAtom)

   const isScenarioSelectable = useCallback(
      (scenario: ZScenarioConfig) => {
         const scenarioConditions = scenario.unlockCondition

         /**
          * Only support "scenario won" unlock types now.
          */
         if (!scenarioConditions) {
            return true
         }

         if (scenarioConditions.type === "scenario") {
            const scenarioName = scenarioConditions.scenarioName
            const scenarioSaveStats = saveGame.scenarioStatistics.find(
               (stat) => {
                  return stat.scenarioName === scenarioName
               }
            )

            if (scenarioConditions.status === "completed") {
               if (!scenarioSaveStats) {
                  return false
               }

               if (scenarioSaveStats.wins > 0) {
                  return true
               }
            }
         }

         return true
      },
      [saveGame.scenarioStatistics]
   )

   return { isScenarioSelectable }
}

export { useIsScenarioSelectable }
