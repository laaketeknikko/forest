import Button from "@mui/material/Button"
import { SetNavigationState } from "./types"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { activePartyAtom } from "../../game/state/jotai/characters"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { useAtom } from "jotai"
import { ScenarioStartCharacterInfo } from "./ScenarioStartCharacterInfo"

interface ScenarioStartConfirmationProps {
   setNavigationState: SetNavigationState
}

const ScenarioStartConfirmation = ({
   setNavigationState,
}: ScenarioStartConfirmationProps) => {
   const [selectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)
   const [selectedCharacterAtoms] = useAtom(activePartyAtom)

   return (
      <Stack>
         <Typography variant="h3">Start scenario?</Typography>
         <Button onClick={() => setNavigationState(true)}>
            Start scenario
         </Button>
         <List>
            {selectedScenarioConfig.enemies.map((enemy) => (
               <ListItem key={enemy.enemyName}>
                  {enemy.enemyName}: {enemy.quantity}
               </ListItem>
            ))}
         </List>
         <List>
            {selectedCharacterAtoms.map((characterAtom) => {
               return (
                  <ListItem key={characterAtom.toString()}>
                     <ScenarioStartCharacterInfo
                        characterAtom={characterAtom}
                     />
                  </ListItem>
               )
            })}
         </List>
      </Stack>
   )
}

export { ScenarioStartConfirmation }
