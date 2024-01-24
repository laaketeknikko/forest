import Grid from "@mui/material/Unstable_Grid2"
import { Suspense } from "react"

import { TurnOrderCard } from "./components/Cards/TurnOrderCard"
import { ActionCardList } from "./components/Cards/ActionCardList"

import { useCharacterLoader } from "./game/hooks/characters/useCharacterLoader"
import {
   guineanPigletActionCardsAtom,
   guineanPigletCharacterAtom,
} from "./game/state/characters/guineanpiglet"
import { useAtom } from "jotai"
import { R3FCanvasWrapper } from "./components/r3f/R3FCanvasWrapper"
import { useEffect } from "react"

function App() {
   const [cards] = useAtom(guineanPigletActionCardsAtom)
   const [character] = useAtom(guineanPigletCharacterAtom)

   useCharacterLoader({
      characterConfigFolder: "guineanpiglet",
      characterCardsAtom: guineanPigletActionCardsAtom,
      characterAtom: guineanPigletCharacterAtom,
   })

   useEffect(() => {
      console.log("Cards in app", cards)
      console.log("Character in app", character)
   }, [cards, character])

   return (
      <>
         <Grid container sx={{ height: "100vh" }}>
            <Grid xs={1}></Grid>
            <Grid xs={9}>
               <Suspense>
                  <R3FCanvasWrapper />
               </Suspense>
            </Grid>
            <Grid xs={2}>
               <ActionCardList cards={character.cards} />
            </Grid>
         </Grid>
      </>
   )
}

export { App }

