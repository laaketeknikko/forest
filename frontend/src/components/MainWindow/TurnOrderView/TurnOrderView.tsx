import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { turnOrderAtom } from "../../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { TurnOrderViewItem } from "./TurnOrderViewItem"

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

export { TurnOrderView }
