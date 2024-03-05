import { defeatedScenarioEnemiesAtom } from "../state/jotai/enemies"
import { getDefaultStore, useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useEffect, useState } from "react"

/**
 * Check if scenario victory conditions are met.
 *
 * There is only type of victory condition: a named enemy is defeated.
 *
 * Uses two effects:
 * - one to subscribe to defeatedEnemies. Updates the victory condition
 *    status in saveGame if condition is met.
 * - one to subscribe to scenarioVictoryConditions. Updates the
 *    allConditionsMet is all conditions are met.
 */
const useScenarioVictoryConditions = () => {
   const [defeatedEnemies] = useAtom(defeatedScenarioEnemiesAtom)
   const [saveData, setSaveData] = useAtom(activeSaveGameConfigAtom)
   const [allConditionsMet, setAllConditionsMet] = useState(false)

   useEffect(() => {
      const jotaiStore = getDefaultStore()

      /** Update state only if conditions changed */
      let conditionsChanged = false

      const updatedConditions = saveData.scenario.scenarioVictoryConditions.map(
         (condition) => {
            if (condition.type === "enemy") {
               const enemyAtom = defeatedEnemies.find((enemyAtom) => {
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
                        if (!condition.fulfilled) {
                           /** If condition type enemy and enemy is dead, update */
                           condition.fulfilled = true
                           conditionsChanged = true
                        }
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
   }, [defeatedEnemies, saveData, setSaveData])

   useEffect(() => {
      const allConditionsMet =
         saveData.scenario.scenarioVictoryConditions.length > 0 &&
         saveData.scenario.scenarioVictoryConditions.every(
            (condition) => condition.fulfilled
         )
      setAllConditionsMet(allConditionsMet)
   }, [saveData.scenario.scenarioVictoryConditions])

   return {
      allConditionsMet,
      victoryConditions: saveData.scenario.scenarioVictoryConditions,
   }
}

export { useScenarioVictoryConditions }
