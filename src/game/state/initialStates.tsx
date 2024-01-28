import { atom } from "jotai"

const emptyActionCard = {
   id: "",
   name: "",
   description: "",
   actions: [],
   nextActionId: "",
}

const emptyActionCardAtom = atom({ ...emptyActionCard })

const emptyCharacter: Character = {
   name: "",
   spritePath: "",
   cards: [],
   selectedCardId: "",
   baseActionDelay: 0,
   currentActionDelay: 0,
}

const emptyCharacterAtom = atom(emptyCharacter)

export {
   emptyCharacterAtom,
   emptyCharacter,
   emptyActionCard,
   emptyActionCardAtom,
}
