import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

import { useEffect } from "react"

import { allEnemiesAtom } from "../../game/state/jotai/enemies"
import { getDefaultStore, useAtom } from "jotai"
import { EnemyDetails } from "./EnemyDetails"
import { emptyEnemyAtom } from "../../game/state/initialStates"
import { ZScenarioConfig } from "../../../../shared/types/types"

interface ScenarioDetailsProps {
   scenarioConfig: ZScenarioConfig
}

const ScenarioDetails = ({ scenarioConfig }: ScenarioDetailsProps) => {
   const [allEnemies] = useAtom(allEnemiesAtom)

   useEffect(() => {
      console.log("In ScenarioDetails, config", scenarioConfig)
   }, [scenarioConfig])

   const getEnemyByName = (name: string) => {
      const jotaiStore = getDefaultStore()
      const enemyAtom = allEnemies.find((enemyAtom) => {
         const enemyData = jotaiStore.get(enemyAtom)
         return enemyData.name.toLowerCase() === name.toLowerCase()
      })

      if (!enemyAtom) {
         return emptyEnemyAtom
      } else {
         return enemyAtom
      }
   }

   return (
      <Paper sx={{ height: "100%" }}>
         <Typography variant="h3">{scenarioConfig.name}</Typography>

         <Typography variant="body1">
            Maximum party size: {scenarioConfig.maxPartySize}
         </Typography>

         <Typography variant="body1">
            Arena size: {scenarioConfig.arena.size.length}x
            {scenarioConfig.arena.size.width}
         </Typography>

         <Typography variant="h4">Enemies</Typography>

         {scenarioConfig.enemies.map((enemy) => {
            return (
               <EnemyDetails
                  key={enemy.enemyName}
                  enemyAtom={getEnemyByName(enemy.enemyName)}
                  scenarioDetails={enemy}
               />
            )
         })}
      </Paper>
   )
}

export { ScenarioDetails }
