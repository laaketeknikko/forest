import { damageTypes } from "../../actions/damageTypes"
import { actionTypes } from "../../actions/actionTypes"

import type { ActionCardAction } from "../../types"

const GuineanPigletActions: Record<string, ActionCardAction> = {
   fluffyTail: {
      name: "Fluffy tail",
      description: "The fluffy tail is soft and itchy",
      powerMultiplier: 0.5,
      damageType: damageTypes.physical,
      actionDelayMultiplier: 1,
      range: 1,
      type: actionTypes.offensive,
   },
   gnaw: {
      name: "Gnaw",
      description: "Take a little bite.",
      powerMultiplier: 1,
      damageType: damageTypes.physical,
      actionDelayMultiplier: 1,
      range: 1,
      type: actionTypes.offensive,
   },
   relentlessGnaw: {
      name: "Relentless Gnaw",
      description: "There'll be very little left",
      powerMultiplier: 2,
      damageType: damageTypes.physical,
      actionDelayMultiplier: 2,
      range: 1,
      type: actionTypes.offensive,
   },
   hideBehindTheTree: {
      name: "Hide behind the tree",
      description: "They don't know where you are",
      actionDelayMultiplier: 0.5,
      type: actionTypes.support,
   },
   fourLeggedJump: {
      name: "Four-legged Jump",
      description: "They don't how that happened. Might surprise them",
      powerMultiplier: 1,
      damageType: damageTypes.physical,
      actionDelayMultiplier: 1.5,
      range: 4,
      type: actionTypes.offensive,
   },
   meanFace: {
      name: "Mean face",
      description: "The face is mean. They might fear the bite",
      actionDelayMultiplier: 1,
      range: 2,
      type: actionTypes.offensive,
   },
   tailSwipe: {
      name: "Tail swipe",
      description: "Good for swatting flies and maybe unbalancing.",
      powerMultiplier: 0.5,
      damageType: damageTypes.physical,
      actionDelayMultiplier: 1,
      range: 1,
      type: actionTypes.offensive,
   },
   leeTailSwipe: {
      name: "Lee tail swipe",
      description: "Swipe them like mr. Lee",
      powerMultiplier: 1,
      damageType: damageTypes.physical,
      actionDelayMultiplier: 1.5,
      range: 1,
      type: actionTypes.offensive,
   },
   quickFeet: {
      name: "Quick feet",
      description: "Speeds you up",
      actionDelayMultiplier: 0.33,
      type: actionTypes.support,
   },
   riseToTwoFeet: {
      name: "Rise to two feet",
      description: "Makes you easier to hit, but looks reasonably menacing",
      actionDelayMultiplier: 0.5,
      type: actionTypes.support,
   },
   lowerBackDown: {
      name: "Lower back down",
      description: "Back to normal stance",
      actionDelayMultiplier: 0.5,
      type: actionTypes.support,
   },
}

export { GuineanPigletActions }
