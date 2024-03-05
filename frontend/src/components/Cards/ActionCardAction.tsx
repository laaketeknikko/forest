import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import AccordionDetails from "@mui/material/AccordionDetails"
import Box from "@mui/material/Box"
import { theme } from "../../styles/mui/theme"
import { EffectDescription } from "./EffectDescription"
import {
   ZActionCard,
   ZActionCardAction,
   ZCharacter,
} from "../../../../shared/types/types"
import { useState } from "react"

export interface ActionCardActionProps {
   action: ZActionCardAction
   card: ZActionCard
   character: ZCharacter
}

const ActionCardAction = ({
   action,
   card,
   character,
}: ActionCardActionProps) => {
   const [expandedAction, setExpandedAction] = useState<string | false>(false)
   /**
    * The currently executable action is highlighted.
    */
   const activeClass = card.nextActionId === action._id ? "active-action" : ""

   return (
      <Accordion
         disableGutters
         key={action._id}
         className={activeClass}
         expanded={expandedAction === action._id || activeClass.length > 0}
         onChange={() => {
            if (!expandedAction) {
               setExpandedAction(action._id || false)
            } else {
               setExpandedAction(false)
            }
         }}
         elevation={0}
      >
         <AccordionSummary
            sx={{
               ".MuiAccordionSummary-content": {
                  marginTop: 2,
                  marginBottom: 2,
                  minHeight: 0,
               },
               ".MuiAccordionSummary-root": {
                  minHeight: 0,
               },
               "..MuiButtonBase-root": {
                  minHeight: 0,
               },
            }}
         >
            <Typography
               color={activeClass ? "primary" : "text.primary"}
               variant="body1"
            >
               {action.name}
            </Typography>
         </AccordionSummary>
         <AccordionDetails
            sx={
               activeClass
                  ? {}
                  : {
                       borderLeft: "1px solid",
                       borderColor: theme.palette.text.secondary,
                    }
            }
         >
            {action.effects.map((effect, index) => (
               <Box component="div" key={index} sx={{ margin: 0 }}>
                  <EffectDescription effect={effect} character={character} />
                  <Typography variant="body2" color="primary">
                     then
                  </Typography>
               </Box>
            ))}
            <Typography variant="body2" color="primary">
               Action end
            </Typography>
            <Typography>
               Adds{" "}
               <Typography component="span" color="primary">
                  {(
                     action.actionDelayMultiplier * character.baseActionDelay
                  ).toFixed(1)}
               </Typography>{" "}
               delay
            </Typography>
         </AccordionDetails>
      </Accordion>
   )
}

export { ActionCardAction }
