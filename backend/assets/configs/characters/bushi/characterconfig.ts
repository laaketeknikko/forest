import * as types from "../../../../../shared/types/types"

import { actionTypes } from "../../actions/actionTypes"
import { damageTypes } from "../../actions/damageTypes"

const BushiActions: Record<string, types.ZActionCardAction> = {
   reminisce: {
      name: "Reminisce",
      description: "Think on all you've gone through.",
      effects: [
         {
            type: actionTypes.support,
            actionDelayMultiplier: 1,
         },
      ],
   },
   twigzashi: {
      name: "Twigzashi",
      description: "Might only scratch their face, but it's quick",

      effects: [
         {
            actionDelayMultiplier: 0.3,
            type: actionTypes.offensive,
            powerMultiplier: 0.2,
            range: 0.8,
            damageType: damageTypes.physical,
         },
      ],
   },
   becomeBush: {
      name: "Become bush",
      description: "As a bush, patience is your virtue",

      effects: [
         {
            actionDelayMultiplier: 4,
            type: actionTypes.support,
         },
      ],
   },
   becomeBushi: {
      name: "Become bushi",
      description: "You need patience as a bushi as well",

      effects: [
         {
            actionDelayMultiplier: 1,
            type: actionTypes.support,
         },
      ],
   },
   jaggedHand: {
      name: "Jagged hand",
      description: "Rend them",

      effects: [
         {
            actionDelayMultiplier: 1.5,
            type: actionTypes.offensive,
            powerMultiplier: 1,
            range: 1,
            damageType: damageTypes.physical,
         },
      ],
   },
   mustacheLook: {
      name: "Mustache look",
      description: "A gentleman, probably harmless",

      effects: [
         {
            actionDelayMultiplier: 0.5,
            type: actionTypes.support,
            range: 3,
         },
      ],
   },
   prepareBardiche: {
      name: "Prepare the bardiche",
      description: "You keep it hidden for good reason",

      effects: [
         {
            actionDelayMultiplier: 0.5,
            type: actionTypes.support,
         },
      ],
   },
   twoHandedBardiche: {
      name: "Two-handed bardiche slash",
      description: "They'll feel it for sure",

      effects: [
         {
            actionDelayMultiplier: 1,
            type: actionTypes.offensive,
            powerMultiplier: 1.5,
            range: 1.4,
            damageType: damageTypes.physical,
         },
      ],
   },
   oneHandedBardiche: {
      name: "One-handed bardiche sweep",
      description: "Longer range. Hopefully you stretched beforehand",

      effects: [
         {
            actionDelayMultiplier: 1,
            powerMultiplier: 1,
            range: 2,
            damageType: damageTypes.physical,
            type: actionTypes.offensive,
         },
      ],
   },
   rollForward: {
      name: "Roll forward",
      description: "It's your your way of movement",

      effects: [
         {
            actionDelayMultiplier: 1,
            range: 3,
            type: actionTypes.movement,
         },
      ],
   },
   walk: {
      name: "walk",
      description: "Your steady step never fails",

      effects: [
         {
            actionDelayMultiplier: 1,
            range: 2,
            type: actionTypes.movement,
         },
      ],
   },
}

const BushiActionCards: Array<types.ZActionCard> = [
   {
      name: "Basic offense",
      description: "You have practised more than most people sleep",
      actions: [
         BushiActions.twigzashi,
         BushiActions.twigzashi,
         BushiActions.twigzashi,
         BushiActions.rollForward,
         BushiActions.jaggedHand,
      ],
   },
   {
      name: "Movement and offense",
      description: "Same deal",
      actions: [
         BushiActions.walk,
         BushiActions.rollForward,
         BushiActions.jaggedHand,
         BushiActions.rollForward,
         BushiActions.twigzashi,
      ],
   },
   {
      name: "Power style",
      description: "Prepare and execute",
      actions: [
         BushiActions.prepareBardiche,
         BushiActions.oneHandedBardiche,
         BushiActions.prepareBardiche,
         BushiActions.twoHandedBardiche,
         BushiActions.becomeBushi,
      ],
   },
]

const characterConfig = {
   name: "Bushi",
   spritePath: "sprites/characters/bushi.png",
   cards: BushiActionCards,
   baseActionDelay: 12,
   selectedCardId: "",
   currentActionDelay: 12,
   health: 10,
}

export { characterConfig }
