import CardActionArea from "@mui/material/CardActionArea"
import CardHeader from "@mui/material/CardHeader"

import Card from "@mui/material/Card"

import { selectedScenarioConfigAtom } from "../../../game/state/jotai/scenarios"
import { useAtom } from "jotai"
import CardMedia from "@mui/material/CardMedia"
import { ZScenarioConfig } from "../../../../../shared/types/types"

/**
 * Used to display scenario info in scenario selection list.
 *
 * Calls setScenarioSelected(true) when scenario is clicked on.
 * Sets the selectedScenarioConfigAtom with scenario when clicked on.
 */
export interface ScenarioInfoCardProps {
   scenarioInfo: ZScenarioConfig
   setScenarioSelected: (value: boolean) => void
   isSelectable: boolean
}

const ScenarioInfoCard = ({
   scenarioInfo,
   setScenarioSelected,
   isSelectable,
}: ScenarioInfoCardProps) => {
   const [, setSelectedScenarioConfig] = useAtom(selectedScenarioConfigAtom)

   const handleClick = () => {
      setSelectedScenarioConfig(scenarioInfo)
      setScenarioSelected(true)
   }

   const disabledStyles = {
      opacity: 0.5,
      cursor: "not-allowed",
   }

   return (
      <Card sx={isSelectable ? {} : disabledStyles}>
         <div>
            <CardActionArea
               sx={{ padding: 0 }}
               onClick={handleClick}
               disabled={!isSelectable}
            >
               <CardMedia
                  component="img"
                  image={scenarioInfo.thumbNailPath}
                  width="100%"
                  sx={{ padding: 0 }}
               />
               <CardHeader
                  titleTypographyProps={{
                     color: "primary",
                     textAlign: "center",
                  }}
                  title={scenarioInfo.name}
                  sx={{ padding: 0 }}
               ></CardHeader>
            </CardActionArea>
         </div>
      </Card>
   )
}

export { ScenarioInfoCard }
