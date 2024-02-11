import { atom, Atom } from "jotai"
import { IEnemy } from "../../../../../shared/types/types"

const allEnemiesAtom = atom<Array<Atom<IEnemy>>>([])

const activeScenarioEnemiesAtom = atom<Array<Atom<IEnemy>>>([])

export { allEnemiesAtom, activeScenarioEnemiesAtom }
