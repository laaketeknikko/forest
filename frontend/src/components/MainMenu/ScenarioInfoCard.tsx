import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"

import Card from "@mui/material/Card"

import { selectedScenarioConfigAtom } from "../../game/state/jotai/scenarios"
import { useAtom } from "jotai"
import CardMedia from "@mui/material/CardMedia"
import { ZScenarioConfig } from "../../../../shared/types/types"

interface ScenarioInfoCardProps {
   scenarioInfo: ZScenarioConfig
   setScenarioSelected: (value: boolean) => void
}

const ScenarioInfoCard = ({
   scenarioInfo,
   setScenarioSelected,
}: ScenarioInfoCardProps) => {
   const [, setSelectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const handleClick = () => {
      setSelectedScenarioConfig(scenarioInfo)
      setScenarioSelected(true)
   }

   return (
      <Card>
         <CardActionArea onClick={handleClick}>
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
