import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Grid2 from "@mui/material/Unstable_Grid2"
import { theme } from "../../styles/mui/theme"
import { DebriefingEntityCard } from "./DebriefingEntityCard"
import { PrimitiveAtom } from "jotai"
import { ZDynamicGameEntity } from "../../../../shared/types/types"

export interface DebriefingEntityListProps {
   header: string
   entityAtoms: Array<PrimitiveAtom<ZDynamicGameEntity>>
}

const DebriefingEntityList = ({
   header,
   entityAtoms,
}: DebriefingEntityListProps) => {
   return (
      <Grid2 xs={12} container columns={24}>
         <Grid2 xs={24}>
            <Typography variant="h5" textAlign="center">
               {header}
            </Typography>
            <Divider
               variant="middle"
               color="primary"
               aria-hidden="true"
               sx={{ borderColor: theme.palette.primary.main }}
            />
         </Grid2>
         <Grid2
            container
            columns={24}
            justifyContent={"center"}
            alignItems={"flex-start"}
         >
            {entityAtoms.map((atom) => {
               return (
                  <Grid2 key={atom.toString()} xs={12} sm={8} lg={6}>
                     <DebriefingEntityCard
                        entityAtom={atom}
                        direction="vertical"
                     />
                  </Grid2>
               )
            })}
         </Grid2>
      </Grid2>
   )
}

export { DebriefingEntityList }
