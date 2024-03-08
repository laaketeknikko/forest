import Typography from "@mui/material/Typography"

export interface DebriefingStatProps {
   heading: string
   stat: string
}

/**
 * Used for text formatting.
 */
const DebriefingStat = ({ heading, stat }: DebriefingStatProps) => {
   return (
      <Typography variant="h6">
         {heading}:{" "}
         <Typography component="span" color="primary">
            {stat}
         </Typography>
      </Typography>
   )
}

export { DebriefingStat }
