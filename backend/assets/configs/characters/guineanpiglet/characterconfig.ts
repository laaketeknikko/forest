import * as types from "../../../../../shared/types/types"

import { damageTypes } from "../../actions/damageTypes"
import { actionTypes } from "../../actions/actionTypes"

const GuineanPigletActions: Record<string, types.ZSaveConfigActionCardAction> =
   {
      fluffyTail: {
         name: "Fluffy tail",
         description: "The fluffy tail is soft and itchy",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               powerMultiplier: 0.5,
               damageType: damageTypes.physical,
               actionDelayMultiplier: 1,
               range: 1,
               type: actionTypes.offensive,
            },
         ],
      },
      gnaw: {
         name: "Gnaw",
         description: "Take a little bite.",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               powerMultiplier: 1,
               damageType: damageTypes.physical,
               actionDelayMultiplier: 1,
               range: 1,
               type: actionTypes.offensive,
            },
         ],
      },
      relentlessGnaw: {
         name: "Relentless Gnaw",
         description: "There'll be very little left",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               powerMultiplier: 2,
               damageType: damageTypes.physical,
               actionDelayMultiplier: 2,
               range: 1,
               type: actionTypes.offensive,
            },
         ],
      },
      hideBehindTheTree: {
         name: "Hide behind the tree",
         description: "They don't know where you are",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               actionDelayMultiplier: 0.5,
               type: actionTypes.support,
            },
         ],
      },
      fourLeggedJump: {
         name: "Four-legged Jump",
         description: "They don't how that happened. Might surprise them",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               powerMultiplier: 1,
               damageType: damageTypes.physical,
               actionDelayMultiplier: 1.5,
               range: 4,
               type: actionTypes.offensive,
            },
         ],
      },
      meanFace: {
         name: "Mean face",
         description: "The face is mean. They might fear the bite",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               actionDelayMultiplier: 1,
               range: 2,
               type: actionTypes.support,
            },
         ],
      },
      tailSwipe: {
         name: "Tail swipe",
         description: "Good for swatting flies and maybe unbalancing.",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               powerMultiplier: 0.5,
               damageType: damageTypes.physical,
               actionDelayMultiplier: 1,
               range: 1,
               type: actionTypes.offensive,
            },
         ],
      },
      leeTailSwipe: {
         name: "Lee tail swipe",
         description: "Swipe them like Mr. Lee",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               powerMultiplier: 1,
               damageType: damageTypes.physical,
               actionDelayMultiplier: 1.5,
               range: 1,
               type: actionTypes.offensive,
            },
         ],
      },
      quickFeet: {
         name: "Quick feet",
         description: "Speeds you up",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               actionDelayMultiplier: 0.33,
               type: actionTypes.support,
            },
         ],
      },
      riseToTwoFeet: {
         name: "Rise to two feet",
         description: "Makes you easier to hit, but looks reasonably menacing",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               actionDelayMultiplier: 0.5,
               type: actionTypes.support,
            },
         ],
      },
      lowerBackDown: {
         name: "Lower back down",
         description: "Back to normal stance",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               actionDelayMultiplier: 0.5,
               type: actionTypes.support,
            },
         ],
      },
      jump: {
         name: "Jump",
         description: "Make a long jump",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
         ],
      },
      casualWalk: {
         name: "Casual walk",
         description: "Makes you look quite unintimidating",

         effects: [
            {
               actionDelayMultiplier: 1,
               type: actionTypes.movement,
               range: 3,
            },
            {
               range: 1.5,
               type: actionTypes.movement,
               actionDelayMultiplier: 1,
            },
         ],
      },
   }

const GuineanPigletCards: Array<types.ZSaveConfigActionCard> = [
   {
      name: "Default offensive card",
      description: "Everyday fundamentals every piglet knows by heart",
      actions: [
         GuineanPigletActions.fluffyTail,
         GuineanPigletActions.fourLeggedJump,
         GuineanPigletActions.gnaw,
         GuineanPigletActions.hideBehindTheTree,
         GuineanPigletActions.relentlessGnaw,
      ],
   },
   {
      name: "Default support card",
      description: "Not lethal, but maybe useful",
      actions: [
         GuineanPigletActions.jump,
         GuineanPigletActions.riseToTwoFeet,
         GuineanPigletActions.relentlessGnaw,
         GuineanPigletActions.hideBehindTheTree,
         GuineanPigletActions.meanFace,
      ],
   },
   {
      name: "Default combo card",
      description: "Mix them up a bit",
      actions: [
         GuineanPigletActions.relentlessGnaw,
         GuineanPigletActions.quickFeet,
         GuineanPigletActions.lowerBackDown,
         GuineanPigletActions.leeTailSwipe,
         GuineanPigletActions.quickFeet,
      ],
   },
]

const characterConfig: types.ZSaveConfigCharacter = {
   name: "Guinean Piglet",
   spritePath: "sprites/characters/guineanpiglet.png",
   cards: GuineanPigletCards,
   baseActionDelay: 10,
   selectedCardId: "",
   currentActionDelay: 10,
   health: 40,
   maxHealth: 40,
   strength: 5,
   position: { x: 0, y: 0, z: 0 },
}

export { characterConfig }
