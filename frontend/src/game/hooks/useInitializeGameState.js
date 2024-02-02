import clone from "clone"

import { atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { useEffect } from "react"
import { atomsFromCardConfigs } from "../util/atomsFromCardConfigs"
import { allEnemiesAtom } from "../state/jotai/enemies"
import { useLoadDefaultConfigs } from "../../hooks/useLoadDefaultConfigs"
import { allScenarioConfigsAtom } from "../state/jotai/scenarios"

const useInitializeCharacters = ({ characterConfigs }) => {
   const [, setAllCharactersAtom] = useAtom(allPlayerCharactersAtom)

   useEffect(() => {}, [characterConfigs])

   // Read all character configs and add them to
   // allPlayerCharactersAtom as atoms.
   // Wrap the whole thing in an async function so
   // that we can await in the loop.
   useEffect(() => {
      const wrapperFunc = async () => {
         const characterAtoms = []

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

      return () => {
         setAllCharactersAtom([])
      }
   }, [characterConfigs, setAllCharactersAtom])
}

const useInitializeEnemies = ({ enemyConfigs }) => {
   const [, setAllEnemiesAtom] = useAtom(allEnemiesAtom)

   useEffect(() => {
      const enemies = []
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

      return () => {
         setAllEnemiesAtom([])
      }
   }, [enemyConfigs, setAllEnemiesAtom])
}

const useInitializeScenarios = ({ scenarioConfigs }) => {
   const [, setAllScenariosAtom] = useAtom(allScenarioConfigsAtom)

   useEffect(() => {
      const scenarios = []
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

      return () => {
         setAllScenariosAtom([])
      }
   }, [scenarioConfigs, setAllScenariosAtom])
}

const useInitializeGameState = () => {
   const configs = useLoadDefaultConfigs()

   useInitializeCharacters({ characterConfigs: configs.characters })
   useInitializeEnemies({ enemyConfigs: configs.enemies })
   useInitializeScenarios({ scenarioConfigs: configs.scenarios })

   useEffect(() => {
      console.log("Game state in useInitializeGamestae", configs)
   }, [configs])
}

const setInitialActiveActions = (cards) => {
   const newCards = []
   for (const card of cards) {
      const newCard = clone(card)
      if (newCard.actions?.length > 0) {
         newCard.nextActionId = newCard.actions[0].id
      }
      newCards.push(newCard)
   }

   return newCards
}

export { useInitializeGameState }
