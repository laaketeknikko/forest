import Typography from "@mui/material/Typography"
import { ZActionEffect, ZCharacter } from "../../../../shared/types/types"

export interface EffectDescriptionProps {
   effect: ZActionEffect
   character: ZCharacter
}

/**
 *
 * EffectDescription is used to display a description of a single effect
 * of an action.
 *
 * @param {ZActionEffect} props.effect - the effect to display
 * @param {ZCharacter} props.character - the character associated with the effect. Used to calculate damage etc.
 */
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
