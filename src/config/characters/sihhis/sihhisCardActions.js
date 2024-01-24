import { damageTypes } from "../../actions/damageTypes"
import { actionTypes } from "../../actions/actionTypes"

const SihhisCardActions = {
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
}

export { SihhisCardActions }
