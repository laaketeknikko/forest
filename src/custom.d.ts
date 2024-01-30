declare interface ActionCardAction {
   id?: string
   name: string
   description?: string
   powerMultiplier?: number
   damageType?: number
   actionDelayMultiplier: number
   range?: number
   type: number
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
