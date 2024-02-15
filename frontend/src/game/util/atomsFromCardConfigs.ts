import { Atom, atom } from "jotai"
import { ZActionCard } from "../../../../shared/types/types"

const atomsFromCardConfigs = (cardConfigs: Array<ZActionCard>) => {
   const cardAtoms: Array<Atom<ZActionCard>> = []

   for (const config of cardConfigs) {
      config.actions = config.actions.map((action) => {
         action.actionDelayMultiplier = action.effects.reduce(
            (total, effect) => {
               return total * effect.actionDelayMultiplier
            },
            1
         )

         return action
      })
      cardAtoms.push(atom(config))
   }

   return cardAtoms
}

export { atomsFromCardConfigs }
