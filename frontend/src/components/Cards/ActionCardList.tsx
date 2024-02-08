//import { useState } from "react"

import { ActionCard } from "./ActionCard"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

import { Atom } from "jotai"

import type { onCardSelectedFunc } from "./ActionCard"

interface ActionCardListProps {
   cards: Array<Atom<ActionCard>>
   onCardSelected?: onCardSelectedFunc
}

const ActionCardList = ({ cards, onCardSelected }: ActionCardListProps) => {
   /*const [activeCardId, setActiveCardId] = useState("")

   const onCardSelected = (card) => {
      setActiveCardId(card.id)
   }*/

   return (
      <List
         sx={{
            maxHeight: "100vh",
            overflowX: "hidden",
            overflowY: "scroll",
            padding: 0,
            margin: 0,
         }}
      >
         {cards.map((card, index) => {
            return (
               <ListItem
                  key={index}
                  sx={{
                     padding: 0,
                     paddingLeft: 0.5,
                     paddingRight: 0.5,
                  }}
               >
                  <ActionCard cardAtom={card} onCardSelected={onCardSelected} />
               </ListItem>
            )
         })}
      </List>
   )
}

export { ActionCardList }
