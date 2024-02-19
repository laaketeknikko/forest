import clone from "clone"

import { PrimitiveAtom, atom, useAtom } from "jotai"
import { allPlayerCharactersAtom } from "../state/jotai/characters"
import { atomsFromCardConfigs } from "../util/atomsFromCardConfigs"
import { allEnemiesAtom } from "../state/jotai/enemies"
import { useLoadDefaultConfigs } from "../../hooks/useLoadDefaultConfigs"
import { allScenarioConfigsAtom } from "../state/jotai/scenarios"
import { defaultConfigsAtom } from "../state/jotai/gameState"
import { useEffect } from "react"
import {
   ZDynamicGameEntity,
   ZSaveConfigActionCard,
   ZSaveConfigDynamicGameEntity,
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
 * This hook uses the following hooks:
 * - useInitializeCharacters
 * - useInitializeEnemies
 * - useInitializeScenarios
 * These hooks use useEffect to listen on changes in the default configs,
 * so the configs get initialized when initializeDefaultGameState is called.
 *
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
         setAllCharactersAtom(
            initializeDynamicGameEntityAtoms(defaultConfigs.characters)
         )
      }
   }, [defaultConfigs.characters, setAllCharactersAtom])
}

const useInitializeEnemies = () => {
   const [, setAllEnemiesAtom] = useAtom(allEnemiesAtom)
   const [defaultConfigs] = useAtom(defaultConfigsAtom)

   useEffect(() => {
      if (defaultConfigs.enemies && defaultConfigs.enemies.length > 0) {
         setAllEnemiesAtom(
            initializeDynamicGameEntityAtoms(defaultConfigs.enemies)
         )
      }
   }, [defaultConfigs.enemies, setAllEnemiesAtom])
}

const initializeDynamicGameEntityAtoms = (
   entityConfigs: Array<ZSaveConfigDynamicGameEntity>
): Array<PrimitiveAtom<ZDynamicGameEntity>> => {
   const entityAtoms: Array<PrimitiveAtom<ZDynamicGameEntity>> = []

   for (const entityConfig of entityConfigs) {
      /**
       * Clone just to be safe.
       */
      const entity = clone(entityConfig, false)

      const newCards = atomsFromCardConfigs(
         setInitialActiveActions(entity.cards)
      )

      entity.currentActionDelay = entity.baseActionDelay * Math.random() * 2

      const newCharacterAtom = atom({ ...entity, cards: newCards })
      entityAtoms.push(newCharacterAtom)
   }

   return entityAtoms
}

const useInitializeScenarios = () => {
   const [, setAllScenariosAtom] = useAtom(allScenarioConfigsAtom)
   const [defaultConfigs] = useAtom(defaultConfigsAtom)

   useEffect(() => {
      if (defaultConfigs.scenarios && defaultConfigs.scenarios.length > 0) {
         const scenarioConfigs = defaultConfigs.scenarios

         const scenarios: Array<ZScenarioConfig> = []

         for (const scenarioConfig of scenarioConfigs) {
            /**
             * Clone just to be safe.
             */
            const scenario = clone(scenarioConfig)
            scenarios.push(scenario)
         }

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
