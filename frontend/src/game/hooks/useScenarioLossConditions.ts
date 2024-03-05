import { useAtom } from "jotai"
import {
   activeSaveGameConfigAtom,
   gameExecutionStateAtom,
} from "../state/jotai/gameState"
import { activePartyAtom } from "../state/jotai/characters"
import { useEffect } from "react"

/**
 * There is only one loss condition: all player characters are defeated.
 *
 * Uses an effect to keep track of active characters. Once none remain
 * sets the condition as true in scenarioLossConditions.
 */
const useScenarioLossConditions = () => {
   const [saveData] = useAtom(activeSaveGameConfigAtom)
   const [activeParty] = useAtom(activePartyAtom)

   const [gameState, setGameState] = useAtom(gameExecutionStateAtom)

   useEffect(() => {
      const conditions = saveData.scenario.scenarioLossConditions

      for (const condition of conditions) {
         /** We only have one loss condition type */
         if (condition.type === "party" && condition.status === "defeated") {
            if (activeParty.length === 0 && !gameState.scenario.lost) {
               setGameState({
                  ...gameState,
                  scenario: {
                     ...gameState.scenario,
                     lost: true,
                  },
               })
            }
         }
      }
   }, [
      activeParty.length,
      gameState,
      saveData.scenario.scenarioLossConditions,
      setGameState,
   ])
}

export { useScenarioLossConditions }
