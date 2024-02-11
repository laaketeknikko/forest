import { Atom, atom } from "jotai"
import { IActionCard } from "../../../../shared/types/types"

const atomsFromCardConfigs = (cardConfigs: Array<IActionCard>) => {
   const cardAtoms: Array<Atom<IActionCard>> = []

   for (const config of cardConfigs) {
      cardAtoms.push(atom(config))
   }

   return cardAtoms
}

export { atomsFromCardConfigs }
