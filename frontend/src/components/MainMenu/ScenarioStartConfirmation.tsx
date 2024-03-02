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
import Avatar from "@mui/material/Avatar"
import { theme } from "../../styles/mui/theme"
import { DebriefingEntityCard } from "../Debriefing/DebriefingEntityCard"

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
         <Button
            variant="text"
            onClick={() => setNavigationState(true)}
            size="large"
         >
            Start scenario
         </Button>
         <Grid2 container columns={24}>
            <Grid2 xs={6}>
               <List>
                  {selectedScenarioConfig.enemies.map((enemy) => {
                     const enemyInfo = getEnemyConfigByEnemyName(
                        enemy.enemyName
                     )

                     return (
                        /**
                         * Display enemy image and quantity.
                         */
                        <ListItem key={enemy.enemyName}>
                           <div>
                              <img src={enemyInfo?.enemyData?.spritePath} />
                              <div
                                 style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                 }}
                              >
                                 <Avatar
                                    sizes="large"
                                    sx={{
                                       width: "2rem",
                                       height: "2rem",
                                       fontSize: "2rem",
                                       backgroundColor: "transparent",
                                       color: theme.palette.primary.main,
                                    }}
                                 >
                                    {enemy.quantity}
                                 </Avatar>
                              </div>
                           </div>
                        </ListItem>
                     )
                  })}
               </List>
            </Grid2>
            <Grid2 xs={18}>
               <Grid2 container columns={24} alignItems={"end"}>
                  {selectedCharacterAtoms.map((characterAtom) => {
                     return (
                        <Grid2
                           xs={8}
                           sm={8}
                           md={6}
                           lg={5}
                           xl={5}
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
            </Grid2>
         </Grid2>
      </Stack>
   )
}

export { ScenarioStartConfirmation }
