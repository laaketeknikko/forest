import { damageTypes } from "../damageTypes"
import { actionTypes } from "../actionTypes"

const GuineanPigletActions = {
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
}

export { GuineanPigletActions }
