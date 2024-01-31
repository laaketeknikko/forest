import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

import { useEffect } from "react"

interface ScenarioDetailsProps {
   scenarioConfig: ScenarioConfig
}

const ScenarioDetails = ({ scenarioConfig }: ScenarioDetailsProps) => {
   useEffect(() => {
      console.log("In ScenarioDetails, config", scenarioConfig)
   }, [scenarioConfig])

   return (
      <Paper>
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
               <Typography variant="body1" key={enemy.enemyName}>
                  {enemy.quantity} x {enemy.enemyName}
               </Typography>
            )
         })}
      </Paper>
   )
}

export { ScenarioDetails }
