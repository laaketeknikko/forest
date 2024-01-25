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

   const onActionTriggered = (card) => {
      const actionIndex = card.actions.findIndex(
         (action) => action.id === card.nextActionId
      )
      const newCards = [...cards]
      const cardIndex = cards.findIndex((c) => c.id === card.id)
      if (actionIndex === card.actions.length - 1) {
         newCards[cardIndex].nextActionId = card.actions[0].id
      } else {
         newCards[cardIndex].nextActionId = card.actions[actionIndex + 1].id
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

