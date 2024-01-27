import { ActionCard } from "./ActionCard"
import PropTypes from "prop-types"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const ActionCardList = ({ cards, onActionTriggered }) => {
   return (
      <List
         sx={{ maxHeight: "100vh", overflowX: "hidden", overflowY: "scroll" }}
      >
         {cards.map((card, index) => {
            return (
               <ListItem key={index}>
                  <ActionCard
                     card={card}
                     onActionTriggered={onActionTriggered}
                  />
               </ListItem>
            )
         })}
      </List>
   )
}

ActionCardList.propTypes = {
   cards: PropTypes.arrayOf(ActionCard),
   onActionTriggered: PropTypes.func.isRequired,
}

export { ActionCardList }
