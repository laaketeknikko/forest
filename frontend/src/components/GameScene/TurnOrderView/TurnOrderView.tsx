import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { turnOrderAtom } from "../../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { TurnOrderViewItem } from "./TurnOrderViewItem"
import { memo } from "react"

/**
 * Displays the turn order. Uses turnOrderAtom to get the order.
 */
const TurnOrderView = () => {
   const [turnOrder] = useAtom(turnOrderAtom)

   return (
      <List className="turn-order-list">
         {turnOrder.map((characterAtom) => {
            return (
               <ListItem
                  key={characterAtom.toString()}
                  sx={{ paddingLeft: 0.5, paddingRight: 0.5 }}
                  className="turn-order-list-item"
               >
                  <TurnOrderViewItem characterAtom={characterAtom} />
               </ListItem>
            )
         })}
      </List>
   )
}

const TurnOrderViewMemo = memo(TurnOrderView)

export { TurnOrderViewMemo as TurnOrderView }
