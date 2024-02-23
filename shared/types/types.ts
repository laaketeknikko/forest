import { PrimitiveAtom } from "jotai"
import * as schemas from "../zod/schemas"
import { z } from "zod"

export enum EDamageTypes {
   physical = "physical",
}

export enum EActionTypes {
   offensive = "offensive",
   support = "support",
   defensive = "defensive",
   movement = "movement",
}

//
// Regular types.
//

export type ZPosition = z.infer<typeof schemas.PositionSchema>
export type ZSize2D = z.infer<typeof schemas.Size2DSchema>
export type ZPosition2D = z.infer<typeof schemas.Position2DSchema>
export type ZActionEffect = z.infer<typeof schemas.ActionEffectSchema>
export type ZActionCardAction = z.infer<typeof schemas.ActionCardActionSchema>
export type ZActionCard = z.infer<typeof schemas.ActionCardSchema>
export type ZGameEntity = z.infer<typeof schemas.GameEntitySchema>
export type ZDynamicGameEntity = z.infer<typeof schemas.DynamicGameEntitySchema>

// Character and Enemy types:
// For validation simplicity, the Zod schema includes the cards
// as type Array<any>.
// We replace this the real runtime type.
export type ZCharacter = Omit<
   z.infer<typeof schemas.CharacterSchema>,
   "cards"
> & {
   cards: Array<PrimitiveAtom<z.infer<typeof schemas.ActionCardSchema>>>
}
export type ZEnemy = Omit<z.infer<typeof schemas.EnemySchema>, "cards"> & {
   cards: Array<PrimitiveAtom<z.infer<typeof schemas.ActionCardSchema>>>
}

export type ZTurnOrderCard = z.infer<typeof schemas.TurnOrderCardSchema>
export type ZArenaConfig = z.infer<typeof schemas.ArenaConfigSchema>
export type ZScenarioEnemyConfig = z.infer<
   typeof schemas.ScenarioEnemyConfigSchema
>
export type ZScenarioUnlockCondition = z.infer<
   typeof schemas.ScenarioUnlockConditionSchema
>
export type ZScenarioVictoryCondition = z.infer<
   typeof schemas.ScenarioVictoryConditionSchema
>
export type ZSaveConfigScenarioVictoryCondition = z.infer<
   typeof schemas.SaveConfigScenarioVictoryConditionSchema
>
export type ZScenarioConfig = z.infer<typeof schemas.ScenarioConfigSchema>

//
// Types used when saving
// These are used for defining the Mongoose models
//

export type ZSaveConfigActionCardAction = z.infer<
   typeof schemas.SaveConfigActionCardActionSchema
>
export type ZSaveConfigActionCard = z.infer<
   typeof schemas.SaveConfigActionCardSchema
>
export type ZSaveConfigDynamicGameEntity = z.infer<
   typeof schemas.SaveConfigDynamicGameEntitySchema
>
export type ZSaveConfigCharacter = z.infer<
   typeof schemas.SaveConfigCharacterSchema
>
export type ZSaveConfigEnemy = z.infer<typeof schemas.SaveConfigEnemySchema>
export type ZSaveConfigScenarioStatistics = z.infer<
   typeof schemas.SaveConfigScenarioStatisticsSchema
>
export type ZSaveConfigScenarioConfig = z.infer<
   typeof schemas.SaveConfigScenarioConfigSchema
>
export type ZSaveConfig = z.infer<typeof schemas.SaveConfigSchema>
