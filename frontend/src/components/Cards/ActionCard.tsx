import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"
import { useAtom, Atom } from "jotai"
import { currentlySelectedActionCardAtom } from "../../game/state/jotai/gameState"

import { emptyActionCardAtom } from "../../game/state/initialStates"
import { ZActionCard } from "../../../../shared/types/types"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"

//export type onActionTriggeredFunc = (card: Atom<ActionCard>) => void
export type onCardSelectedFunc = (card: Atom<ZActionCard>) => void

interface ActionCardProps {
   cardAtom: Atom<ZActionCard>
   //   onActionTriggered: onActionTriggeredFunc
   onCardSelected?: onCardSelectedFunc
}

const ActionCard = ({ cardAtom }: ActionCardProps) => {
   const [card] = useAtom(cardAtom)
   const [currentlySelectedCard, setCurrentSelectedActionCard] = useAtom(
      currentlySelectedActionCardAtom
   )

   return (
      <Card sx={{ width: "100%", padding: 0 }} className="action-card">
         <CardActionArea
            sx={{ padding: 0 }}
            onClick={() => {
               // Allow selecting and deselecting cards.
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
               }}
            ></CardHeader>
         </CardActionArea>
         <CardContent sx={{ padding: 0 }}>
            {card.actions.map((action) => {
               const activeClass =
                  card.nextActionId === action._id ? "active-action" : ""

               return (
                  <Accordion key={action._id} className={activeClass}>
                     <AccordionSummary>
                        <Typography>{action.name}</Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                        <Typography>Type: {action.type}</Typography>
                        <Typography>
                           Delay: {action.actionDelayMultiplier}
                        </Typography>
                     </AccordionDetails>
                  </Accordion>
               )
            })}
         </CardContent>
      </Card>
   )
}

export { ActionCard }
