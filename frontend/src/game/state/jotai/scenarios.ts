import { atom } from "jotai"
import { emptyScenario } from "../initialStates"
import { IScenarioConfig } from "../../../../../shared/types/types"

const allScenarioConfigsAtom = atom<Array<IScenarioConfig>>([])
const selectedScenarioConfigAtom = atom(emptyScenario)

export { allScenarioConfigsAtom, selectedScenarioConfigAtom }
