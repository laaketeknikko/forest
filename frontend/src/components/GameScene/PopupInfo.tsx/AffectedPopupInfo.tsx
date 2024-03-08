import { PrimitiveAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import { CharacterPopupInfo } from "./CharacterPopupInfo"
import Typography from "@mui/material/Typography"
import { useMemo } from "react"

export interface AffectedPopupInfoProps {
   entityAtoms: Array<PrimitiveAtom<ZCharacter>>
}

/**
 * Used to display the popup info of entities affected by an action.
 */
const AffectedPopupInfo = ({ entityAtoms }: AffectedPopupInfoProps) => {
   const characterInfos = useMemo(
      () =>
         entityAtoms.map((entityAtom) => {
            return (
               <CharacterPopupInfo
                  characterAtom={entityAtom}
                  key={entityAtom.toString()}
               />
            )
         }),
      [entityAtoms]
   )

   return (
      <div>
         <Typography variant="h5">Targets</Typography>
         {characterInfos.map((info) => info)}
      </div>
   )
}

export { AffectedPopupInfo }
