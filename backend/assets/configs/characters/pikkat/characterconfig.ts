import * as types from "../../../../../shared/types/types"

import { actionTypes } from "../../actions/actionTypes"
import { damageTypes } from "../../actions/damageTypes"

const PikkatActions: Record<string, types.ZSaveConfigActionCardAction> = {
   listen: {
      name: "Listen",
      description: "Listen to the sound",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   piggyNose: {
      name: "Piggy nose",
      description: "Smell it",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   scratch: {
      name: "Scratch",
      description: "More menacing than it seems, or the other way.",
      effects: [
         {
            type: actionTypes.offensive,
            range: 1,
            actionDelayMultiplier: 1,
            powerMultiplier: 1,
            damageType: damageTypes.physical,
         },
      ],
   },
   purrr: {
      name: "Purrr",
      description: "A purrring cat doesn't scratch, they might think.",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 2,
         },
      ],
   },
   scuttle: {
      name: "Scuttle",
      description: "Get behind them and...",
      effects: [
         {
            type: actionTypes.movement,
            range: 3,
            actionDelayMultiplier: 1,
         },
         {
            type: actionTypes.offensive,
            range: 1.5,
            actionDelayMultiplier: 1,
            powerMultiplier: 1,
            damageType: damageTypes.physical,
         },
      ],
   },
   snarl: {
      name: "Snarl",
      description: "it's more like a hiss, but it's not.",
      effects: [
         {
            type: actionTypes.support,
            range: 3,
            actionDelayMultiplier: 1.5,
         },
      ],
   },
   furrrBall: {
      name: "Furrr ball",
      description: "Hide in your furrr",
      effects: [
         {
            type: actionTypes.movement,
            range: 2,
            actionDelayMultiplier: 0.7,
         },
      ],
   },
   scratchyAttack: {
      name: "Scratchy attack",
      description: "A series of scratches.",
      effects: [
         {
            type: actionTypes.offensive,
            range: 1,
            actionDelayMultiplier: 1.5,
            powerMultiplier: 2,
            damageType: damageTypes.physical,
         },
         {
            type: actionTypes.offensive,
            range: 1,
            actionDelayMultiplier: 1.2,
            powerMultiplier: 1,
            damageType: damageTypes.physical,
         },
         {
            type: actionTypes.offensive,
            range: 1,
            actionDelayMultiplier: 1,
            powerMultiplier: 0.5,
            damageType: damageTypes.physical,
         },
      ],
   },
   scratchlessAttack: {
      name: "Scratchless attack",
      description: "A series of soothing soothes.",
      effects: [
         {
            type: actionTypes.offensive,
            range: 2,
            actionDelayMultiplier: 1,
            powerMultiplier: 0.3,
            damageType: damageTypes.physical,
         },
      ],
   },
   lastSwine: {
      name: "The last swine",
      description: "Even if it were implemented, you wouldn't want to.",
      effects: [
         {
            actionDelayMultiplier: 1,
            type: actionTypes.support,
         },
      ],
   },
}

const PikkatCards: Array<types.ZSaveConfigActionCard> = [
   {
      name: "Scratchy",
      description: "Face, eyes, wings, whatever you can reach.",
      actions: [
         PikkatActions.scratch,
         PikkatActions.scratch,
         PikkatActions.scratch,
         PikkatActions.scratchyAttack,
         PikkatActions.scratchlessAttack,
      ],
   },
   {
      name: "Menaceless",
      description: "You are, after all, just a pigkat.",
      actions: [
         PikkatActions.listen,
         PikkatActions.piggyNose,
         PikkatActions.furrrBall,
         PikkatActions.lastSwine,
         PikkatActions.scuttle,
      ],
   },
   {
      name: "Face",
      description: "Someone's face",
      actions: [
         PikkatActions.scratchyAttack,
         PikkatActions.scratchyAttack,
         PikkatActions.scratchyAttack,
         PikkatActions.scratchyAttack,
         PikkatActions.scratchyAttack,
      ],
   },
]

const characterConfig: types.ZSaveConfigCharacter = {
   name: "Pikkat",
   spritePath: "sprites/characters/katikatti.png",
   cards: PikkatCards,
   baseActionDelay: 9,
   selectedCardId: "",
   currentActionDelay: 9,
   maxHealth: 30,
   health: 30,
   strength: 6,
   position: { x: 0, y: 0, z: 0 },
}

export { characterConfig }
