declare interface ActionCardAction {
   id?: string
   name: string
   description?: string
   powerMultiplier?: number
   damageType?: DamageTypes
   actionDelayMultiplier: number
   range?: number
   type: ActionTypes
}

declare interface ActionCard {
   id?: string
   name: string
   description?: string
   actions: ActionCardAction[]
   nextActionId?: string
}

declare interface GameEntity {
   position: Position
   health?: number
}

declare interface DynamicGameEntity extends GameEntity {
   id?: string
   name: string
   spritePath: string
   health: number
   baseActionDelay: number
   currentActionDelay: number
   cards: Array<Atom<ActionCard>>
   selectedCardId: string
}

declare interface Character extends DynamicGameEntity {}

declare interface Enemy extends DynamicGameEntity {}

declare interface TurnOrderCard {
   imagePath: string
}

declare interface Position {
   x: number
   y: number
   z: number
}

declare interface Size2D {
   width: number
   length: number
}

declare interface Position2D {
   x: number
   z: number
}

declare interface ArenaConfig {
   size: Size2D
}

declare interface ScenarioEnemyConfig {
   enemyName: string
   quantity: number
   startingPosition: Position2D
}

declare interface ScenarioConfig {
   id?: string
   name: string
   shortDescription: string
   description: string
   arena: ArenaConfig
   enemies: Array<ScenarioEnemyConfig>
   playerCharacterStartingPositions: Array<Position2D>
   thumbNailPath: string
   maxPartySize: number
}

declare interface SaveGameConfig {
   characters: Array<Character>
   enemies: Array<Enemy>
   scenario: ScenarioConfig
   keyString: string
}
