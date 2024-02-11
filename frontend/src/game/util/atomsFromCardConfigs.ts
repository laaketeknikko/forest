import { Atom, atom } from "jotai"
import { ZActionCard } from "../../../../shared/types/types"

const atomsFromCardConfigs = (cardConfigs: Array<ZActionCard>) => {
   const cardAtoms: Array<Atom<ZActionCard>> = []

   for (const config of cardConfigs) {
      cardAtoms.push(atom(config))
   }

   return cardAtoms
}

export { atomsFromCardConfigs }
