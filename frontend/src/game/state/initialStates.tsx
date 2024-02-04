import { atom } from "jotai"

const emptyActionCard: ActionCard = {
   id: "empty",
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
   id: "empty",
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
   id: "empty",
}

const emptyScenarioAtom = atom(emptyScenario)

const emptyEnemy: Enemy = {
   name: "",
   baseActionDelay: 0,
   cards: [],
   currentActionDelay: 0,
   health: 0,
   position: { x: 0, z: 0, y: 0 },
   selectedCardId: "",
   spritePath: "",
   id: "empty",
}

const emptyEnemyAtom = atom(emptyEnemy)

const emptyConfig = {
   characters: emptyCharacter,
   enemies: emptyEnemy,
   scenarios: emptyScenario,
}

export {
   emptyCharacterAtom,
   emptyCharacter,
   emptyActionCard,
   emptyActionCardAtom,
   emptyScenario,
   emptyScenarioAtom,
   emptyEnemy,
   emptyEnemyAtom,
   emptyConfig,
}
