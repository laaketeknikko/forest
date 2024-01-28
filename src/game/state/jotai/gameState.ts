import { Atom, atom } from "jotai"
import { emptyCharacterAtom } from "./characters"

const turnOrderAtom = atom<Atom<Character>[]>([emptyCharacterAtom])

export { turnOrderAtom }
