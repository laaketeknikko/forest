import { useAtom } from "jotai"
import { gameExecutionStateAtom } from "../../../game/state/jotai/gameState"
import {
   GlobalExecutionState,
   MainWindowDisplayStatus,
} from "../../../config/types"
import { SaveGame } from "../../MainMenu/SaveGame"
import { LoadGame } from "../../MainMenu/LoadGame"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { FormControlLabel, FormGroup, Switch } from "@mui/material"

const InGameMenu = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )

   const handleGameLoaded = (startGame: boolean) => {
      if (startGame) {
         setGameExecutionState({
            ...gameExecutionState,
            global: GlobalExecutionState.running,
            mainDisplay: MainWindowDisplayStatus.showGameScene,
         })
      }
   }

   return (
      <Stack>
         <SaveGame />
         <LoadGame startGame={handleGameLoaded} />

         <Typography variant="h5">Options</Typography>

         <FormGroup>
            <FormControlLabel
               control={<Switch defaultChecked size="medium" />}
               label={"Border decorations"}
            />
         </FormGroup>

         <Typography variant="h6">Performance</Typography>
         <Typography variant="body1">Border decorations</Typography>
         <Typography variant="body1">Brushes</Typography>
         <Typography variant="body1">Foliage</Typography>
         <Typography variant="body1">Arena image</Typography>
      </Stack>
   )
}

export { InGameMenu }
