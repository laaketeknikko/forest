import { atom, PrimitiveAtom } from "jotai"
import { ZEnemy } from "../../../../../shared/types/types"

const allEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>([])

const activeScenarioEnemiesAtom = atom<Array<PrimitiveAtom<ZEnemy>>>([])

export { allEnemiesAtom, activeScenarioEnemiesAtom }
