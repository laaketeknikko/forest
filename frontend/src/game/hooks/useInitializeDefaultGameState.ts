import clone from "clone"

import { Atom, atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { atomsFromCardConfigs } from "../util/atomsFromCardConfigs"
import { allEnemiesAtom } from "../state/jotai/enemies"
import { useLoadDefaultConfigs } from "../../hooks/useLoadDefaultConfigs"
import { allScenarioConfigsAtom } from "../state/jotai/scenarios"
import { defaultConfigsAtom } from "../state/jotai/gameState"
import { useEffect } from "react"
import {
   ZCharacter,
   ZEnemy,
   ZSaveConfigActionCard,
   ZScenarioConfig,
} from "../../../../shared/types/types"

/**
 * This hook is used to fetch all the available default configs
 * from the server and load them.
 *
 * Sets the following configs:
 * - allPlayerCharactersAtom
 * - allEnemiesAtom
 * - allScenarioConfigsAtom
 *
 * @returns - a function to be called to initialize the default configs
 */
const useInitializeDefaultConfigs = () => {
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

const useInitializeCharacters = () => {
   const [, setAllCharactersAtom] = useAtom(allPlayerCharactersAtom)
   const [defaultConfigs] = useAtom(defaultConfigsAtom)

   useEffect(() => {
      if (defaultConfigs.characters && defaultConfigs.characters.length > 0) {
         // wrapperFunc used to be async, that is why this construct.
         // Keep it just in case.
         const wrapperFunc = () => {
            const characterConfigs = defaultConfigs.characters
            const characterAtoms: Array<Atom<ZCharacter>> = []

            for (const characterConfig of characterConfigs) {
               const character = clone(characterConfig, false)

               const newCards = atomsFromCardConfigs(
                  setInitialActiveActions(character.cards)
               )

               character.currentActionDelay =
                  character.baseActionDelay * Math.random() * 2

               const newCharacterAtom = atom({ ...character, cards: newCards })
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
         const enemies: Array<Atom<ZEnemy>> = []
         const wrapperFunc = () => {
            for (const enemyConfig of enemyConfigs) {
               const clonedConfig = clone(enemyConfig)
               const cards = atomsFromCardConfigs(
                  setInitialActiveActions(clonedConfig.cards)
               )

               const actionDelay =
                  clonedConfig.baseActionDelay * Math.random() * 2
               const enemyAtom = atom({
                  ...clonedConfig,
                  cards: cards,
                  currentActionDelay: actionDelay,
               })
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

         const scenarios: Array<ZScenarioConfig> = []
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

const setInitialActiveActions = (cards: Array<ZSaveConfigActionCard>) => {
   const newCards: Array<ZSaveConfigActionCard> = []
   for (const card of cards) {
      const newCard = clone(card)
      if (newCard.actions?.length > 0) {
         newCard.nextActionId = newCard.actions[0]._id
      }
      newCards.push(newCard)
   }

   return newCards
}

export { useInitializeDefaultConfigs }
