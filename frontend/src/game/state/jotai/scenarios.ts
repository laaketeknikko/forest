import { atom } from "jotai"
import { emptyScenario } from "../initialStates"
import { ZScenarioConfig } from "../../../../../shared/types/types"

const allScenarioConfigsAtom = atom<Array<ZScenarioConfig>>([])
const selectedScenarioConfigAtom = atom(emptyScenario)

export { allScenarioConfigsAtom, selectedScenarioConfigAtom }
