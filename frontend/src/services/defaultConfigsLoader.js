// TODO: Add validation to the responses.

import * as validation from "../game/util/validation"

const validate = (arrayValue, validator) => {
   if (Array.isArray(arrayValue)) {
      const results = arrayValue.map((value) => {
         return validator(value)
      })

      const successes = results.filter((result) => result.success)
      const failures = results.filter((result) => !result.success)

      return {
         successes,
         failures,
      }
   }
}

const serverRoot = import.meta.env.VITE_SERVER_LOCATION

const loadDefaultCharacterConfigs = async () => {
   try {
      const response = await fetch(`${serverRoot}/api/configs/characters`)
      const json = await response.json()

      const validated = validate(json, validation.validateCharacterConfig)
      return validated
   } catch (error) {
      console.error(error)
   }
}

const loadDefaultEnemyConfigs = async () => {
   try {
      const response = await fetch(`${serverRoot}/api/configs/enemies`)
      const json = await response.json()

      const validated = validate(json, validation.validateEnemyConfig)

      return validated
   } catch (error) {
      console.error(error)
   }
}

const loadDefaultScenarioConfigs = async () => {
   try {
      const response = await fetch(`${serverRoot}/api/configs/scenarios`)
      const json = await response.json()

      const validated = validate(json, validation.validateScenarioConfig)

      return validated
   } catch (error) {
      console.error(error)
   }
}

const loadDefaultConfigs = async () => {
   const characterConfigs = await loadDefaultCharacterConfigs()
   const enemyConfigs = await loadDefaultEnemyConfigs()
   const scenarioConfigs = await loadDefaultScenarioConfigs()

   const configs = {
      characters: characterConfigs.successes.map((success) => success.data),
      enemies: enemyConfigs.successes.map((success) => success.data),
      scenarios: scenarioConfigs.successes.map((success) => success.data),
   }

   if (
      characterConfigs.failures.length > 0 ||
      enemyConfigs.failures.length > 0 ||
      scenarioConfigs.failures.length > 0
   ) {
      console.log("Failures in validation: ", characterConfigs.failures)
      console.log("Character failures: ", characterConfigs.failures)
      console.log("Enemy failures: ", enemyConfigs.failures)
      console.log("Scenario failures: ", scenarioConfigs.failures)
   }

   return configs
}

export {
   loadDefaultConfigs,
   loadDefaultCharacterConfigs,
   loadDefaultScenarioConfigs,
   loadDefaultEnemyConfigs,
}
