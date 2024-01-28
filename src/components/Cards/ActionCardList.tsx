//import { useState } from "react"

import { ActionCard } from "./ActionCard"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

import { Atom } from "jotai"

import type { onActionTriggeredFunc } from "./ActionCard"

interface ActionCardListProps {
   cards: Array<Atom<ActionCard>>
   onActionTriggered: onActionTriggeredFunc
}

const ActionCardList = ({ cards, onActionTriggered }: ActionCardListProps) => {
   /*const [activeCardId, setActiveCardId] = useState("")

   const onCardSelected = (card) => {
      setActiveCardId(card.id)
   }*/

   return (
      <List
         sx={{ maxHeight: "100vh", overflowX: "hidden", overflowY: "scroll" }}
      >
         {cards.map((card, index) => {
            return (
               <ListItem key={index}>
                  <ActionCard
                     cardAtom={card}
                     onActionTriggered={onActionTriggered}
                  />
               </ListItem>
            )
         })}
      </List>
   )
}

export { ActionCardList }
