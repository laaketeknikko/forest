import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"
import { useAtom, Atom } from "jotai"
import { currentlySelectedActionCardAtom } from "../../game/state/jotai/gameState"
import { useState } from "react"
import { emptyActionCardAtom } from "../../game/state/initialStates"

//export type onActionTriggeredFunc = (card: Atom<ActionCard>) => void
export type onCardSelectedFunc = (card: Atom<ActionCard>) => void

interface ActionCardProps {
   cardAtom: Atom<ActionCard>
   //   onActionTriggered: onActionTriggeredFunc
   onCardSelected?: onCardSelectedFunc
}

const ActionCard = ({ cardAtom }: ActionCardProps) => {
   const [card] = useAtom(cardAtom)
   const [, setCurrentSelectedActionCard] = useAtom(
      currentlySelectedActionCardAtom
   )
   const [isSelected, setIsSelected] = useState(false)

   return (
      <Card sx={{ width: "100%" }} className="action-card">
         <CardActionArea
            onClick={() => {
               if (isSelected) {
                  setIsSelected(false)
                  setCurrentSelectedActionCard(emptyActionCardAtom)
               } else {
                  setIsSelected(true)
                  setCurrentSelectedActionCard(cardAtom)
               }
            }}
         >
            <CardHeader title={card.name}></CardHeader>
         </CardActionArea>
         <CardContent>
            {card.actions.map((action) => {
               if (card.nextActionId === action.id) {
                  return (
                     <Typography className="active-action" key={action.id}>
                        {action.name}
                     </Typography>
                  )
               } else {
                  return <Typography key={action.id}>{action.name}</Typography>
               }
            })}
         </CardContent>
      </Card>
   )
}

export { ActionCard }
