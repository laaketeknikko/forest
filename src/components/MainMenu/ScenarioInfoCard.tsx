import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import Card from "@mui/material/Card"

import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { useAtom } from "jotai"
import CardMedia from "@mui/material/CardMedia"

interface ScenarioInfoCardProps {
   scenarioInfo: ScenarioConfig
}

const ScenarioInfoCard = ({ scenarioInfo }: ScenarioInfoCardProps) => {
   const [, setSelectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   return (
      <Card>
         <CardActionArea
            onClick={() => setSelectedScenarioConfig(scenarioInfo)}
         >
            <CardMedia
               component="img"
               image={scenarioInfo.thumbNailPath}
               width="100%"
            />
            <CardHeader title={scenarioInfo.name}></CardHeader>
         </CardActionArea>
      </Card>
   )
}

export { ScenarioInfoCard }
