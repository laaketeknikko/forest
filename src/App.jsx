import Grid from "@mui/material/Unstable_Grid2"
import { Suspense } from "react"

import { allPlayerCharactersAtom } from "./game/state/jotai/characters"

import { useAtom } from "jotai"
import { R3FCanvasWrapper } from "./components/r3f/R3FCanvasWrapper"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"

import { SelectedCharacterCards } from "./components/MainWindow/SelectedCharacterCards/SelectedCharacterCards"
import { TurnOrderView } from "./components/MainWindow/TurnOrderView/TurnOrderView"

import { MainMenu } from "./components/MainMenu/MainMenu"

import { useLoadAllScenariosConfig } from "./game/hooks/scenarios/useGetAllScenarioConfigs"

function App() {
   const [allCharacters] = useAtom(allPlayerCharactersAtom)
   const [showMainMenu, setShowMainMenu] = useState(true)

   useEffect(() => {
      console.log("all characteres", allCharacters)
   }, [allCharacters])

   useLoadAllScenariosConfig()

   // TODO: IMplement changing the active action when action performed.
   const onActionTriggered = (card) => {
      console.log("card in onactiontriggered", card)
      /*
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
      setSelectedCharacterData({ ...selectedCharacterData, cards: newCards })*/
   }

   return (
      <Grid container sx={{ height: "100vh" }}>
         <Grid xs={1}>
            <Paper elevation={1} sx={{ height: "100%" }}>
               <TurnOrderView />
            </Paper>
         </Grid>
         <Grid xs={9}>
            {!showMainMenu && (
               <Suspense>
                  <R3FCanvasWrapper />
               </Suspense>
            )}
            {showMainMenu && <MainMenu />}
         </Grid>
         <Grid xs={2}>
            <Paper elevation={1} sx={{ height: "100%" }}>
               <SelectedCharacterCards onActionTriggered={onActionTriggered} />
            </Paper>
         </Grid>
      </Grid>
   )
}

export { App }
