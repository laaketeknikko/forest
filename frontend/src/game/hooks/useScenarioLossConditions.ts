import { useAtom } from "jotai"
import { activeSaveGameConfigAtom } from "../state/jotai/gameState"
import { activePartyAtom } from "../state/jotai/characters"
import { useEffect, useState } from "react"

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
