import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { turnOrderAtom } from "../../../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { TurnOrderViewItem } from "./TurnOrderViewItem"

const TurnOrderView = () => {
   const [turnOrder] = useAtom(turnOrderAtom)

   return (
      <List>
         {turnOrder.map((characterAtom) => {
            return (
               <ListItem key={characterAtom.toString()}>
                  <TurnOrderViewItem characterAtom={characterAtom} />
               </ListItem>
            )
         })}
      </List>
   )
}

export { TurnOrderView }
