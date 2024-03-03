import { defeatedScenarioEnemiesAtom } from "../state/jotai/enemies"
import { getDefaultStore, useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useCallback, useEffect } from "react"

const useScenarioVictoryConditions = () => {
   const [defeatedEnemies] = useAtom(defeatedScenarioEnemiesAtom)
   const [saveData, setSaveData] = useAtom(activeSaveGameConfigAtom)

   useEffect(() => {
      console.log("updating conditions")
      console.log(
         "scenariovictoryconditions",
         saveData.scenario.scenarioVictoryConditions
      )

      const jotaiStore = getDefaultStore()
      let conditionsChanged = false

      const updatedConditions = saveData.scenario.scenarioVictoryConditions.map(
         (condition) => {
            if (condition.type === "enemy") {
               console.log("condition is enemy")

               const enemyAtom = defeatedEnemies.find((enemyAtom) => {
                  const enemy = jotaiStore.get(enemyAtom)
                  console.log("finding enemy")
                  return (
                     enemy.name.toLowerCase() ===
                     condition.enemyName.toLowerCase()
                  )
               })
               console.log("fouund enemy atom", enemyAtom)
               console.log(
                  "found enemy: ",
                  enemyAtom ? jotaiStore.get(enemyAtom) : null
               )
               if (enemyAtom) {
                  console.log("have enemy atom")
                  const enemy = jotaiStore.get(enemyAtom)

                  console.log(
                     "enemy and enemy atom in updateconditions",
                     enemy,
                     enemyAtom
                  )

                  if (condition.status === "dead") {
                     if (enemy.health <= 0) {
                        console.log("enemy health is dead")
                        if (!condition.fulfilled) {
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

   const allConditionsMet = useCallback(() => {
      console.log("in allconditionsmet")
      return (
         saveData.scenario.scenarioVictoryConditions.length > 0 &&
         saveData.scenario.scenarioVictoryConditions.every(
            (condition) => condition.fulfilled
         )
      )
   }, [saveData.scenario.scenarioVictoryConditions])

   return {
      allConditionsMet,
      victoryConditions: saveData.scenario.scenarioVictoryConditions,
   }
}

export { useScenarioVictoryConditions }
