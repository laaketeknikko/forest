import { atom } from "jotai"
import { emptyScenario } from "../initialStates"
import { ZScenarioConfig } from "../../../../../shared/types/types"

/** Holds all the available loaded scenario configs.
 * Used to display scenario selection.
 */
const allScenarioConfigsAtom = atom<Array<ZScenarioConfig>>([])

/** Holds the user's currently selected scenario config.
 * Set when selecting a scenario and held until scenario
 * is completed.
 */
const selectedScenarioConfigAtom = atom(emptyScenario)

export { allScenarioConfigsAtom, selectedScenarioConfigAtom }
