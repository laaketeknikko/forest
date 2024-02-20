import { useState } from "react"
import { ZScenarioVictoryCondition } from "../../../../shared/types/types"
import { activeScenarioEnemiesAtom } from "../state/jotai/enemies"
import { getDefaultStore, useAtom } from "jotai"
import { selectedScenarioConfigAtom } from "../state/jotai/scenarios"

const useScenarioVictoryConditions = () => {
   const [allScenarioEnemies] = useAtom(activeScenarioEnemiesAtom)
   const [selectedScenario] = useAtom(selectedScenarioConfigAtom)

   const [victoryConditions, setVictoryConditions] = useState<
      Array<{
         fulfilled: boolean
         condition: ZScenarioVictoryCondition
      }>
   >(
      selectedScenario.scenarioVictoryCondition.map((condition) => {
         return {
            fulfilled: false,
            condition: condition,
         }
      })
   )

   const setConditions = (
      victoryConditions: Array<ZScenarioVictoryCondition>
   ) => {
      setVictoryConditions(
         victoryConditions.map((condition) => {
            return {
               fulfilled: false,
               condition: condition,
            }
         })
      )
   }

   const getConditions = () => {
      return victoryConditions
   }

   const checkConditions = () => {
      console.log("checking conditions")
      const jotaiStore = getDefaultStore()
      let conditionsChanged = false

      const updatedConditions = victoryConditions.map((condition) => {
         if (condition.condition.type === "enemy") {
            console.log("condition type is enemy")
            const enemyAtom = allScenarioEnemies.find((enemyAtom) => {
               const enemy = jotaiStore.get(enemyAtom)
               console.log("have an enemy: ", enemy)
               return (
                  enemy.name.toLowerCase() ===
                  condition.condition.enemyName.toLowerCase()
               )
            })
            console.log("enemy atom: ", enemyAtom)
            if (enemyAtom) {
               const enemy = jotaiStore.get(enemyAtom)
               console.log("found enemy atom, have enemy: ", enemy)

               if (condition.condition.status === "dead") {
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
      })
      if (conditionsChanged) {
         console.log("conditions have changed")
         setVictoryConditions(updatedConditions)
      }
   }

   return {
      setConditions,
      getConditions,
      checkConditions,
      victoryConditions,
   }
}

export { useScenarioVictoryConditions }
