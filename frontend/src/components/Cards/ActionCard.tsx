import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"
import { useAtom, Atom } from "jotai"
import {
   currentlySelectedActionCardAtom,
   gameExecutionStateAtom,
} from "../../game/state/jotai/gameState"

import { emptyActionCardAtom } from "../../game/state/initialStates"
import { ZActionCard, ZCharacter } from "../../../../shared/types/types"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import { memo, useMemo, useState } from "react"
import { EffectDescription } from "./EffectDescription"
import { theme } from "../../styles/mui/theme"
import Box from "@mui/material/Box"

export type onCardSelectedFunc = (card: Atom<ZActionCard>) => void

interface ActionCardProps {
   cardAtom: Atom<ZActionCard>
   character: ZCharacter
   onCardSelected?: onCardSelectedFunc
}

/**
 * TODO: Allow expanding multiple action accordions
 *with controlled accordions.
 */

/**
 * Renders an Action Card component.
 *
 * @param {ActionCardProps} cardAtom - the atom for the card
 * @param {Character} character - the character associated with the card
 * @return {JSX.Element} the Action Card component
 */
const ActionCard = ({ cardAtom, character }: ActionCardProps) => {
   const [card] = useAtom(cardAtom)
   const [currentlySelectedCard, setCurrentSelectedActionCard] = useAtom(
      currentlySelectedActionCardAtom
   )
   const [gameExecutionState] = useAtom(gameExecutionStateAtom)
   const [expandedAction, setExpandedAction] = useState<string | false>(false)

   /**
    * Returns the JSX of a single card, rendering the actions and the effects.
    */
   const cardContent = useMemo(() => {
      return card.actions.map((action) => {
         /**
          * The currently executable action is highlighted.
          */
         const activeClass =
            card.nextActionId === action._id ? "active-action" : ""

         return (
            <Accordion
               key={action._id}
               className={activeClass}
               expanded={
                  expandedAction === action._id || activeClass.length > 0
               }
               onChange={() => {
                  setExpandedAction(action._id || false)
               }}
            >
               <AccordionSummary>
                  <Typography color={activeClass ? "primary" : "text.primary"}>
                     {action.name}
                  </Typography>
               </AccordionSummary>
               <AccordionDetails
                  sx={
                     activeClass
                        ? {}
                        : {
                             borderLeft: "1px solid",
                             borderColor: theme.palette.text.secondary,
                          }
                  }
               >
                  {action.effects.map((effect, index) => (
                     <Box component="div" key={index}>
                        <EffectDescription
                           effect={effect}
                           character={character}
                        />
                        <Typography variant="body2" color="primary">
                           then
                        </Typography>
                     </Box>
                  ))}
                  <Typography variant="body2" color="primary">
                     Action end
                  </Typography>
                  <Typography>
                     Adds{" "}
                     <Typography component="span" color="primary">
                        {action.actionDelayMultiplier *
                           character.baseActionDelay}
                     </Typography>{" "}
                     delay
                  </Typography>
               </AccordionDetails>
            </Accordion>
         )
      })
   }, [card.actions, card.nextActionId, character, expandedAction])

   return (
      <Card sx={{ width: "100%", padding: 0 }} className="action-card">
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
                * TODO: Does deselection work?
                * */
               if (cardAtom === currentlySelectedCard) {
                  setCurrentSelectedActionCard(emptyActionCardAtom)
               } else {
                  setCurrentSelectedActionCard(cardAtom)
               }
            }}
         >
            <CardHeader
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
            {cardContent.map((item) => item)}
         </CardContent>
      </Card>
   )
}

ActionCard.displayName = "ActionCard"

const MemoedCard = memo(ActionCard)

export { MemoedCard as ActionCard }
