import { actionTypes } from "../../actions/actionTypes"
import { damageTypes } from "../../actions/damageTypes"

const miiniiActions: Record<string, ActionCardAction> = {
   beak: {
      name: "Beak",
      description: "It really hurts",
      powerMultiplier: 1.5,
      actionDelayMultiplier: 1,
      type: actionTypes.offensive,
      damageType: damageTypes.physical,
      range: 1,
   },
   wingSlam: {
      name: "Wing slam",
      description: "Knock them away",
      powerMultiplier: 1,
      actionDelayMultiplier: 1.5,
      type: actionTypes.offensive,
      damageType: damageTypes.physical,
      range: 1.5,
   },
   fly: {
      name: "Fly",
      description: "Fly a short distance",
      range: 7,
      actionDelayMultiplier: 1.5,
      type: actionTypes.movement,
   },
}

const miiniiCards = [
   {
      name: "Offensive",
      description: "Offensive card",
      actions: [
         miiniiActions.beak,
         miiniiActions.beak,
         miiniiActions.wingSlam,
         miiniiActions.beak,
         miiniiActions.beak,
      ],
   },
   {
      name: "Moffense",
      description: "Movement and offense",
      actions: [
         miiniiActions.fly,
         miiniiActions.fly,
         miiniiActions.fly,
         miiniiActions.wingSlam,
         miiniiActions.beak,
      ],
   },
]

const enemyConfig: Omit<Enemy, "position"> = {
   name: "Miinii",
   health: 200,
   spritePath: "sprites/characters/miinii.png",
   baseActionDelay: 10,
   currentActionDelay: 10,
   cards: miiniiCards,
   selectedCardId: "",
}

export { enemyConfig }
