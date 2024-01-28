import { getCharacterConfigFolders } from "../util/getCharacterConfigFolders"
import { atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { characterLoader } from "../loaders/characterLoader"
import { useMemo, useEffect } from "react"
import { turnOrderAtom } from "../state/jotai/gameState"
import { atomsFromCardConfigs } from "../util/atomsFromCardConfigs"

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

            character.cards = atomsFromCardConfigs(character.cards)

            character.currentActionDelay =
               character.baseActionDelay * Math.random() * 2

            const newCharacterAtom = atom(character)
            characterAtoms.push(newCharacterAtom)
         }

         setAllCharactersAtom(characterAtoms)
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
