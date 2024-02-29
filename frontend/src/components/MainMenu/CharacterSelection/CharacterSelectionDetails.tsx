import { PrimitiveAtom, useAtomValue } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import Container from "@mui/material/Container"
import Grid2 from "@mui/material/Unstable_Grid2"
import { ActionCardList } from "../../Cards/ActionCardList"
import { DebriefingEntityCard } from "../../Debriefing/DebriefingEntityCard"
import Typography from "@mui/material/Typography"

export interface CharacterSelectionDetailsProps {
   characterAtom: PrimitiveAtom<ZCharacter>
}

const CharacterSelectionDetails = ({
   characterAtom,
}: CharacterSelectionDetailsProps) => {
   const character = useAtomValue(characterAtom)

   return (
      <Container>
         <Grid2
            container
            columns={24}
            justifyItems={"center"}
            justifyContent={"center"}
         >
            <Grid2 xs={10} sm={9} md={6} lg={5} xl={4}>
               <Typography variant="h6" textAlign="center">
                  Stats
               </Typography>
               <DebriefingEntityCard
                  entityAtom={characterAtom}
                  direction="vertical"
               />
            </Grid2>
            <Grid2 xs={12} sm={11} md={10} lg={9} xl={8}>
               <Typography variant="h6" textAlign="center">
                  Cards
               </Typography>
               <ActionCardList cards={character.cards} character={character} />
            </Grid2>
         </Grid2>
      </Container>
   )
}

export { CharacterSelectionDetails }
