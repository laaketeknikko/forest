import { z } from "zod"

export const ActionCardActionSchema = z.object({
   _id: z.string().optional(),
   name: z.string(),
   description: z.string().optional(),
   powerMultiplier: z.number().optional(),
   damageType: z.string().optional(),
   actionDelayMultiplier: z.number(),
   range: z.number().optional(),
   type: z.string(),
})

export const ActionCardSchema = z.object({
   _id: z.string().optional(),
   name: z.string(),
   description: z.string().optional(),
   actions: z.array(ActionCardActionSchema),
   nextActionId: z.string().optional(),
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
   spritePath: z.string(),
   baseActionDelay: z.number(),
   currentActionDelay: z.number(),
   cards: z.array(z.any()),
   selectedCardId: z.string().optional(),
})

export const SaveConfigDynamicGameEntitySchema = DynamicGameEntitySchema.omit({
   cards: true,
}).extend({
   cards: z.array(ActionCardSchema),
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
})

export const SaveConfigScenarioConfigSchema = ScenarioConfigSchema.omit({
   enemies: true,
   playerCharacterStartingPositions: true,
})

export const SaveConfigSchema = z.object({
   characters: z.array(SaveConfigCharacterSchema),
   enemies: z.array(SaveConfigEnemySchema),
   scenario: SaveConfigScenarioConfigSchema,
   keyString: z.string(),
})
