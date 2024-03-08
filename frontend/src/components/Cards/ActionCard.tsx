import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"

import { PrimitiveAtom, useAtom } from "jotai"
import {
   currentlySelectedActionCardAtom,
   gameExecutionStateAtom,
} from "../../game/state/jotai/gameState"

import { memo, useMemo } from "react"
import { ZActionCard, ZCharacter } from "../../../../shared/types/types"
import { emptyActionCardAtom } from "../../game/state/initialStates"
import { theme } from "../../styles/mui/theme"

import { ActionCardAction } from "./ActionCardAction"

export type onCardSelectedFunc = (card: PrimitiveAtom<ZActionCard>) => void

export interface ActionCardProps {
   cardAtom: PrimitiveAtom<ZActionCard>
   character: ZCharacter
   onCardSelected?: onCardSelectedFunc
}

/**
 * Renders an Action Card component.
 *
 * Used in-game to render the action card list.
 *
 * @param props.cardAtom - the atom for the card
 * @param props.character - the character associated with the card
 * @return {JSX.Element} the Action Card component
 */
const ActionCard = ({ cardAtom, character }: ActionCardProps): JSX.Element => {
   const [card] = useAtom(cardAtom)
   const [currentlySelectedCard, setCurrentSelectedActionCard] = useAtom(
      currentlySelectedActionCardAtom
   )
   const [gameExecutionState] = useAtom(gameExecutionStateAtom)

   /**
    * Returns the JSX of a single card, rendering the actions and the effects.
    */
   const cardContent = useMemo(() => {
      return card.actions.map((action) => {
         return (
            <ActionCardAction
               key={action._id}
               action={action}
               card={card}
               character={character}
            />
         )
      })
   }, [card, character])

   return (
      <Card
         sx={{
            width: "100%",
            padding: 0,
         }}
         className="action-card"
         raised={false}
         elevation={0}
      >
         <CardActionArea
            sx={{ padding: 0 }}
            onClick={() => {
               /**
                * Prevent changing cards if in the middle of executing effects.
                * */
               if (gameExecutionState.actions.isPerfomingAction) {
                  return
               }
               /**
                * Allow selecting and deselecting cards.
                * */
               if (cardAtom === currentlySelectedCard) {
                  setCurrentSelectedActionCard(emptyActionCardAtom)
               } else {
                  setCurrentSelectedActionCard(cardAtom)
               }
            }}
         >
            <CardHeader
               titleTypographyProps={{
                  variant: cardAtom === currentlySelectedCard ? "h5" : "h6",
               }}
               title={card.name}
               sx={{
                  padding: 0,
                  paddingTop: 2,
                  paddingBottom: 2,
                  textAlign: "center",
                  color: theme.palette.primary.main,
               }}
            ></CardHeader>
         </CardActionArea>
         <CardContent sx={{ padding: 0 }}>
            {cardContent.map((card) => card)}
         </CardContent>
      </Card>
   )
}

ActionCard.displayName = "ActionCard"

const MemoedCard = memo(ActionCard)

export { MemoedCard as ActionCard }
