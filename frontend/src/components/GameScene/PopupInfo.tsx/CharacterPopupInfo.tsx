import Paper from "@mui/material/Paper"

import { theme } from "../../../styles/mui/theme"
import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { PrimitiveAtom, useAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"

interface CharacterPopupInfoProps {
   characterAtom: PrimitiveAtom<ZCharacter>
}

// TODO: Style this properly

const infoStyles = {
   td: {
      border: 0,
      margin: 0,
      marginRight: 0,
      padding: 0,
      paddingRight: 3,
   },
}

/**
 * Used inside the game scene, when hovering over a character.
 * Display short info, like health, delay, etc.
 *
 */
const CharacterPopupInfo = ({ characterAtom }: CharacterPopupInfoProps) => {
   const [characterInfo] = useAtom(characterAtom)

   if (!characterInfo) {
      return null
   }

   return (
      <Paper
         sx={{
            color: theme.palette.text.primary,
            width: "fit-content",
            textAlign: "center",
            padding: 1,
         }}
      >
         <Typography color="primary">{characterInfo.name}</Typography>
         <Table size="small">
            <TableBody>
               <TableRow sx={{ border: 0 }}>
                  <TableCell component="th" sx={infoStyles.td}>
                     <Typography>Health</Typography>
                  </TableCell>
                  <TableCell align="right" sx={infoStyles.td}>
                     <Typography color="primary">
                        {characterInfo.health}
                     </Typography>
                  </TableCell>
               </TableRow>
               <TableRow>
                  <TableCell component="th" sx={infoStyles.td}>
                     <Typography>Delay</Typography>
                  </TableCell>
                  <TableCell align="right" sx={infoStyles.td}>
                     <Typography color="primary">
                        {characterInfo.currentActionDelay.toFixed(1)}
                     </Typography>
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      </Paper>
   )
}

export { CharacterPopupInfo }
