import Grid from "@mui/material/Unstable_Grid2"
import { Suspense } from "react"

import { useCharacterLoader } from "./game/hooks/characters/useCharacterLoader"
import {
   guineanPigletActionCardsAtom,
   guineanPigletCharacterAtom,
   allPlayerCharactersAtom,
} from "./game/state/characters/guineanpiglet"
import { selectedCharacterAtom } from "./game/state/characters/characters"
import { useAtom } from "jotai"
import { R3FCanvasWrapper } from "./components/r3f/R3FCanvasWrapper"
import { useEffect } from "react"
import Paper from "@mui/material/Paper"
import { useInitializeGameState } from "./game/hooks/useInitializeGameState"
import { SelectedCharacterCards } from "./components/MainWindow/SelectedCharacterCards/SelectedCharacterCards"

function App() {
   const [cards, setCards] = useAtom(guineanPigletActionCardsAtom)
   const [character] = useAtom(guineanPigletCharacterAtom)
   const [allCharacters] = useAtom(allPlayerCharactersAtom)
   const [selectedCharacter] = useAtom(selectedCharacterAtom)
   const [selectedCharacterData, setSelectedCharacterData] =
      useAtom(selectedCharacter)

   useInitializeGameState()

   useCharacterLoader({
      characterConfigFolder: "guineanpiglet",
      characterCardsAtom: guineanPigletActionCardsAtom,
      characterAtom: guineanPigletCharacterAtom,
   })

   useEffect(() => {
      console.log("Cards in app", cards)
      console.log("Character in app", character)
      console.log("all characteres", allCharacters)
   }, [allCharacters, cards, character])

   const onActionTriggered = (card) => {
      console.log("card in onactiontriggered", card)

      const actionIndex = card.actions.findIndex(
         (action) => action.id === card.nextActionId
      )
      const newCards = [...selectedCharacterData.cards]
      const cardIndex = newCards.findIndex((c) => c.id === card.id)
      if (actionIndex === card.actions.length - 1) {
         newCards[cardIndex].nextActionId = card.actions[0].id
      } else {
         newCards[cardIndex].nextActionId = card.actions[actionIndex + 1].id
      }
      setSelectedCharacterData({ ...selectedCharacterData, cards: newCards })
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
                  <SelectedCharacterCards
                     onActionTriggered={onActionTriggered}
                  />
               </Paper>
            </Grid>
         </Grid>
      </>
   )
}

export { App }

