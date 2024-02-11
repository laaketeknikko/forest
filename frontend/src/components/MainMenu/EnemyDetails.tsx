import { useAtom } from "jotai"
import type { Atom } from "jotai"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { useState } from "react"
import { EnemyAvatars } from "./EnemyAvatars"
import { IEnemy, IScenarioEnemyConfig } from "../../../../shared/types/types"

interface EnemyDetailsProps {
   enemyAtom: Atom<IEnemy>
   scenarioDetails: IScenarioEnemyConfig
}

const EnemyDetails = ({ enemyAtom, scenarioDetails }: EnemyDetailsProps) => {
   const [enemy] = useAtom(enemyAtom)
   const [showDetails, setShowDetails] = useState(false)

   return (
      <Container>
         <EnemyAvatars
            imagePath={enemy.spritePath}
            quantity={scenarioDetails.quantity}
            onClick={() => {
               setShowDetails(!showDetails)
            }}
         />
         {showDetails && (
            <Box component="div">
               <Typography variant="body1">
                  Name: {enemy.name}
                  <br />
                  Health: {enemy.health}
                  <br />
                  Action delay: {enemy.baseActionDelay}
               </Typography>
               <img src={enemy.spritePath} />
            </Box>
         )}
      </Container>
   )
}

export { EnemyDetails }
