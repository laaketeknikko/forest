import { z } from "zod"

export const ActionEffectSchema = z.object({
   _id: z.string().optional(),
   name: z.string().optional(),
   powerMultiplier: z.number().optional(),
   damageType: z.string().optional(),
   actionDelayMultiplier: z.number().default(1),
   range: z.number().optional(),
   type: z.string(),
})

export const ActionCardActionSchema = z.object({
   _id: z.string().optional(),
   name: z.string(),
   description: z.string().optional(),
   actionDelayMultiplier: z.number().default(1),
   effects: z.array(ActionEffectSchema),
})

export const SaveConfigActionCardActionSchema = ActionCardActionSchema.omit({
   actionDelayMultiplier: true,
})

export const ActionCardSchema = z.object({
   _id: z.string().optional(),
   name: z.string(),
   description: z.string().optional(),
   actions: z.array(ActionCardActionSchema),
   nextActionId: z.string().optional(),
})

export const SaveConfigActionCardSchema = ActionCardSchema.omit({
   actions: true,
}).extend({
   actions: z.array(SaveConfigActionCardActionSchema),
})

export const PositionSchema = z.object({
   x: z.number(),
   y: z.number(),
   z: z.number(),
})

export const Size2DSchema = z.object({
   width: z.number(),
   length: z.number(),
})

export const Position2DSchema = z.object({
   x: z.number().default(0),
   z: z.number().default(0),
})

export const GameEntitySchema = z.object({
   position: PositionSchema,
   health: z.number(),
})

export const DynamicGameEntitySchema = GameEntitySchema.extend({
   _id: z.string().optional(),
   name: z.string(),
   strength: z.number(),

   spritePath: z.string(),
   baseActionDelay: z.number(),
   currentActionDelay: z.number(),
   cards: z.array(z.any()),
   selectedCardId: z.string().optional(),
})

export const SaveConfigDynamicGameEntitySchema = DynamicGameEntitySchema.omit({
   cards: true,
}).extend({
   cards: z.array(SaveConfigActionCardSchema),
})

export const CharacterSchema = DynamicGameEntitySchema.extend({})
export const EnemySchema = DynamicGameEntitySchema.extend({})
export const SaveConfigCharacterSchema =
   SaveConfigDynamicGameEntitySchema.extend({})
export const SaveConfigEnemySchema = SaveConfigDynamicGameEntitySchema.extend(
   {}
)

export const TurnOrderCardSchema = z.object({
   imagePath: z.string(),
})

export const ArenaConfigSchema = z.object({
   size: Size2DSchema,
})

export const ScenarioEnemyConfigSchema = z.object({
   enemyName: z.string(),
   quantity: z.number(),
   startingPosition: Position2DSchema,
})

export const ScenarioUnlockConditionSchema = z.object({
   type: z.literal("scenario"),
   scenarioName: z.string(),
   status: z.union([
      z.literal("unlocked"),
      z.literal("locked"),
      z.literal("completed"),
   ]),
})

export const ScenarioVictoryConditionSchema = z.object({
   type: z.literal("enemy"),
   status: z.literal("dead"),
   enemyName: z.string(),
})

export const ScenarioConfigSchema = z.object({
   _id: z.string().optional(),
   name: z.string(),
   shortDescription: z.string(),
   description: z.string(),
   arena: ArenaConfigSchema,
   enemies: z.array(ScenarioEnemyConfigSchema),
   playerCharacterStartingPositions: z.array(Position2DSchema),
   thumbNailPath: z.string(),
   maxPartySize: z.number(),
   unlockCondition: ScenarioUnlockConditionSchema.optional(),
   scenarioVictoryCondition: z.array(ScenarioVictoryConditionSchema),
})

export const SaveConfigScenarioConfigSchema = ScenarioConfigSchema.omit({
   enemies: true,
   playerCharacterStartingPositions: true,
})

export const SaveConfigScenarioStatisticsSchema = z.object({
   scenarioName: z.string(),
   timesAttempted: z.number(),
   wins: z.number(),
   losses: z.number(),
})

export const SaveConfigSchema = z.object({
   characters: z.array(SaveConfigCharacterSchema),
   enemies: z.array(SaveConfigEnemySchema),
   scenario: SaveConfigScenarioConfigSchema,
   scenarioStatistics: z.array(SaveConfigScenarioStatisticsSchema),
   keyString: z.string(),
})
