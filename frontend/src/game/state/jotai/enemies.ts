import { atom, Atom } from "jotai"

const allEnemiesAtom = atom<Array<Atom<Enemy>>>([])

const activeScenarioEnemiesAtom = atom<Array<Atom<Enemy>>>([])

export { allEnemiesAtom, activeScenarioEnemiesAtom }
