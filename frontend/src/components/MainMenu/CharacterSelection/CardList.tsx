import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { ZCharacter } from "../../../../../shared/types/types"
import { getDefaultJotaiStore } from "../../../game/state/jotai/store"

export interface CardListProps {
   character: ZCharacter
   direction: "vertical" | "horizontal"
}

/**
 * A simple list to display a character's cards and action names.
 */
const CardList = ({ character, direction }: CardListProps) => {
   return (
      <Stack
         direction={direction === "vertical" ? "column" : "row"}
         spacing={10}
      >
         {character.cards.map((card, _index) => {
            const jotaiStore = getDefaultJotaiStore()
            const cardData = jotaiStore.get(card)
            return (
               <Box component="div" key={cardData._id}>
                  <Typography color="primary">{cardData.name}</Typography>
                  {cardData.actions.map((action) => {
                     return (
                        <Typography variant="body2" key={action._id}>
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
