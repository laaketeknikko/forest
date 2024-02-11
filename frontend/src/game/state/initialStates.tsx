import { atom } from "jotai"
import {
   IActionCard,
   ICharacter,
   IEnemy,
   IScenarioConfig,
} from "../../../../shared/types/types"

const emptyActionCard: IActionCard = {
   _id: "empty",
   name: "",
   description: "",
   actions: [],
   nextActionId: "",
}

const emptyActionCardAtom = atom<IActionCard>({ ...emptyActionCard })

const emptyCharacter: ICharacter = {
   name: "",
   spritePath: "",
   cards: [],
   selectedCardId: "",
   baseActionDelay: 0,
   currentActionDelay: 0,
   position: { x: 0, y: 0, z: 0 },
   health: 0,
   _id: "empty",
}

const emptyCharacterAtom = atom<ICharacter>(emptyCharacter)

const emptyScenario: IScenarioConfig = {
   name: "Choose a scenario",
   description: "",
   enemies: [],
   maxPartySize: 0,
   playerCharacterStartingPositions: [],
   shortDescription: "Choose a scenario",
   arena: { size: { width: 0, length: 0 } },
   thumbNailPath: "",
   _id: "empty",
}

const emptyScenarioAtom = atom(emptyScenario)

const emptyEnemy: IEnemy = {
   name: "",
   baseActionDelay: 0,
   cards: [],
   currentActionDelay: 0,
   health: 0,
   position: { x: 0, z: 0, y: 0 },
   selectedCardId: "",
   spritePath: "",
   _id: "empty",
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
