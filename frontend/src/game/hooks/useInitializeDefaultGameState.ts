import clone from "clone"

import { Atom, atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { atomsFromCardConfigs } from "../util/atomsFromCardConfigs"
import { allEnemiesAtom } from "../state/jotai/enemies"
import { useLoadDefaultConfigs } from "../../hooks/useLoadDefaultConfigs"
import { allScenarioConfigsAtom } from "../state/jotai/scenarios"

const useInitializeCharacters = ({ characterConfigs }) => {
   const [, setAllCharactersAtom] = useAtom(allPlayerCharactersAtom)

   // Read all character configs and add them to
   // allPlayerCharactersAtom as atoms.
   // Wrap the whole thing in an async function so
   // that we can await in the loop.

   const initializeCharacter = async () => {
      const wrapperFunc = async () => {
         const characterAtoms: Array<Atom<Character>> = []

         for (const characterConfig of characterConfigs) {
            const character = clone(characterConfig, false)

            character.cards = setInitialActiveActions(character.cards)
            character.cards = atomsFromCardConfigs(character.cards)

            if (character.name === "Sihhis") {
               character.position = { x: 0.5, y: 0.3, z: 0.5 }
            } else if (character.name === "Guinean Piglet") {
               character.position = { x: 14.5, y: 0.3, z: 14.5 }
            } else if (character.name === "Bushi") {
               character.position = { x: 14.5, y: 0.3, z: 0.5 }
            }

            character.currentActionDelay =
               character.baseActionDelay * Math.random() * 2

            const newCharacterAtom = atom(character)
            characterAtoms.push(newCharacterAtom)
         }

         setAllCharactersAtom(characterAtoms)
      }
      if (characterConfigs && characterConfigs.length > 0) {
         wrapperFunc()
      }
   }

   return initializeCharacter
}

const useInitializeEnemies = ({ enemyConfigs }) => {
   const [, setAllEnemiesAtom] = useAtom(allEnemiesAtom)

   const initializeEnemies = async () => {
      const enemies: Array<Atom<Enemy>> = []
      const wrapperFunc = async () => {
         for (const enemyConfig of enemyConfigs) {
            const enemy = clone(enemyConfig)

            enemy.cards = setInitialActiveActions(enemy.cards)
            enemy.cards = atomsFromCardConfigs(enemy.cards)
            enemy.position = { x: 7.5, y: 0.5, z: 7.5 }
            enemy.currentActionDelay = enemy.baseActionDelay * Math.random() * 2
            const enemyAtom = atom(enemy)
            enemies.push(enemyAtom)
         }
      }
      if (enemyConfigs && enemyConfigs.length > 0) {
         wrapperFunc()
      }

      setAllEnemiesAtom(enemies)
   }

   return initializeEnemies
}

const useInitializeScenarios = ({ scenarioConfigs }) => {
   const [, setAllScenariosAtom] = useAtom(allScenarioConfigsAtom)

   const initializeScenarios = async () => {
      const scenarios: Array<ScenarioConfig> = []
      const wrapperFunc = async () => {
         for (const scenarioConfig of scenarioConfigs) {
            const scenario = clone(scenarioConfig)

            scenarios.push(scenario)
         }
      }
      if (scenarioConfigs && scenarioConfigs.length > 0) {
         wrapperFunc()
      }

      setAllScenariosAtom(scenarios)
   }

   return initializeScenarios
}

const useInitializeDefaultGameState = () => {
   const configs = useLoadDefaultConfigs()

   const initializeCharacters = useInitializeCharacters({
      characterConfigs: configs.characters,
   })
   const initializeEnemies = useInitializeEnemies({
      enemyConfigs: configs.enemies,
   })
   const initializeScenarios = useInitializeScenarios({
      scenarioConfigs: configs.scenarios,
   })

   const initializeDefaultGameState = async () => {
      await initializeCharacters()
      await initializeEnemies()
      await initializeScenarios()
   }

   return initializeDefaultGameState
}

const setInitialActiveActions = (cards) => {
   const newCards: Array<ActionCard> = []
   for (const card of cards) {
      const newCard = clone(card)
      if (newCard.actions?.length > 0) {
         newCard.nextActionId = newCard.actions[0].id
      }
      newCards.push(newCard)
   }

   return newCards
}

export { useInitializeDefaultGameState }
