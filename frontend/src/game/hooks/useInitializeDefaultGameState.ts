import clone from "clone"

import { Atom, atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { atomsFromCardConfigs } from "../util/atomsFromCardConfigs"
import { allEnemiesAtom } from "../state/jotai/enemies"
import { useLoadDefaultConfigs } from "../../hooks/useLoadDefaultConfigs"
import { allScenarioConfigsAtom } from "../state/jotai/scenarios"
import { defaultConfigsAtom } from "../state/jotai/gameState"
import { useEffect } from "react"

const useInitializeCharacters = () => {
   const [, setAllCharactersAtom] = useAtom(allPlayerCharactersAtom)
   const [defaultConfigs] = useAtom(defaultConfigsAtom)

   useEffect(() => {
      if (defaultConfigs.characters && defaultConfigs.characters.length > 0) {
         // wrapperFunc used to be async, that is why this construct.
         // Keep it just in case.
         const wrapperFunc = () => {
            const characterConfigs = defaultConfigs.characters
            const characterAtoms: Array<Atom<Character>> = []

            for (const characterConfig of characterConfigs) {
               const character = clone(characterConfig, false)

               character.cards = setInitialActiveActions(character.cards)
               character.cards = atomsFromCardConfigs(character.cards)

               character.currentActionDelay =
                  character.baseActionDelay * Math.random() * 2

               const newCharacterAtom = atom(character)
               characterAtoms.push(newCharacterAtom)
            }

            setAllCharactersAtom(characterAtoms)
         }

         wrapperFunc()
      }
   }, [defaultConfigs, setAllCharactersAtom])
}

const useInitializeEnemies = () => {
   const [, setAllEnemiesAtom] = useAtom(allEnemiesAtom)
   const [defaultConfigs] = useAtom(defaultConfigsAtom)

   useEffect(() => {
      if (defaultConfigs.enemies && defaultConfigs.enemies.length > 0) {
         const enemyConfigs = defaultConfigs.enemies
         const enemies: Array<Atom<Enemy>> = []
         const wrapperFunc = () => {
            for (const enemyConfig of enemyConfigs) {
               const enemy = clone(enemyConfig)

               enemy.cards = setInitialActiveActions(enemy.cards)
               enemy.cards = atomsFromCardConfigs(enemy.cards)

               enemy.currentActionDelay =
                  enemy.baseActionDelay * Math.random() * 2
               const enemyAtom = atom(enemy)
               enemies.push(enemyAtom)
            }
         }

         wrapperFunc()

         setAllEnemiesAtom(enemies)
      }
   }, [defaultConfigs, setAllEnemiesAtom])
}

const useInitializeScenarios = () => {
   const [, setAllScenariosAtom] = useAtom(allScenarioConfigsAtom)
   const [defaultConfigs] = useAtom(defaultConfigsAtom)

   useEffect(() => {
      if (defaultConfigs.scenarios && defaultConfigs.scenarios.length > 0) {
         const scenarioConfigs = defaultConfigs.scenarios

         const scenarios: Array<ScenarioConfig> = []
         const wrapperFunc = () => {
            for (const scenarioConfig of scenarioConfigs) {
               const scenario = clone(scenarioConfig)

               scenarios.push(scenario)
            }
         }

         wrapperFunc()

         setAllScenariosAtom(scenarios)
      }
   }, [defaultConfigs.scenarios, setAllScenariosAtom])
}

const useInitializeDefaultGameState = () => {
   const [defaultConfigs] = useAtom(defaultConfigsAtom)

   const configs = useLoadDefaultConfigs()

   useInitializeCharacters()
   useInitializeEnemies()
   useInitializeScenarios()

   const initializeDefaultGameState = async () => {
      if (
         defaultConfigs.characters.length === 0 ||
         defaultConfigs.enemies.length === 0 ||
         defaultConfigs.scenarios.length === 0
      ) {
         await configs.loadConfigs()
      }
      return true
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
