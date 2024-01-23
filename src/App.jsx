import { Canvas } from "@react-three/fiber"

import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Unstable_Grid2"
import { GameFieldView } from "./components/GameFieldView"
import { Suspense } from "react"

import { ActionCard } from "./components/Cards/ActionCard"
import { TurnOrderCard } from "./components/Cards/TurnOrderCard"
import { ActionCardList } from "./components/Cards/ActionCardList"

import { GuineanPigletCards } from "./config/actions/guineanpiglet/guineanpigletCards"

function App() {
   const actionCard1 = (
      <ActionCard card={{ ...GuineanPigletCards.defaultOffensiveCard }} />
   )
   const actionCard2 = { ...actionCard1 }
   const actionCard3 = { ...actionCard1 }
   const actionCardsList = [actionCard1, actionCard2, actionCard3]

   const turnorder1 = (
      <TurnOrderCard imagePath="sprites/characters/guineanpiglet.png" />
   )
   const turnorder2 = <TurnOrderCard imagePath="sprites/characters/puu.png" />
   const turnorder3 = <TurnOrderCard imagePath="sprites/characters/puu.png" />
   const turnorder4 = (
      <TurnOrderCard imagePath="sprites/characters/kukkapensas.png" />
   )

   const turnOrderList = [turnorder1, turnorder2, turnorder3, turnorder4]

   return (
      <>
         <Suspense>
            <Grid container sx={{ height: "100vh" }}>
               <Grid xs={1}>
                  <ActionCardList cards={turnOrderList} />
               </Grid>
               <Grid xs={9}>
                  <Canvas camera={{ position: [1, 4, 5] }}>
                     <axesHelper />
                     <GameFieldView />
                  </Canvas>
               </Grid>
               <Grid xs={2}>{actionCardsList}</Grid>
            </Grid>
         </Suspense>
      </>
   )
}

export { App }

