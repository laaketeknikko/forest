import { Canvas } from "@react-three/fiber"

import Container from "@mui/material/Container"

import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Unstable_Grid2"
import { GameFieldView } from "./components/GameFieldView"
import { Suspense } from "react"

function App() {
   return (
      <>
         <Suspense>
            <Grid container sx={{ height: "100vh" }}>
               <Grid xs={1}>
                  <Typography>order</Typography>
               </Grid>
               <Grid xs={9}>
                  <Canvas camera={{ position: [1, 4, 5] }}>
                     <axesHelper />
                     <GameFieldView />
                  </Canvas>
               </Grid>
               <Grid xs={2}>
                  <Typography>Cards here</Typography>
               </Grid>
            </Grid>
         </Suspense>
      </>
   )
}

export { App }

