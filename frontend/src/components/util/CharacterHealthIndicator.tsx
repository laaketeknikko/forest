import LinearProgress from "@mui/material/LinearProgress"

export interface CharacterHealthIndicatorProps {
   current: number
   max: number
}

const CharacterHealthIndicator = ({
   current,
   max,
}: CharacterHealthIndicatorProps) => {
   return (
      <LinearProgress
         value={(current / max) * 100}
         valueBuffer={100}
         variant="buffer"
         color="primary"
      />
   )
}

export { CharacterHealthIndicator }
