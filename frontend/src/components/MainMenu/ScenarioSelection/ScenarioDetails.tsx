import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

import { EnemyDetails } from "./EnemyDetails"

import { ZScenarioConfig } from "../../../../../shared/types/types"
import { getEnemyConfigByEnemyName } from "../../../game/util/getEnemyByName"
import { emptyEnemyAtom } from "../../../game/state/initialStates"

interface ScenarioDetailsProps {
   scenarioConfig: ZScenarioConfig
}

const ScenarioDetails = ({ scenarioConfig }: ScenarioDetailsProps) => {
   return (
      <Paper sx={{ height: "100%" }}>
         <Typography variant="h3" sx={{ textAlign: "center" }} color="primary">
            {scenarioConfig.name}
         </Typography>

         <Typography variant="body1">
            Maximum party size:&nbsp;
            <Typography component="span" color="primary">
               {scenarioConfig.maxPartySize}
            </Typography>
         </Typography>

         <Typography variant="body1">
            Arena size:{" "}
            <Typography component="span" color="primary">
               {scenarioConfig.arena.size.length}x
               {scenarioConfig.arena.size.width}
            </Typography>
         </Typography>

         <Typography variant="h4" color="primary" textAlign="center">
            Enemies
         </Typography>

         {scenarioConfig.enemies.map((enemy) => {
            return (
               <EnemyDetails
                  key={enemy.enemyName}
                  enemyAtom={
                     getEnemyConfigByEnemyName(enemy.enemyName)?.enemyAtom ||
                     emptyEnemyAtom
                  }
                  scenarioDetails={enemy}
               />
            )
         })}
      </Paper>
   )
}

export { ScenarioDetails }
