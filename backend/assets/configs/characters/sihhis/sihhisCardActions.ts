import * as types from "../../../../../shared/types/types"

import { damageTypes } from "../../actions/damageTypes"
import { actionTypes } from "../../actions/actionTypes"

const SihhisCardActions: Record<string, types.ActionCardAction> = {
   slither: {
      name: "Slither",
      description: "Your way of moving around",
      type: actionTypes.movement,
      range: 1,
      actionDelayMultiplier: 1,
   },
   snakeEyes: {
      name: "Snake eyes",
      description: "They might feel bad things happening",
      type: actionTypes.support,
      range: 3,
      actionDelayMultiplier: 1,
   },
   strangle: {
      name: "Strangle",
      description: "Wrap them tightly and don't let go",
      type: actionTypes.offensive,
      powerMultiplier: 2,
      actionDelayMultiplier: 3,
      range: 1,
      damageType: damageTypes.physical,
   },
   letGo: {
      name: "Let go",
      description: "You've strangled them enough, hopefully",
      type: actionTypes.support,
      range: 2,
      actionDelayMultiplier: 1,
   },
   sneakySlither: {
      name: "Sneaky Slither",
      description: "They might not see you going anywhere",
      type: actionTypes.movement,
      actionDelayMultiplier: 1,
      range: 2,
   },
   confusingSlither: {
      name: "Confusing Slither",
      description:
         "Looking at you, they might start feeling a bit light-headed",
      type: actionTypes.movement,
      actionDelayMultiplier: 1,
      range: 1,
   },
   poisonBite: {
      name: "Poison Bite",
      description: "It'll hurt you, but it'll hurt them as well",
      powerMultiplier: 1,
      actionDelayMultiplier: 1.5,
      range: 1,
      damageType: damageTypes.physical,
      type: actionTypes.offensive,
   },
   glowingTattoos: {
      name: "Glowing tattoos",
      description: "It's not a destructive beam, but they might not know it",
      actionDelayMultiplier: 0.5,
      range: 3,
      type: actionTypes.support,
   },
   tattoock: {
      name: "Tattoock",
      description: "It is a destructive beam",
      actionDelayMultiplier: 3,
      range: 2,
      type: actionTypes.offensive,
      powerMultiplier: 2.5,
      damageType: damageTypes.physical,
   },
   slyLook: {
      name: "Sly look",
      description: "They know you know, or at least they think you do",
      actionDelayMultiplier: 1,
      range: 2,
      type: actionTypes.support,
   },
   curlUp: {
      name: "Curl up",
      description: "They don't know where you head is",
      actionDelayMultiplier: 0.5,
      type: actionTypes.defensive,
   },
   coilUp: {
      name: "Coil up",
      description: "Coiled and ready to spring",
      actionDelayMultiplier: 0.5,
      type: actionTypes.support,
   },
   snakeArrow: {
      name: "Snake Arrow",
      description: "Worse than Malboro Breath",
      range: 2,
      actionDelayMultiplier: 4,
      type: actionTypes.offensive,
      powerMultiplier: 3,
   },
}

export { SihhisCardActions }
