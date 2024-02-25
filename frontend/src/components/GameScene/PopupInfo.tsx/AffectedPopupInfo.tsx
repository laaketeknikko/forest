import { PrimitiveAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import { CharacterPopupInfo } from "./CharacterPopupInfo"
import Typography from "@mui/material/Typography"

export interface AffectedPopupInfoProps {
   entityAtoms: Array<PrimitiveAtom<ZCharacter>>
}

const AffectedPopupInfo = ({ entityAtoms }: AffectedPopupInfoProps) => {
   const characterInfos = entityAtoms.map((entityAtom) => {
      return (
         <CharacterPopupInfo
            characterAtom={entityAtom}
            key={entityAtom.toString()}
         />
      )
   })

   return (
      <div>
         <Typography variant="h5">Affected</Typography>
         {characterInfos.map((info) => info)}
      </div>
   )
}

export { AffectedPopupInfo }
