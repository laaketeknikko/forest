import { getCharacterConfigFolders } from "../util/getCharacterConfigFolders"
import { atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { characterLoader } from "../loaders/characterLoader"
import { useMemo, useEffect } from "react"
import { turnOrderAtom } from "../state/jotai/gameState"
import { atomsFromCardConfigs } from "../util/atomsFromCardConfigs"
import { allEnemiesAtom } from "../state/jotai/enemies"
import { enemyConfig } from "../../config/enemies/miinii/enemyconfig"

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
            if (character.name === "Sihhis") {
               character.position = { x: 0.5, y: 0.3, z: 0.5 }
            } else if (character.name === "Guinean Piglet") {
               character.position = { x: 14.5, y: 0.3, z: 14.5 }
            }

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

const useInitializeEnemies = () => {
   const [, setAllEnemiesAtom] = useAtom(allEnemiesAtom)

   useEffect(() => {
      const enemies = []
      const wrapperFunc = async () => {
         const config = enemyConfig
         config.position = { x: 7.5, y: 0.5, z: 7.5 }
         const enemyAtom = atom(config)
         enemies.push(enemyAtom)
      }
      wrapperFunc()
      setAllEnemiesAtom(enemies)
   }, [setAllEnemiesAtom])
}

const useInitializeGameState = () => {
   useInitializeCharacters()
   useInitializeEnemies()
}

export { useInitializeGameState }
