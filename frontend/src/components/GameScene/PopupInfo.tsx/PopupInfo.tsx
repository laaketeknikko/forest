import { useAtom } from "jotai"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"
import Paper from "@mui/material/Paper"
import { theme } from "../../../styles/mui/theme"

/**
 * A component shown at the top left corner of the canvas.
 * Can be used to display short information by setting popupInfoAtom.
 */
const PopupInfo = () => {
   const [popupInfo] = useAtom(popupInfoAtom)

   return (
      <Paper
         sx={{
            color: theme.palette.text.primary,
            width: "fit-content",
            textAlign: "center",
            padding: 1,
         }}
      >
         {popupInfo}
      </Paper>
   )
}

export { PopupInfo }
