import { useAtom } from "jotai"
import type { Atom } from "jotai"

import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { useState } from "react"

interface EnemyDetailsProps {
   enemyAtom: Atom<Enemy>
   scenarioDetails: ScenarioEnemyConfig
}

const EnemyDetails = ({ enemyAtom, scenarioDetails }: EnemyDetailsProps) => {
   const [enemy] = useAtom(enemyAtom)
   const [showDetails, setShowDetails] = useState(false)
   // Array is only to loop.
   const dummyArray = Array(scenarioDetails.quantity).fill("")

   return (
      <Container>
         <AvatarGroup
            max={2}
            spacing="small"
            variant="rounded"
            sx={{ justifyContent: "center" }}
            onClick={() => {
               setShowDetails(!showDetails)
            }}
         >
            {dummyArray.map((_item, index) => {
               return <Avatar key={index} src={enemy.spritePath} />
            })}
         </AvatarGroup>
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
