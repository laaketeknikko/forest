import { SihhisCardActions } from "./sihhisCardActions.ts"

const sihhisCards: ActionCard[] = [
   {
      name: "Default offensive card",
      description: "Basics",
      actions: [
         SihhisCardActions.strangle,
         SihhisCardActions.poisonBite,
         SihhisCardActions.glowingTattoos,
         SihhisCardActions.tattoock,
         SihhisCardActions.coilUp,
      ],
   },
   {
      name: "Default defensive card",
      description: "Basics of snake defense",
      actions: [
         SihhisCardActions.curlUp,
         SihhisCardActions.curlUp,
         SihhisCardActions.letGo,
         SihhisCardActions.sneakySlither,
         SihhisCardActions.confusingSlither,
      ],
   },
   {
      name: "Default support card",
      description: "Snakes are great at support",
      actions: [
         SihhisCardActions.snakeEyes,
         SihhisCardActions.confusingSlither,
         SihhisCardActions.glowingTattoos,
         SihhisCardActions.slyLook,
         SihhisCardActions.coilUp,
      ],
   },
]

export { sihhisCards }
