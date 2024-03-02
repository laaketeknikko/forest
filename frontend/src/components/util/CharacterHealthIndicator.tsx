import LinearProgress from "@mui/material/LinearProgress"

export interface CharacterHealthIndicatorProps {
   current: number
   max: number
}

const CharacterHealthIndicator = ({
   current,
   max,
}: CharacterHealthIndicatorProps) => {
   // TODO: Progress indicator needs to be replaced. It uses too processing power.
   return (
      <div>
         Moi
         {/*<LinearProgress
         value={(current / max) * 100}
         valueBuffer={100}
         variant="buffer"
         color="primary"
   />*/}
      </div>
   )
}

export { CharacterHealthIndicator }
