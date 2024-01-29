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
}

declare interface Character extends GameEntity {
   id?: string
   name: string
   spritePath: string
   cards: Array<Atom<ActionCard>>
   selectedCardId: string
   baseActionDelay: number
   currentActionDelay: number
}

declare interface TurnOrderCard {
   imagePath: string
}

declare interface Position {
   x: number
   y: number
   z: number
}
