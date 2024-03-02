import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { ZCharacter } from "../../../../../shared/types/types"
import { getDefaultStore } from "jotai"

export interface CardListProps {
   character: ZCharacter
   direction: "vertical" | "horizontal"
}

const CardList = ({ character, direction }: CardListProps) => {
   return (
      <Stack
         direction={direction === "vertical" ? "column" : "row"}
         spacing={10}
      >
         {character.cards.map((card, _index) => {
            const jotaiStore = getDefaultStore()
            const cardData = jotaiStore.get(card)
            return (
               <Box component="div" key={cardData.name}>
                  <Typography color="primary">{cardData.name}</Typography>
                  {cardData.actions.map((action, actionIndex) => {
                     return (
                        <Typography
                           variant="body2"
                           key={`${actionIndex}${cardData.name}${action.name}`}
                        >
                           {action.name}
                        </Typography>
                     )
                  })}
               </Box>
            )
         })}
      </Stack>
   )
}

export { CardList }
