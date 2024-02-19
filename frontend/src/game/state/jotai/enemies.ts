import { atom, PrimitiveAtom } from "jotai"
import { ZEnemy } from "../../../../../shared/types/types"

/**
 * Used to hold all enemy configs. These are references during scenario initialization.
 */
const allEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>([])

/**
 * List of active enemies. Used when inside a scenario.
 */
const activeScenarioEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>([])

export { allEnemiesAtom, activeScenarioEnemiesAtom }
