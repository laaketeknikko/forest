import * as types from "../../shared/types/types.ts"

declare interface ActionCardAction extends types.IActionCardAction {}

/*declare interface ActionCardAction {
   _id?: string
   name: string
   description?: string
   powerMultiplier?: number
   damageType?: DamageTypes
   actionDelayMultiplier: number
   range?: number
   type: ActionTypes
}
*/

declare interface ActionCard extends types.IActionCard {}

/*
declare interface ActionCard {
   _id?: string
   name: string
   description?: string
   actions: ActionCardAction[]
   nextActionId?: string
}
*/

declare interface GameEntity extends types.IGameEntity {}

/*
declare interface GameEntity {
   position: Position
   health?: number
}
*/
declare interface DynamicGameEntity extends types.IDynamicGameEntity {}

/*
declare interface DynamicGameEntity extends GameEntity {
   _id?: string
   name: string
   spritePath: string
   health: number
   baseActionDelay: number
   currentActionDelay: number
   cards: Array<Atom<ActionCard>>
   selectedCardId: string
}
*/

declare interface Character extends types.ICharacter {}
declare interface Enemy extends types.IEnemy {}

/*
declare interface Character extends DynamicGameEntity {}

declare interface Enemy extends DynamicGameEntity {}
*/

declare interface TurnOrderCard extends types.ITurnOrderCard {}

/*
declare interface TurnOrderCard {
   imagePath: string
}
*/

declare interface Position extends types.IPosition {}

/*
declare interface Position {
   x: number
   y: number
   z: number
}
*/

declare interface Size2D extends types.ISize2D {}

/*

declare interface Size2D {
   width: number
   length: number
}
*/

declare interface Position2D extends types.IPosition2D {}

/*
declare interface Position2D {
   x: number
   z: number
}
*/

declare interface ArenaConfig extends types.IArenaConfig {}

/*
declare interface ArenaConfig {
   size: Size2D
}
*/

declare interface ScenarioEnemyConfig extends types.IScenarioEnemyConfig {}
/*
declare interface ScenarioEnemyConfig {
   enemyName: string
   quantity: number
   startingPosition: Position2D
}
*/

declare interface ScenarioConfig extends types.IScenarioConfig {}

/*

declare interface ScenarioConfig {
   _id?: string
   name: string
   shortDescription: string
   description: string
   arena: ArenaConfig
   enemies: Array<ScenarioEnemyConfig>
   playerCharacterStartingPositions: Array<Position2D>
   thumbNailPath: string
   maxPartySize: number
}
*/

declare interface SaveGameConfig extends types.ISaveGameConfig {}

/*

declare interface SaveGameConfig {
   characters: Array<Character>
   enemies: Array<Enemy>
   scenario: ScenarioConfig
   keyString: string
}
*/
