import { useAtom } from "jotai"
import type { PrimitiveAtom } from "jotai"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { useState } from "react"

import { ZEnemy, ZScenarioEnemyConfig } from "../../../../../shared/types/types"

import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Avatar from "@mui/material/Avatar"
import { theme } from "../../../styles/mui/theme"

export interface EnemyDetailsProps {
   enemyAtom: PrimitiveAtom<ZEnemy>
   scenarioDetails: ZScenarioEnemyConfig
}

/**
 * Renders image and basic enemy details in scenario selection.
 */
const EnemyDetails = ({ enemyAtom, scenarioDetails }: EnemyDetailsProps) => {
   const [enemy] = useAtom(enemyAtom)
   const [showDetails, setShowDetails] = useState(false)

   return (
      <Container
         sx={{ marginTop: 5, textAlign: "center", justifyContent: "center" }}
      >
         {/**
          * Enemy image and number of enemies
          */}
         <Box
            component="div"
            sx={{ position: "relative" }}
            onClick={() => {
               setShowDetails(!showDetails)
            }}
         >
            <div
               style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
               }}
            >
               <Avatar
                  sizes="large"
                  sx={{
                     width: "2rem",
                     height: "2rem",
                     fontSize: "2rem",
                     backgroundColor: "transparent",
                     color: theme.palette.primary.main,
                  }}
               >
                  {scenarioDetails.quantity}
               </Avatar>
            </div>
            <img src={enemy.spritePath} />
         </Box>

         {/** Enemy details
          *
          */}
         {showDetails && (
            <Box component="div">
               <Grid2 container>
                  <Grid2
                     xs={12}
                     alignItems={"center"}
                     justifyContent={"center"}
                  >
                     <Typography variant="body1" textAlign={"center"}>
                        Name:{" "}
                        <Typography color="primary" component="span">
                           {enemy.name}
                        </Typography>
                        <br />
                        Health:{" "}
                        <Typography color="primary" component="span">
                           {enemy.health}
                        </Typography>
                        <br />
                        Action delay:{" "}
                        <Typography color="primary" component="span">
                           {enemy.baseActionDelay}
                        </Typography>
                     </Typography>
                  </Grid2>
               </Grid2>
            </Box>
         )}
      </Container>
   )
}

export { EnemyDetails }
