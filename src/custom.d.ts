declare interface ActionCardAction {
   name: string
   description?: string
   powerMultiplier?: number
   damageType?: number
   actionDelayMultiplier: number
   range?: number
   type: number
}

declare interface ActionCard {
   name: string
   description?: string
   actions: ActionCardAction[]
}
