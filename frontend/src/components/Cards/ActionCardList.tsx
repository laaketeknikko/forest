import { ActionCard } from "./ActionCard"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

import { PrimitiveAtom } from "jotai"

import type { onCardSelectedFunc } from "./ActionCard"
import { ZActionCard, ZCharacter } from "../../../../shared/types/types"

export interface ActionCardListProps {
   cards: Array<PrimitiveAtom<ZActionCard>>
   character: ZCharacter
   onCardSelected?: onCardSelectedFunc
}

/**
 * Calls onCardSelected() with no arguments.
 *
 */
const ActionCardList = ({
   cards,
   character,
   onCardSelected,
}: ActionCardListProps): JSX.Element => {
   return (
      <List
         sx={{
            maxHeight: "100vh",
            overflowX: "hidden",
            overflowY: "scroll",
            padding: 0,
            margin: 0,
         }}
         className="action-card-list"
      >
         {/** using index works fine for us here,
          * since list is not modified.
          */}
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
                  <ActionCard
                     cardAtom={card}
                     onCardSelected={onCardSelected}
                     character={character}
                  />
               </ListItem>
            )
         })}
      </List>
   )
}

export { ActionCardList }
