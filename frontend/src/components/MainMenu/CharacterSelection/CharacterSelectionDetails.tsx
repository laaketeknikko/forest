import { PrimitiveAtom, useAtomValue } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import Container from "@mui/material/Container"
import Grid2 from "@mui/material/Unstable_Grid2"

import { DebriefingEntityCard } from "../../Debriefing/DebriefingEntityCard"
import Typography from "@mui/material/Typography"
import { CardList } from "./CardList"
import Box from "@mui/material/Box"

export interface CharacterSelectionDetailsProps {
   characterAtom: PrimitiveAtom<ZCharacter>
}

/**
 * Used to show stats of a selected chracter in the character selection tab.
 */
const CharacterSelectionDetails = ({
   characterAtom,
}: CharacterSelectionDetailsProps) => {
   const character = useAtomValue(characterAtom)

   return (
      <Container>
         {/**Stats
          *
          */}
         <Grid2 container alignItems={"center"} justifyContent={"space-around"}>
            <Grid2 xs={6} sm={4} md={3} lg={3}>
               <Box
                  component="div"
                  sx={{
                     marginTop: 5,
                  }}
               >
                  <DebriefingEntityCard
                     entityAtom={characterAtom}
                     direction="horizontal"
                  />
               </Box>
            </Grid2>
         </Grid2>

         {/**Character cards
          *
          */}
         <Grid2 container columns={24} justifyContent={"space-around"}>
            <Grid2>
               <Typography
                  variant="h6"
                  textAlign="center"
                  color="primary"
                  sx={{ margin: 5 }}
               >
                  Cards
               </Typography>
               <CardList character={character} direction="horizontal" />
            </Grid2>
         </Grid2>
      </Container>
   )
}

export { CharacterSelectionDetails }
