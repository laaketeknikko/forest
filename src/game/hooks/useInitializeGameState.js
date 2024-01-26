import { getCharacterConfigFolders } from "../util/getCharacterConfigFolders"
import { atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/characters/guineanpiglet"
import { characterLoader } from "../loaders/characterLoader"
import { useMemo, useEffect } from "react"

const useInitializeGameState = () => {
   const folders = useMemo(() => {
      return getCharacterConfigFolders()
   }, [])

   const [, setAllCharactersAtom] = useAtom(allPlayerCharactersAtom)

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

            const newCharacterAtom = atom({
               name: character.name,
               character: { ...character },
            })
            characterAtoms.push(newCharacterAtom)
         }

         setAllCharactersAtom(characterAtoms)
      }
      wrapperFunc()

      return () => {
         setAllCharactersAtom([])
      }
   }, [folders, setAllCharactersAtom])
}

export { useInitializeGameState }
