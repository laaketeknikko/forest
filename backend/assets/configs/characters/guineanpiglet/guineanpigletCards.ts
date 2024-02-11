import { IActionCard } from "../../../../../shared/types/types"
import { GuineanPigletActions } from "./guineanpigletCardActions"

const GuineanPigletCards: Array<IActionCard> = [
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

export { GuineanPigletCards }
