import * as zodSchemas from "../../../../shared/zod/schemas"
import * as types from "../../../../shared/types/types"

const validateCharacterConfig = (
   characterConfig: types.ZSaveConfigCharacter
) => {
   const validationSchema = zodSchemas.CharacterSchema

   const result = validationSchema.safeParse(characterConfig)

   return result
}

const validateEnemyConfig = (enemyConfig: types.ZSaveConfigEnemy) => {
   const validationSchema = zodSchemas.EnemySchema

   const result = validationSchema.safeParse(enemyConfig)

   return result
}

const validateScenarioConfig = (scenarioConfig: types.ZScenarioConfig) => {
   const validationSchema = zodSchemas.ScenarioConfigSchema

   const result = validationSchema.safeParse(scenarioConfig)

   return result
}

export { validateCharacterConfig, validateEnemyConfig, validateScenarioConfig }
