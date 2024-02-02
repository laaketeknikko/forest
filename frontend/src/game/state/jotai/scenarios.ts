import { atom } from "jotai"
import { emptyScenario } from "../initialStates"

const allScenarioConfigsAtom = atom<Array<ScenarioConfig>>([])
const selectedScenarioConfigAtom = atom(emptyScenario)

export { allScenarioConfigsAtom, selectedScenarioConfigAtom }
