import Typography from "@mui/material/Typography"

export interface CharacterHealthIndicatorProps {
   current: number
   max: number
}

const CharacterHealthIndicator = ({
   current,
   max,
}: CharacterHealthIndicatorProps) => {
   return (
      <Typography>
         HP:{" "}
         <Typography component="span" color="primary">
            {current}
         </Typography>
         <Typography component="span">/</Typography>
         <Typography component="span" color="primary">
            {max}
         </Typography>
      </Typography>
   )
}

export { CharacterHealthIndicator }
