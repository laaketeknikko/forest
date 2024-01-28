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
   nextActionId?: number
}

declare interface Character {
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
