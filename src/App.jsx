import { Canvas } from "@react-three/fiber"

import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Unstable_Grid2"
import { GameFieldView } from "./components/GameFieldView"
import { Suspense } from "react"

import { ActionCard } from "./components/Cards/ActionCard"
import { TurnOrderCard } from "./components/Cards/TurnOrderCard"
import { ActionCardList } from "./components/Cards/ActionCardList"

function App() {
   const card1 = <ActionCard />
   const card2 = <ActionCard />
   const card3 = <ActionCard />
   const card4 = <ActionCard />
   const card5 = <ActionCard />
   const card6 = <ActionCard />
   const card7 = <ActionCard />
   const card8 = <ActionCard />

   const cardList = (
      <ActionCardList
         cards={[card1, card2, card3, card4, card5, card6, card7, card8]}
      />
   )

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
               <Grid xs={2}>{cardList}</Grid>
            </Grid>
         </Suspense>
      </>
   )
}

export { App }

