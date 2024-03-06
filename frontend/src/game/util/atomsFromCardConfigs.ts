import { PrimitiveAtom, atom } from "jotai"
import {
   ZActionCard,
   ZActionCardAction,
   ZSaveConfigActionCard,
} from "../../../../shared/types/types"

const atomsFromCardConfigs = (cardConfigs: Array<ZSaveConfigActionCard>) => {
   const cardAtoms: Array<PrimitiveAtom<ZActionCard>> = []

   for (const config of cardConfigs) {
      const card = atomFromSingleCardConfig(config)

      cardAtoms.push(atom(card))
   }

   return cardAtoms
}

const atomFromSingleCardConfig = (config: ZSaveConfigActionCard) => {
   const cardActions: Array<ZActionCardAction> = config.actions.map(
      (actionConfig) => {
         const action: ZActionCardAction = {
            ...actionConfig,
            actionDelayMultiplier: actionConfig.effects.reduce(
               (total, effect) => {
                  return total * effect.actionDelayMultiplier
               },
               1
            ),
         }

         return action
      }
   )

   const card: ZActionCard = {
      ...config,
      actions: cardActions,
   }

   return card
}

export { atomsFromCardConfigs, atomFromSingleCardConfig }
