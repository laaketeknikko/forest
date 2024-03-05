import { useAtom } from "jotai"
import { useEffect } from "react"
import { ZSaveConfigScenarioStatistics } from "../../../../shared/types/types"

import {
   gameExecutionStateAtom,
   activeSaveGameConfigAtom,
} from "../state/jotai/gameState"

/**
 * A simple wrapper around a useEffect().
 *
 * Uses an effect to check whether scenario is won or lost.
 * If so, updates the statistics for the scenario.
 *
 * Sets resultRecorded to true in gameState once result is recorded.
 */
const useScenarioStatsUpdater = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const [saveGame, setSaveGame] = useAtom(activeSaveGameConfigAtom)

   useEffect(() => {
      if (!gameExecutionState.scenario.resultRecorded) {
         const scenarioWon = gameExecutionState.scenario.won
         let scenarioLost = gameExecutionState.scenario.lost

         if (scenarioWon || scenarioLost) {
            let scenarioStat: ZSaveConfigScenarioStatistics | undefined =
               saveGame.scenarioStatistics.find((stat) => {
                  return stat.scenarioName === saveGame.scenario.name
               })
            if (!scenarioStat) {
               scenarioStat = {
                  scenarioName: saveGame.scenario.name,
                  wins: 0,
                  losses: 0,
                  timesAttempted: 0,
               }
            }

            scenarioStat.timesAttempted++

            if (scenarioWon) {
               scenarioStat.wins++
               /** If you won, you can't lose */
               scenarioLost = false
            } else if (scenarioLost) {
               scenarioStat.losses++
               scenarioLost = true
            }

            setSaveGame({
               ...saveGame,
               scenarioStatistics: [
                  ...saveGame.scenarioStatistics.filter((stat) => {
                     stat.scenarioName !== scenarioStat?.scenarioName
                  }),
                  scenarioStat,
               ],
            })
            setGameExecutionState({
               ...gameExecutionState,
               scenario: {
                  ...gameExecutionState.scenario,
                  resultRecorded: true,
               },
            })
         }
      }
   }, [gameExecutionState, saveGame, setGameExecutionState, setSaveGame])
}

export { useScenarioStatsUpdater }
