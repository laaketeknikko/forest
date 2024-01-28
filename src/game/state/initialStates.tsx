import { atom } from "jotai"

const emptyActionCard: ActionCard = {
   id: "",
   name: "",
   description: "",
   actions: [],
   nextActionId: "",
}

const emptyActionCardAtom = atom<ActionCard>({ ...emptyActionCard })

const emptyCharacter: Character = {
   name: "",
   spritePath: "",
   cards: [],
   selectedCardId: "",
   baseActionDelay: 0,
   currentActionDelay: 0,
}

const emptyCharacterAtom = atom<Character>(emptyCharacter)

export {
   emptyCharacterAtom,
   emptyCharacter,
   emptyActionCard,
   emptyActionCardAtom,
}
