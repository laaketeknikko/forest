import * as types from "../../shared/types/types.ts"

declare interface ActionCardAction extends types.ActionCardAction {}

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

declare interface ActionCard extends types.ActionCard {}

/*
declare interface ActionCard {
   _id?: string
   name: string
   description?: string
   actions: ActionCardAction[]
   nextActionId?: string
}
*/

declare interface GameEntity extends types.GameEntity {}

/*
declare interface GameEntity {
   position: Position
   health?: number
}
*/
declare interface DynamicGameEntity extends types.DynamicGameEntity {}

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

declare interface Character extends types.Character {}
declare interface Enemy extends types.Enemy {}

/*
declare interface Character extends DynamicGameEntity {}

declare interface Enemy extends DynamicGameEntity {}
*/

declare interface TurnOrderCard extends types.TurnOrderCard {}

/*
declare interface TurnOrderCard {
   imagePath: string
}
*/

declare interface Position extends types.Position {}

/*
declare interface Position {
   x: number
   y: number
   z: number
}
*/

declare interface Size2D extends types.Size2D {}

/*

declare interface Size2D {
   width: number
   length: number
}
*/

declare interface Position2D extends types.Position2D {}

/*
declare interface Position2D {
   x: number
   z: number
}
*/

declare interface ArenaConfig extends types.ArenaConfig {}

/*
declare interface ArenaConfig {
   size: Size2D
}
*/

declare interface ScenarioEnemyConfig extends types.ScenarioEnemyConfig {}
/*
declare interface ScenarioEnemyConfig {
   enemyName: string
   quantity: number
   startingPosition: Position2D
}
*/

declare interface ScenarioConfig extends types.ScenarioConfig {}

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

declare interface SaveGameConfig extends types.SaveGameConfig {}

/*

declare interface SaveGameConfig {
   characters: Array<Character>
   enemies: Array<Enemy>
   scenario: ScenarioConfig
   keyString: string
}
*/
