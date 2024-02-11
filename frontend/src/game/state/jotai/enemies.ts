import { atom, Atom } from "jotai"
import { ZEnemy } from "../../../../../shared/types/types"

const allEnemiesAtom = atom<Array<Atom<ZEnemy>>>([])

const activeScenarioEnemiesAtom = atom<Array<Atom<ZEnemy>>>([])

export { allEnemiesAtom, activeScenarioEnemiesAtom }
