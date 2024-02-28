import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

import { EnemyDetails } from "./EnemyDetails"

import { ZScenarioConfig } from "../../../../../shared/types/types"
import { getEnemyConfigByEnemyName } from "../../../game/util/getEnemyByName"
import { emptyEnemyAtom } from "../../../game/state/initialStates"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { List, ListItem } from "@mui/material"

interface ScenarioDetailsProps {
   scenarioConfig: ZScenarioConfig
}

const ScenarioDetails = ({ scenarioConfig }: ScenarioDetailsProps) => {
   return (
      <Paper sx={{ height: "100%" }}>
         <Typography variant="h3" sx={{ textAlign: "center" }} color="primary">
            {scenarioConfig.name}
         </Typography>

         <List dense={true}>
            <ListItem>
               <Typography variant="body1">
                  Maximum party size:&nbsp;
                  <Typography component="span" color="primary">
                     {scenarioConfig.maxPartySize}
                  </Typography>
               </Typography>
            </ListItem>
            <ListItem>
               <Typography variant="body1">
                  Arena size:{" "}
                  <Typography component="span" color="primary">
                     {scenarioConfig.arena.size.length}x
                     {scenarioConfig.arena.size.width}
                  </Typography>
               </Typography>
            </ListItem>
         </List>
         <Typography variant="h5" color="primary" textAlign={"center"}>
            Victory conditions
         </Typography>

         <List dense={true}>
            {scenarioConfig.scenarioVictoryConditions.map(
               (condition, index) => {
                  return (
                     <ListItem key={index}>
                        <Typography variant="body1">
                           {index + 1}. {condition.description}
                        </Typography>
                     </ListItem>
                  )
               }
            )}
         </List>

         <Typography variant="h5" color="primary" textAlign="center">
            Loss conditions
         </Typography>
         <List dense={true}>
            {scenarioConfig.scenarioLossConditions.map((condition, index) => {
               return (
                  <ListItem key={index}>
                     <Typography variant="body1">
                        {index + 1}. {condition.description}
                     </Typography>
                  </ListItem>
               )
            })}
         </List>

         <Typography variant="h5" color="primary" textAlign="center">
            Enemies
         </Typography>

         <Grid2 container>
            {scenarioConfig.enemies.map((enemy) => {
               return (
                  <Grid2 key={enemy.enemyName} xs={4}>
                     <EnemyDetails
                        enemyAtom={
                           getEnemyConfigByEnemyName(enemy.enemyName)
                              ?.enemyAtom || emptyEnemyAtom
                        }
                        scenarioDetails={enemy}
                     />
                  </Grid2>
               )
            })}
         </Grid2>
      </Paper>
   )
}

export { ScenarioDetails }
