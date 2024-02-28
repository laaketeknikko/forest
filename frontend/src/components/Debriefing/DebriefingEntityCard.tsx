import { PrimitiveAtom, useAtom } from "jotai"
import { ZDynamicGameEntity } from "../../../../shared/types/types"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CharacterHealthIndicator } from "../util/CharacterHealthIndicator"

export interface DebriefingEntityCardProps {
   entityAtom: PrimitiveAtom<ZDynamicGameEntity>
}

const DebriefingEntityCard = ({ entityAtom }: DebriefingEntityCardProps) => {
   const [entity] = useAtom(entityAtom)

   return (
      <Card sx={{ margin: 2 }}>
         <Grid2 columns={24} container>
            <Grid2 xs={10}>
               <CardMedia component="img" image={entity.spritePath} />
            </Grid2>

            <Grid2 xs={14} alignSelf={"center"}>
               <CardContent>
                  <Typography variant="h5" textAlign="center" color={"primary"}>
                     {entity.name}
                  </Typography>
                  <Typography>
                     HP:{" "}
                     <Typography component="span" color="primary">
                        {entity.health}
                     </Typography>
                  </Typography>
                  <CharacterHealthIndicator
                     current={entity.health}
                     max={entity.maxHealth}
                  />
               </CardContent>
            </Grid2>
         </Grid2>
      </Card>
   )
}

export { DebriefingEntityCard }
