import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { getDefaultStore, useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"

const useScenarioVictoryConditions = () => {
   const [allScenarioEnemies] = useAtom(activeScenarioEnemiesAtom)
   const [saveData, setSaveData] = useAtom(activeSaveGameConfigAtom)

   const updateConditionStatuses = () => {
      const jotaiStore = getDefaultStore()
      let conditionsChanged = false

      const updatedConditions = saveData.scenario.scenarioVictoryConditions.map(
         (condition) => {
            if (condition.type === "enemy") {
               const enemyAtom = allScenarioEnemies.find((enemyAtom) => {
                  const enemy = jotaiStore.get(enemyAtom)

                  return (
                     enemy.name.toLowerCase() ===
                     condition.enemyName.toLowerCase()
                  )
               })

               if (enemyAtom) {
                  const enemy = jotaiStore.get(enemyAtom)

                  if (condition.status === "dead") {
                     if (enemy.health <= 0) {
                        condition.fulfilled = true
                        conditionsChanged = true
                     }
                  }
               }
            }

            return condition
         }
      )
      if (conditionsChanged) {
         setSaveData({
            ...saveData,
            scenario: {
               ...saveData.scenario,
               scenarioVictoryConditions: updatedConditions,
            },
         })
      }
   }

   const allConditionsMet = () => {
      return (
         saveData.scenario.scenarioVictoryConditions.length > 0 &&
         saveData.scenario.scenarioVictoryConditions.every(
            (condition) => condition.fulfilled
         )
      )
   }

   return {
      updateConditionStatuses,
      allConditionsMet,
      victoryConditions: saveData.scenario.scenarioVictoryConditions,
   }
}

export { useScenarioVictoryConditions }
