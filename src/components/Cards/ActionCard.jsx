import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"

const ActionCard = () => {
   return (
      <Card sx={{ width: "100%" }} className="action-card">
         <CardContent>
            <CardActionArea>
               <Typography>Card name</Typography>
            </CardActionArea>

            <Typography className="active-action">An action</Typography>
            <Typography>An action</Typography>
            <Typography>An action</Typography>
            <Typography>An action</Typography>
         </CardContent>
      </Card>
   )
}

export { ActionCard }
