import { useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { activePartyAtom } from "../state/jotai/characters"
import { useCallback } from "react"

const useScenarioLossConditions = () => {
   const [saveData] = useAtom(activeSaveGameConfigAtom)
   const [activeParty] = useAtom(activePartyAtom)

   const isConditionMet = useCallback(() => {
      const conditions = saveData.scenario.scenarioLossConditions

      for (const condition of conditions) {
         /** We only have one loss condition type */
         if (condition.type === "party" && condition.status === "defeated") {
            if (activeParty.length === 0) {
               return true
            }
         }
      }
      return false
   }, [activeParty, saveData.scenario.scenarioLossConditions])

   return {
      isConditionMet,
   }
}

export { useScenarioLossConditions }
