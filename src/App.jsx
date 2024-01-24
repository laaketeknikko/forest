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
import Paper from "@mui/material/Paper"

function App() {
   const [cards, setCards] = useAtom(guineanPigletActionCardsAtom)
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

   const onActionTriggered = () => {
      const actionIndex = cards[0].actions.findIndex(
         (action) => action.id === cards[0].nextActionId
      )
      const newCards = [...cards]
      if (actionIndex === cards[0].actions.length - 1) {
         newCards[0].nextActionId = cards[0].actions[0].id
      } else {
         newCards[0].nextActionId = cards[0].actions[actionIndex + 1].id
      }
      setCards(newCards)
   }

   return (
      <>
         <Grid container sx={{ height: "100vh" }}>
            <Grid xs={1}>
               <Paper elevation={4} sx={{ height: "100%" }}></Paper>
            </Grid>
            <Grid xs={9}>
               <Suspense>
                  <R3FCanvasWrapper />
               </Suspense>
            </Grid>
            <Grid xs={2}>
               <Paper elevation={4} sx={{ height: "100%" }}>
                  <ActionCardList
                     cards={cards}
                     onCardTriggered={onActionTriggered}
                  />
               </Paper>
            </Grid>
         </Grid>
      </>
   )
}

export { App }

