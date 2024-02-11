import { Atom } from "jotai"
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

export interface IActionCardAction {
   _id?: string
   name: string
   description?: string
   powerMultiplier?: number
   damageType?: string
   actionDelayMultiplier: number
   range?: number
   type: string
}
export interface ISaveConfigActionCardAction extends IActionCardAction {}

export interface IActionCard {
   _id?: string
   name: string
   description?: string
   actions: ZActionCardAction[]
   nextActionId?: string
}
export interface ISaveConfigActionCard extends IActionCard {}

export interface IGameEntity {
   position: IPosition
   health?: number
}
export interface ISaveConfigGameEntity extends IGameEntity {}

export interface IDynamicGameEntity extends IGameEntity {
   _id?: string
   name: string
   spritePath: string
   health: number
   baseActionDelay: number
   currentActionDelay: number
   cards: Array<Atom<ZActionCard>>
   selectedCardId: string
}
export interface ISaveConfigDynamicGameEntity
   extends Omit<IDynamicGameEntity, "cards" | "selectedCardId"> {
   cards: Array<ISaveConfigActionCard>
}

export interface ICharacter extends IDynamicGameEntity {}
export interface ISaveConfigCharacter extends ISaveConfigDynamicGameEntity {}

export interface IEnemy extends IDynamicGameEntity {}
export interface ISaveConfigEnemy extends ISaveConfigDynamicGameEntity {}

export interface ITurnOrderCard {
   imagePath: string
}
export interface ISaveConfigTurnOrderCard extends ITurnOrderCard {}

export interface IPosition {
   x: number
   y: number
   z: number
}
export interface ISaveConfigPosition extends IPosition {}

export interface ISize2D {
   width: number
   length: number
}
export interface ISaveConfigSize2D extends ISize2D {}

export interface IPosition2D {
   x: number
   z: number
}
export interface ISaveConfigPosition2D extends IPosition2D {}

export interface IArenaConfig {
   size: ISize2D
}
export interface ISaveConfigArenaConfig extends IArenaConfig {}

// TODO: Used in save games?
export interface IScenarioEnemyConfig {
   enemyName: string
   quantity: number
   startingPosition: ZPosition2D
}
export interface ISaveConfigScenarioEnemyConfig extends IScenarioEnemyConfig {}

export interface IScenarioConfig {
   _id?: string
   name: string
   shortDescription: string
   description: string
   arena: IArenaConfig
   enemies: Array<IScenarioEnemyConfig>
   playerCharacterStartingPositions: Array<ZPosition2D>
   thumbNailPath: string
   maxPartySize: number
}
export interface ISaveConfigScenarioConfig
   extends Omit<
      ZScenarioConfig,
      "enemies" | "playerCharacterStartingPositions"
   > {
   enemies?: Array<IScenarioEnemyConfig>
   playerCharacterStartingPositions?: Array<IPosition2D>
}

export interface ISaveGameConfig {
   characters: Array<ISaveConfigCharacter>
   enemies: Array<ISaveConfigEnemy>
   scenario: ISaveConfigScenarioConfig
   keyString: string
}

//
// Zod derived types
//

export type ZPosition = z.infer<typeof schemas.PositionSchema>
export type ZSize2D = z.infer<typeof schemas.Size2DSchema>
export type ZPosition2D = z.infer<typeof schemas.Position2DSchema>
export type ZActionCardAction = z.infer<typeof schemas.ActionCardActionSchema>
export type ZActionCard = z.infer<typeof schemas.ActionCardSchema>
export type ZGameEntity = z.infer<typeof schemas.GameEntitySchema>
export type ZDynamicGameEntity = z.infer<typeof schemas.DynamicGameEntitySchema>
export type ZSaveConfigDynamicGameEntity = z.infer<
   typeof schemas.SaveConfigDynamicGameEntitySchema
>

// Character and Enemy types:
// For validation simplicity, the Zod schema includes the cards
// as type Array<any>.
// We replace this the real runtime type.
export type ZCharacter = Omit<
   z.infer<typeof schemas.CharacterSchema>,
   "cards"
> & {
   cards: Array<Atom<z.infer<typeof schemas.ActionCardSchema>>>
}
export type ZEnemy = Omit<z.infer<typeof schemas.EnemySchema>, "cards"> & {
   cards: Array<Atom<z.infer<typeof schemas.ActionCardSchema>>>
}
export type ZSaveConfigCharacter = z.infer<
   typeof schemas.SaveConfigCharacterSchema
>
export type ZSaveConfigEnemy = z.infer<typeof schemas.SaveConfigEnemySchema>
export type ZTurnOrderCard = z.infer<typeof schemas.TurnOrderCardSchema>
export type ZArenaConfig = z.infer<typeof schemas.ArenaConfigSchema>
export type ZScenarioEnemyConfig = z.infer<
   typeof schemas.ScenarioEnemyConfigSchema
>
export type ZScenarioConfig = z.infer<typeof schemas.ScenarioConfigSchema>
export type ZSaveConfigScenarioConfig = z.infer<
   typeof schemas.SaveConfigScenarioConfigSchema
>
export type ZSaveConfig = z.infer<typeof schemas.SaveConfigSchema>
