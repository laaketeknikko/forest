import { Atom, atom } from "jotai"

const atomsFromCardConfigs = (cardConfigs: Array<ActionCard>) => {
   const cardAtoms: Array<Atom<ActionCard>> = []

   for (const config of cardConfigs) {
      cardAtoms.push(atom(config))
   }

   return cardAtoms
}

export { atomsFromCardConfigs }
