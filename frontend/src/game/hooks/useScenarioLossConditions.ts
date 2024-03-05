import { useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { activePartyAtom } from "../state/jotai/characters"
import { useEffect, useState } from "react"

/**
 * There is only one loss condition: all player characters are defeated.
 *
 * Uses an effect to keep track of active characters. Once none remain
 * sets the condition as true in scenarioLossConditions.
 */
const useScenarioLossConditions = () => {
   const [saveData] = useAtom(activeSaveGameConfigAtom)
   const [activeParty] = useAtom(activePartyAtom)
   const [isLossConditionMet, setIsLossConditionMet] = useState(false)

   useEffect(() => {
      const conditions = saveData.scenario.scenarioLossConditions

      for (const condition of conditions) {
         /** We only have one loss condition type */
         if (condition.type === "party" && condition.status === "defeated") {
            if (activeParty.length === 0) {
               setIsLossConditionMet(true)
            }
         }
      }
   }, [activeParty.length, saveData.scenario.scenarioLossConditions])

   return {
      isLossConditionMet,
   }
}

export { useScenarioLossConditions }
