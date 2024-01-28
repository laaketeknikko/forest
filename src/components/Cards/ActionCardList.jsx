import { useState } from "react"
import Box from "@mui/material/Box"

import { ActionCard } from "./ActionCard"
import PropTypes from "prop-types"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const ActionCardList = ({ cards, onActionTriggered }) => {
   const [activeCardId, setActiveCardId] = useState("")

   const onCardSelected = (card) => {
      setActiveCardId(card.id)
   }

   return (
      <List
         sx={{ maxHeight: "100vh", overflowX: "hidden", overflowY: "scroll" }}
      >
         {cards.map((card, index) => {
            return (
               <ListItem key={index}>
                  <Box
                     sx={
                        card.id === activeCardId
                           ? {
                                borderColor: "red",
                                border: 1,
                             }
                           : {}
                     }
                  >
                     <ActionCard
                        card={card}
                        onActionTriggered={onActionTriggered}
                        onCardSelected={onCardSelected}
                     />
                  </Box>
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
