import { PrimitiveAtom, useAtom } from "jotai"
import { ZDynamicGameEntity } from "../../../../shared/types/types"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CharacterHealthIndicator } from "../util/CharacterHealthIndicator"
import Stack from "@mui/material/Stack"

export interface DebriefingEntityCardProps {
   entityAtom: PrimitiveAtom<ZDynamicGameEntity>
   direction: "vertical" | "horizontal"
}

const DebriefingEntityCard = ({
   entityAtom,
   direction,
}: DebriefingEntityCardProps) => {
   const [entity] = useAtom(entityAtom)

   return (
      <Card sx={{ margin: 1, padding: 0 }} variant="elevation" elevation={0}>
         <Stack direction={direction === "vertical" ? "column" : "row"}>
            <CardMedia
               component="img"
               image={entity.spritePath}
               sx={{ padding: 0 }}
            />

            <CardContent sx={{ padding: 0 }}>
               <Typography variant="h6" textAlign="center" color={"primary"}>
                  {entity.name}
               </Typography>

               <CharacterHealthIndicator
                  current={entity.health}
                  max={entity.maxHealth}
               />
            </CardContent>
         </Stack>
      </Card>
   )
}

export { DebriefingEntityCard }
