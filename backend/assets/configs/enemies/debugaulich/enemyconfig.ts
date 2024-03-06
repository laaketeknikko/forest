import * as types from "../../../../../shared/types/types"
import { actionTypes } from "../../actions/actionTypes"
import { damageTypes } from "../../actions/damageTypes"

const AulichActions: Record<string, types.ZSaveConfigActionCardAction> = {
   takeOff: {
      name: "Take off",
      description: "Take off!",
      effects: [
         {
            type: actionTypes.movement,
            range: 10,
            actionDelayMultiplier: 2,
         },
      ],
   },
   aulich: {
      name: "Aulich",
      description: "It's an Aulich",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   nolich: {
      name: "Nolich",
      description: "Not a lich",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   lich: {
      name: "Lich",
      description: "It's a lich",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   lich2: {
      name: "Lich",
      description: "It's a lich",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   lich3: {
      name: "Lich",
      description: "Fire1, fire2, fire3...",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   rottenBird: {
      name: "Rotten bird",
      description: "Summon one of those",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 3,
         },
         {
            type: actionTypes.movement,
            range: 7,
            actionDelayMultiplier: 2,
         },
      ],
   },
   cutInHalf: {
      name: "Cut in half",
      description: "With your beak",
      effects: [
         {
            type: actionTypes.offensive,
            range: 2,
            actionDelayMultiplier: 1,
            damageType: damageTypes.physical,
            powerMultiplier: 4,
         },
      ],
   },
}

const aulichCards = [
   {
      name: "Dark arts",
      description: "Powers of the aulich realized",
      actions: [
         AulichActions.takeOff,
         AulichActions.aulich,
         AulichActions.aulich,
         AulichActions.nolich,
         AulichActions.lich,
         AulichActions.lich2,
         AulichActions.lich3,
      ],
   },
   {
      name: "Bloody",
      deescription: "With your beak",
      actions: [
         AulichActions.takeOff,
         AulichActions.cutInHalf,
         AulichActions.rottenBird,
         AulichActions.cutInHalf,
         AulichActions.cutInHalf,
      ],
   },
]

interface IEnemyConfig extends Omit<types.ZEnemy, "cards"> {
   cards: Array<types.ZSaveConfigActionCard>
}

const enemyConfig: IEnemyConfig = {
   position: { x: 0, y: 0, z: 0 },
   name: "Debug-Aulich",
   health: 20,
   maxHealth: 20,
   spritePath: "sprites/characters/swuippo.png",
   baseActionDelay: 15,
   currentActionDelay: 10,
   cards: aulichCards,
   selectedCardId: "",
   strength: 6,
}

export { enemyConfig }
