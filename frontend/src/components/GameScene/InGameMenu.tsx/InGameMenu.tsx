import { useAtom } from "jotai"
import { inGameOptionsAtom } from "../../../game/state/jotai/gameState"
import { SaveGame } from "../../MainMenu/SaveGame"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Switch from "@mui/material/Switch"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Container from "@mui/material/Container"

/**
 * Used during a scenario to show a menu.
 *
 * The menu contains functionality to
 * - save game
 *
 * - adjust settings
 */
const InGameMenu = () => {
   const [inGameOptions, setInGameOptions] = useAtom(inGameOptionsAtom)

   return (
      <Container>
         <Stack>
            <SaveGame />

            <Grid2 container justifyContent={"center"}>
               <Grid2 xs={8}>
                  {/**
                   * Options menu
                   */}
                  <Typography variant="h5" color="primary" textAlign={"center"}>
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
                                          !inGameOptions.graphics
                                             .showArenaImage,
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
      </Container>
   )
}

export { InGameMenu }
