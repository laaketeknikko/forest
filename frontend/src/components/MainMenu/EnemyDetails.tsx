import { useAtom } from "jotai"
import type { Atom } from "jotai"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { useState } from "react"
import { EnemyAvatars } from "./EnemyAvatars"
import { ZEnemy, ZScenarioEnemyConfig } from "../../../../shared/types/types"

import Grid2 from "@mui/material/Unstable_Grid2/Grid2"

interface EnemyDetailsProps {
   enemyAtom: Atom<ZEnemy>
   scenarioDetails: ZScenarioEnemyConfig
}

const EnemyDetails = ({ enemyAtom, scenarioDetails }: EnemyDetailsProps) => {
   const [enemy] = useAtom(enemyAtom)
   const [showDetails, setShowDetails] = useState(false)

   // TODO: Add support for multiple enemies.
   return (
      <Container
         sx={{ marginTop: 5, textAlign: "center", justifyContent: "center" }}
      >
         <EnemyAvatars
            imagePath={enemy.spritePath}
            quantity={scenarioDetails.quantity}
            onClick={() => {
               setShowDetails(!showDetails)
            }}
         />

         {showDetails && (
            <Box component="div">
               <Grid2 container>
                  <Grid2 xs={6} alignItems={"center"} justifyContent={"center"}>
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
                  <Grid2 xs={6}>
                     <img src={enemy.spritePath} style={{ width: "100%" }} />
                  </Grid2>
               </Grid2>
            </Box>
         )}
      </Container>
   )
}

export { EnemyDetails }
