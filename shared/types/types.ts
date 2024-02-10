import { Atom } from "jotai"

export enum DamageTypes {
   physical = "physical",
}

export enum ActionTypes {
   offensive = "offensive",
   support = "support",
   defensive = "defensive",
   movement = "movement",
}

export interface ActionCardAction {
   _id?: string
   name: string
   description?: string
   powerMultiplier?: number
   damageType?: string
   actionDelayMultiplier: number
   range?: number
   type: string
}

export interface ActionCard {
   _id?: string
   name: string
   description?: string
   actions: ActionCardAction[]
   nextActionId?: string
}

export interface GameEntity {
   position: Position
   health?: number
}

export interface DynamicGameEntity extends GameEntity {
   _id?: string
   name: string
   spritePath: string
   health: number
   baseActionDelay: number
   currentActionDelay: number
   cards: Array<Atom<ActionCard>>
   selectedCardId: string
}

export interface Character extends DynamicGameEntity {}

export interface Enemy extends DynamicGameEntity {}

export interface TurnOrderCard {
   imagePath: string
}

export interface Position {
   x: number
   y: number
   z: number
}

export interface Size2D {
   width: number
   length: number
}

export interface Position2D {
   x: number
   z: number
}

export interface ArenaConfig {
   size: Size2D
}

export interface ScenarioEnemyConfig {
   enemyName: string
   quantity: number
   startingPosition: Position2D
}

export interface ScenarioConfig {
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

export interface SaveGameConfig {
   characters: Array<Character>
   enemies: Array<Enemy>
   scenario: ScenarioConfig
   keyString: string
}
