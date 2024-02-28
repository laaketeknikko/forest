import { atom } from "jotai"
import {
   ZActionCard,
   ZCharacter,
   ZEnemy,
   ZSaveConfigScenarioConfig,
   ZScenarioConfig,
} from "../../../../shared/types/types"

const emptyActionCard: ZActionCard = {
   _id: "empty",
   name: "",
   description: "",
   actions: [],
   nextActionId: "",
}

const emptyActionCardAtom = atom<ZActionCard>({ ...emptyActionCard })

const emptyCharacter: ZCharacter = {
   name: "",
   spritePath: "",
   cards: [],
   selectedCardId: "",
   baseActionDelay: 0,
   currentActionDelay: 0,
   position: { x: 0, y: 0, z: 0 },
   health: 0,
   maxHealth: 0,
   _id: "empty",
   strength: 0,
}

const emptyCharacterAtom = atom<ZCharacter>(emptyCharacter)

const emptyScenario: ZScenarioConfig = {
   name: "",
   description: "",
   enemies: [],
   maxPartySize: 0,
   playerCharacterStartingPositions: [],
   shortDescription: "Choose a scenario",
   arena: { size: { width: 0, length: 0 } },
   thumbNailPath: "",
   _id: "empty",
   scenarioVictoryConditions: [],
   scenarioLossConditions: [],
}

const emptyScenarioAtom = atom(emptyScenario)

const emptyScenarioSaveConfig: ZSaveConfigScenarioConfig = {
   ...emptyScenario,
   scenarioVictoryConditions: [],
}

const emptyEnemy: ZEnemy = {
   name: "",
   baseActionDelay: 0,
   cards: [],
   currentActionDelay: 0,
   health: 0,
   maxHealth: 0,
   position: { x: 0, z: 0, y: 0 },
   selectedCardId: "",
   spritePath: "",
   _id: "empty",
   strength: 0,
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
   emptyScenarioSaveConfig,
}
