import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"

interface ScenarioInfoCardProps {
   scenarioInfo: ScenarioConfig
}

const ScenarioInfoCard = ({ scenarioInfo }: ScenarioInfoCardProps) => {
   return (
      <Card>
         <CardActionArea>
            <CardHeader title={scenarioInfo.name}></CardHeader>
            <CardContent>
               <img src={scenarioInfo.thumbNailPath} />
            </CardContent>
         </CardActionArea>
      </Card>
   )
}

export { ScenarioInfoCard }
