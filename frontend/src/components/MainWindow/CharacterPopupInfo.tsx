import Paper from "@mui/material/Paper"
import { ZCharacter } from "../../../../shared/types/types"

import { theme } from "../../styles/mui/theme"
import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"

// TODO: Style this properly
interface CharacterPopupInfoProps {
   character: ZCharacter | null
}

const infoStyles = {
   td: {
      border: 0,
      margin: 0,
      marginRight: 0,
      padding: 0,
      paddingRight: 3,
   },
}

const CharacterPopupInfo = ({ character }: CharacterPopupInfoProps) => {
   if (!character) {
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
         <Typography color="primary">{character.name}</Typography>
         <Table size="small">
            <TableBody>
               <TableRow sx={{ border: 0 }}>
                  <TableCell component="th" sx={infoStyles.td}>
                     <Typography>Health</Typography>
                  </TableCell>
                  <TableCell align="right" sx={infoStyles.td}>
                     <Typography color="primary">{character.health}</Typography>
                  </TableCell>
               </TableRow>
               <TableRow>
                  <TableCell component="th" sx={infoStyles.td}>
                     <Typography>Delay</Typography>
                  </TableCell>
                  <TableCell align="right" sx={infoStyles.td}>
                     <Typography color="primary">
                        {character.currentActionDelay.toFixed(1)}
                     </Typography>
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      </Paper>
   )
}

export { CharacterPopupInfo }
