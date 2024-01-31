import { atom } from "jotai"

const allScenarioConfigsAtom = atom<Array<ScenarioConfig>>([])
const selectedScenarioConfigAtom = atom({})

export { allScenarioConfigsAtom, selectedScenarioConfigAtom }
