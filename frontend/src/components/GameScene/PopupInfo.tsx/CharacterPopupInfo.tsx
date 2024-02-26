import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { PrimitiveAtom, useAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import TableHead from "@mui/material/TableHead"

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
 * Used to display character information in the popup.
 * This doesn't set the info, it only returns the JSX.
 *
 */
const CharacterPopupInfo = ({ characterAtom }: CharacterPopupInfoProps) => {
   const [characterInfo] = useAtom(characterAtom)

   if (!characterInfo) {
      return null
   }

   return (
      <Table size="small">
         <TableHead>
            <TableRow>
               <TableCell>
                  <Typography color="primary">{characterInfo.name}</Typography>
               </TableCell>
            </TableRow>
         </TableHead>
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
   )
}

export { CharacterPopupInfo }
