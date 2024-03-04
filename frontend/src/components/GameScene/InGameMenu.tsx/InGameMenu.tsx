import { useAtom } from "jotai"
import {
   gameExecutionStateAtom,
   inGameOptionsAtom,
} from "../../../game/state/jotai/gameState"
import {
   GlobalExecutionState,
   MainWindowDisplayStatus,
} from "../../../config/types"
import { SaveGame } from "../../MainMenu/SaveGame"
import { LoadGame } from "../../MainMenu/LoadGame"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Switch from "@mui/material/Switch"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

const InGameMenu = () => {
   const [gameExecutionState, setGameExecutionState] = useAtom(
      gameExecutionStateAtom
   )
   const [inGameOptions, setInGameOptions] = useAtom(inGameOptionsAtom)

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

         <Grid2 container justifyContent={"center"}>
            <Grid2 xs={8}>
               <Typography variant="h5" color="primary">
                  Options
               </Typography>

               <FormGroup sx={{ textAlign: "center" }}>
                  <FormControlLabel
                     control={
                        <Switch
                           size="medium"
                           checked={
                              inGameOptions.graphics.showBorderDecorations
                           }
                           onChange={() =>
                              setInGameOptions({
                                 ...inGameOptions,
                                 graphics: {
                                    ...inGameOptions.graphics,
                                    showBorderDecorations:
                                       !inGameOptions.graphics
                                          .showBorderDecorations,
                                 },
                              })
                           }
                        />
                     }
                     label={"Border decorations"}
                  />
                  <FormControlLabel
                     control={
                        <Switch
                           size="medium"
                           checked={inGameOptions.graphics.showBrushes}
                           onChange={() =>
                              setInGameOptions({
                                 ...inGameOptions,
                                 graphics: {
                                    ...inGameOptions.graphics,
                                    showBrushes:
                                       !inGameOptions.graphics.showBrushes,
                                 },
                              })
                           }
                        />
                     }
                     label={"Brushes"}
                  />
                  <FormControlLabel
                     control={
                        <Switch
                           size="medium"
                           checked={inGameOptions.graphics.showFoliage}
                           onChange={() =>
                              setInGameOptions({
                                 ...inGameOptions,
                                 graphics: {
                                    ...inGameOptions.graphics,
                                    showFoliage:
                                       !inGameOptions.graphics.showFoliage,
                                 },
                              })
                           }
                        />
                     }
                     label={"Foliage"}
                  />
                  <FormControlLabel
                     control={
                        <Switch
                           size="medium"
                           checked={inGameOptions.graphics.showArenaImage}
                           onChange={() =>
                              setInGameOptions({
                                 ...inGameOptions,
                                 graphics: {
                                    ...inGameOptions.graphics,
                                    showArenaImage:
                                       !inGameOptions.graphics.showArenaImage,
                                 },
                              })
                           }
                        />
                     }
                     label={"Arena"}
                  />
               </FormGroup>
            </Grid2>
         </Grid2>
      </Stack>
   )
}

export { InGameMenu }
