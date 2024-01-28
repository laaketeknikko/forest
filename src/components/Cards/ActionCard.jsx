import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import PropTypes from "prop-types"
import CardHeader from "@mui/material/CardHeader"

const ActionCard = ({ card, onActionTriggered, onCardSelected }) => {
   console.log("in card, ", card)
   return (
      <Card sx={{ width: "100%" }} className="action-card">
         <CardActionArea onClick={() => onActionTriggered(card)}>
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

ActionCard.propTypes = {
   card: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      actions: PropTypes.arrayOf(PropTypes.object).isRequired,
      nextActionId: PropTypes.string.isRequired,
   }),
   onActionTriggered: PropTypes.func.isRequired,
}

export { ActionCard }
