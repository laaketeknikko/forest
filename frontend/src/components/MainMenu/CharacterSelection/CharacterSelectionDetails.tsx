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

const CharacterSelectionDetails = ({
   characterAtom,
}: CharacterSelectionDetailsProps) => {
   const character = useAtomValue(characterAtom)

   return (
      <Container>
         <Grid2 container alignItems={"center"}>
            <Grid2 xs={3} sm={4} lg={4}></Grid2>
            <Grid2
               xs={6}
               sm={4}
               lg={3}
               alignContent={"center"}
               alignItems={"center"}
            >
               <Typography variant="h6" textAlign="center" color="primary">
                  Stats
               </Typography>
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
            <Grid2 xs={3} sm={4} lg={4}></Grid2>
         </Grid2>
         <Grid2
            container
            columns={24}
            justifyItems={"center"}
            justifyContent={"center"}
         >
            <Grid2 xs={1} sm={3} md={4} lg={5} xl={6}></Grid2>
            <Grid2 xs={22} sm={18} md={16} lg={14} xl={12}>
               <Typography
                  variant="h6"
                  textAlign="center"
                  color="primary"
                  sx={{ marginBottom: 5 }}
               >
                  Cards
               </Typography>
               <CardList character={character} direction="horizontal" />
            </Grid2>
            <Grid2 xs={1} sm={3} md={4} lg={5} xl={6}></Grid2>
         </Grid2>
      </Container>
   )
}

export { CharacterSelectionDetails }
