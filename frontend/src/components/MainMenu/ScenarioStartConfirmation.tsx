import Button from "@mui/material/Button"
import { SetNavigationState } from "./types"
import Stack from "@mui/material/Stack"

import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { selectedPartyAtom } from "../../game/state/jotai/characters"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { useAtom } from "jotai"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

import { getEnemyConfigByEnemyName } from "../../game/util/getEnemyByName"

import { DebriefingEntityCard } from "../Debriefing/DebriefingEntityCard"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface ScenarioStartConfirmationProps {
   setNavigationState: SetNavigationState
}

/**
 * setNavigationState(true) is called when user confirms scenario start.
 */
const ScenarioStartConfirmation = ({
   setNavigationState,
}: ScenarioStartConfirmationProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [selectedCharacterAtoms] = useAtom(selectedPartyAtom)

   return (
      <Stack>
         {/**
          * Scenario info
          */}
         <Typography variant="h5" color="primary" textAlign={"center"}>
            Objectives
         </Typography>
         <List
            dense={true}
            sx={{ marginBottom: 5, paddingTop: 0, paddingBottom: 0 }}
         >
            {selectedScenarioConfig.scenarioVictoryConditions.map(
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

         {/** Enemies
          *
          */}
         <Typography variant="h5" color="primary" textAlign={"center"}>
            Opposition
         </Typography>
         <List
            dense={true}
            sx={{ marginBottom: 5, paddingTop: 0, paddingBottom: 0 }}
         >
            {selectedScenarioConfig.enemies.map((enemy, index) => {
               const enemyInfo = getEnemyConfigByEnemyName(enemy.enemyName)
               const quantity = enemy.quantity

               return (
                  <ListItem key={index}>
                     <Typography
                        variant="body1"
                        textAlign="center"
                        width={"100%"}
                     >
                        {quantity} {enemyInfo?.enemyData?.name}
                     </Typography>
                  </ListItem>
               )
            })}
         </List>

         {/** Party
          *
          */}
         <Box component="div">
            <Grid2
               container
               columns={24}
               alignItems={"end"}
               justifyContent="center"
               spacing={5}
            >
               {selectedCharacterAtoms.map((characterAtom) => {
                  return (
                     <Grid2
                        xs={8}
                        sm={6}
                        md={5}
                        lg={4}
                        xl={4}
                        key={characterAtom.toString()}
                     >
                        <DebriefingEntityCard
                           entityAtom={characterAtom}
                           direction={"vertical"}
                        />
                     </Grid2>
                  )
               })}
            </Grid2>
         </Box>

         <Button
            variant="text"
            onClick={() => setNavigationState(true)}
            size="large"
         >
            Start scenario
         </Button>
      </Stack>
   )
}

export { ScenarioStartConfirmation }
