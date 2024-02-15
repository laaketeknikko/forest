import * as types from "../../../../../shared/types/types"

import { actionTypes } from "../../actions/actionTypes"
import { damageTypes } from "../../actions/damageTypes"

const miiniiActions: Record<string, types.ZSaveConfigActionCardAction> = {
   beak: {
      name: "Beak",
      description: "It really hurts",

      effects: [
         {
            powerMultiplier: 1.5,
            actionDelayMultiplier: 1,
            type: actionTypes.offensive,
            damageType: damageTypes.physical,
            range: 1,
         },
      ],
   },
   wingSlam: {
      name: "Wing slam",
      description: "Knock them away",

      effects: [
         {
            powerMultiplier: 1,
            actionDelayMultiplier: 1.5,
            type: actionTypes.offensive,
            damageType: damageTypes.physical,
            range: 1.5,
         },
      ],
   },
   fly: {
      name: "Fly",
      description: "Fly a short distance",

      effects: [
         {
            range: 7,
            actionDelayMultiplier: 1.5,
            type: actionTypes.movement,
         },
      ],
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

interface IEnemyConfig extends Omit<types.ZEnemy, "position" | "cards"> {
   cards: Array<types.ZSaveConfigActionCard>
}

const enemyConfig: IEnemyConfig = {
   name: "Miinii",
   health: 200,
   spritePath: "sprites/characters/miinii.png",
   baseActionDelay: 10,
   currentActionDelay: 10,
   cards: miiniiCards,
   selectedCardId: "",
   strength: 10,
}

export { enemyConfig }
