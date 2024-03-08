import * as zodSchemas from "../../../../shared/zod/schemas"
import * as types from "../../../../shared/types/types"

/**
 * Convenience wrapper around CharacterSchema validation.
 */
const validateCharacterConfig = (
   characterConfig: types.ZSaveConfigCharacter
) => {
   const validationSchema = zodSchemas.CharacterSchema

   const result = validationSchema.safeParse(characterConfig)

   return result
}

/**
 * Convenience wrapper around EnemySchema validation.
 */
const validateEnemyConfig = (enemyConfig: types.ZSaveConfigEnemy) => {
   const validationSchema = zodSchemas.EnemySchema

   const result = validationSchema.safeParse(enemyConfig)

   return result
}

/**
 * Convenience wrapper around ScenarioConfigSchema validation.
 */
const validateScenarioConfig = (scenarioConfig: types.ZScenarioConfig) => {
   const validationSchema = zodSchemas.ScenarioConfigSchema

   const result = validationSchema.safeParse(scenarioConfig)

   return result
}

export { validateCharacterConfig, validateEnemyConfig, validateScenarioConfig }
