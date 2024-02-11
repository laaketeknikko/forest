import { Atom } from "jotai"

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
   actions: IActionCardAction[]
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
   cards: Array<Atom<IActionCard>>
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
   startingPosition: IPosition2D
}
export interface ISaveConfigScenarioEnemyConfig extends IScenarioEnemyConfig {}

export interface IScenarioConfig {
   _id?: string
   name: string
   shortDescription: string
   description: string
   arena: IArenaConfig
   enemies: Array<IScenarioEnemyConfig>
   playerCharacterStartingPositions: Array<IPosition2D>
   thumbNailPath: string
   maxPartySize: number
}
export interface ISaveConfigScenarioConfig
   extends Omit<
      IScenarioConfig,
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
