import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

import { EnemyDetails } from "./EnemyDetails"

import { ZScenarioConfig } from "../../../../../shared/types/types"
import { getEnemyConfigByEnemyName } from "../../../game/util/getEnemyByName"
import { emptyEnemyAtom } from "../../../game/state/initialStates"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

export interface ScenarioDetailsProps {
   scenarioConfig: ZScenarioConfig
}

/**
 * Displays details of the given scenario config.
 *
 */
const ScenarioDetails = ({ scenarioConfig }: ScenarioDetailsProps) => {
   return (
      <Paper sx={{ height: "100%" }}>
         <Typography variant="h4" sx={{ textAlign: "center" }} color="primary">
            {scenarioConfig.name}
         </Typography>

         {/** General scenario info
          *
          */}
         <List
            dense={true}
            sx={{ marginBottom: 5, paddingTop: 0, paddingBottom: 0 }}
         >
            <ListItem>
               <Typography variant="body1" textAlign="center" width={"100%"}>
                  Maximum party size:&nbsp;
                  <Typography component="span" color="primary">
                     {scenarioConfig.maxPartySize}
                  </Typography>
               </Typography>
            </ListItem>
            <ListItem>
               <Typography variant="body1" textAlign="center" width={"100%"}>
                  Arena size:{" "}
                  <Typography component="span" color="primary">
                     {scenarioConfig.arena.size.length}x
                     {scenarioConfig.arena.size.width}
                  </Typography>
               </Typography>
            </ListItem>
         </List>

         {/** Victory conditions
          *
          */}
         <Typography variant="h5" color="primary" textAlign={"center"}>
            Victory conditions
         </Typography>
         <List
            dense={true}
            sx={{ marginBottom: 5, paddingTop: 0, paddingBottom: 0 }}
         >
            {scenarioConfig.scenarioVictoryConditions.map(
               (condition, index) => {
                  return (
                     <ListItem key={index}>
                        <Typography
                           variant="body1"
                           textAlign="center"
                           width={"100%"}
                        >
                           {index + 1}. {condition.description}
                        </Typography>
                     </ListItem>
                  )
               }
            )}
         </List>

         {/** Loss conditions
          *
          */}
         <Typography variant="h5" color="primary" textAlign="center">
            Loss conditions
         </Typography>
         <List
            dense={true}
            sx={{ marginBottom: 5, paddingTop: 0, paddingBottom: 0 }}
         >
            {scenarioConfig.scenarioLossConditions.map((condition, index) => {
               return (
                  <ListItem key={index}>
                     <Typography
                        variant="body1"
                        textAlign="center"
                        width={"100%"}
                     >
                        {index + 1}. {condition.description}
                     </Typography>
                  </ListItem>
               )
            })}
         </List>

         {/** Enemies
          *
          */}
         <Typography variant="h5" color="primary" textAlign="center">
            Enemies
         </Typography>
         <Grid2 container>
            {scenarioConfig.enemies.map((enemy) => {
               return (
                  <Grid2 key={enemy.enemyName} xs={6} sm={5} lg={4}>
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
