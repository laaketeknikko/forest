import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { getDefaultStore, useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"

const useScenarioVictoryConditions = () => {
   const [allScenarioEnemies] = useAtom(activeScenarioEnemiesAtom)
   const [saveData, setSaveData] = useAtom(activeSaveGameConfigAtom)

   const updateConditionStatuses = () => {
      console.log("checking conditions")
      const jotaiStore = getDefaultStore()
      let conditionsChanged = false

      const updatedConditions = saveData.scenario.scenarioVictoryConditions.map(
         (condition) => {
            if (condition.type === "enemy") {
               console.log("condition type is enemy")
               const enemyAtom = allScenarioEnemies.find((enemyAtom) => {
                  const enemy = jotaiStore.get(enemyAtom)
                  console.log("have an enemy: ", enemy)
                  return (
                     enemy.name.toLowerCase() ===
                     condition.enemyName.toLowerCase()
                  )
               })
               console.log("enemy atom: ", enemyAtom)
               if (enemyAtom) {
                  const enemy = jotaiStore.get(enemyAtom)
                  console.log("found enemy atom, have enemy: ", enemy)

                  if (condition.status === "dead") {
                     console.log("status is dead")
                     if (enemy.health <= 0) {
                        console.log("enemy is dead")
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
         console.log("conditions have changed")
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
