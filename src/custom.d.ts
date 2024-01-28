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
}

declare interface Character {
   id?: string
   name: string
   spritePath: string
   cards: ActionCard[]
   selectedCardId: string
   baseActionDelay: number
   currentActionDelay: number
}

declare interface TurnOrderCard {
   imagePath: string
}
