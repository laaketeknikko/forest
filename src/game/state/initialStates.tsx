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
   position: { x: 0, y: 0, z: 0 },
   health: 0,
}

const emptyCharacterAtom = atom<Character>(emptyCharacter)

const emptyScenario: ScenarioConfig = {
   name: "Choose a scenario",
   description: "",
   enemies: [],
   maxPartySize: 0,
   playerCharacterStartingPositions: [],
   shortDescription: "Choose a scenario",
   arena: { size: { width: 0, length: 0 } },
   thumbNailPath: "",
}

export {
   emptyCharacterAtom,
   emptyCharacter,
   emptyActionCard,
   emptyActionCardAtom,
   emptyScenario,
}
