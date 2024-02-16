import Typography from "@mui/material/Typography"
import { ZActionEffect, ZCharacter } from "../../../../shared/types/types"

interface EffectDescriptionProps {
   effect: ZActionEffect
   character: ZCharacter
}

const EffectDescription = ({ effect, character }: EffectDescriptionProps) => {
   switch (effect.type) {
      case "offensive":
         return (
            <OffensiveEffectDescription effect={effect} character={character} />
         )
         break
      case "movement":
         return (
            <MovementEffectDescription effect={effect} character={character} />
         )
         break
   }
}

const MovementEffectDescription = ({ effect }: EffectDescriptionProps) => {
   return (
      <Typography>
         Move{" "}
         <Typography component="span" color="primary">
            {effect.range}
         </Typography>
      </Typography>
   )
}

const OffensiveEffectDescription = ({
   effect,
   character,
}: EffectDescriptionProps) => {
   return (
      <Typography>
         Deal{" "}
         <Typography component="span" color="primary">
            {effect.powerMultiplier! * character.strength}
         </Typography>{" "}
         {effect.damageType} damage
      </Typography>
   )
}

export { EffectDescription }
