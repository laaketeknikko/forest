import { getCharacterConfigFolders } from "../util/getCharacterConfigFolders"
import { atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/guineanpiglet"
import { characterLoader } from "../loaders/characterLoader"
import { useMemo, useEffect } from "react"
import { turnOrderAtom } from "../state/jotai/gameState"
import { shuffle } from "lodash"

const useInitializeCharacters = () => {
   const folders = useMemo(() => {
      return getCharacterConfigFolders()
   }, [])

   const [, setAllCharactersAtom] = useAtom(allPlayerCharactersAtom)
   const [, setTurnOrderAtom] = useAtom(turnOrderAtom)

   // Read all character configs and add them to
   // allPlayerCharactersAtom as atoms.
   // Wrap the whole thing in an async function so
   // that we can await in the loop.
   useEffect(() => {
      const wrapperFunc = async () => {
         const characterAtoms = []

         for (const folder of folders) {
            let character = {}

            const loadCharacter = async () => {
               character = await characterLoader(folder)
            }
            await loadCharacter()

            const newCharacterAtom = atom(character)
            characterAtoms.push(newCharacterAtom)
         }

         setAllCharactersAtom(characterAtoms)
         const initialTurnOrder = [...characterAtoms]
         setTurnOrderAtom(shuffle(initialTurnOrder))
      }
      wrapperFunc()

      return () => {
         setAllCharactersAtom([])
      }
   }, [folders, setAllCharactersAtom, setTurnOrderAtom])
}

const useInitializeGameState = () => {
   useInitializeCharacters()
}

export { useInitializeGameState }
