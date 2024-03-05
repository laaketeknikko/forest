import { defeatedScenarioEnemiesAtom } from "../state/jotai/enemies"
import { getDefaultStore, useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { useEffect, useState } from "react"

const useScenarioVictoryConditions = () => {
   const [defeatedEnemies] = useAtom(defeatedScenarioEnemiesAtom)
   const [saveData, setSaveData] = useAtom(activeSaveGameConfigAtom)
   const [allConditionsMet, setAllConditionsMet] = useState(false)

   useEffect(() => {
      console.log("in scenariovictoryconditions")
      const jotaiStore = getDefaultStore()
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

                  console.log("enemy data", enemy)

                  if (condition.status === "dead") {
                     if (enemy.health <= 0) {
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

      console.log("updated conditions", updatedConditions)
      console.log("condition changed", conditionsChanged)

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
      console.log("checking victory conditions met")
      const allConditionsMet =
         saveData.scenario.scenarioVictoryConditions.length > 0 &&
         saveData.scenario.scenarioVictoryConditions.every(
            (condition) => condition.fulfilled
         )
      console.log("all conditions met?", allConditionsMet)
      setAllConditionsMet(allConditionsMet)
   }, [saveData.scenario.scenarioVictoryConditions])

   return {
      allConditionsMet,
      victoryConditions: saveData.scenario.scenarioVictoryConditions,
   }
}

export { useScenarioVictoryConditions }
